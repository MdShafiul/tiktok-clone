import type { NextApiRequest, NextApiResponse } from "next";
import {
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from "@azure/storage-blob";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
  const containerName = process.env.AZURE_STORAGE_CONTAINER || "videos";

  if (!account || !accountKey) {
    return res
      .status(500)
      .json({ error: "Azure storage account not configured on the server." });
  }

  const filename = (req.query.filename as string) || req.body?.filename;
  if (!filename) return res.status(400).json({ error: "filename required" });

  try {
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey
    );

    const expiresOn = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const permissions = BlobSASPermissions.parse("cw"); // create + write

    const sas = generateBlobSASQueryParameters(
      {
        containerName,
        blobName: filename,
        permissions,
        startsOn: new Date(Date.now() - 5 * 60 * 1000),
        expiresOn,
      },
      sharedKeyCredential
    ).toString();

    const encodedName = encodeURIComponent(filename);
    const uploadUrl = `https://${account}.blob.core.windows.net/${containerName}/${encodedName}?${sas}`;
    const blobUrl = `https://${account}.blob.core.windows.net/${containerName}/${encodedName}`;

    return res.status(200).json({ uploadUrl, blobUrl, expiresOn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate SAS" });
  }
}
