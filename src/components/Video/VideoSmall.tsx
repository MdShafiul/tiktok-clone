import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function getThumbnail(videoUrl?: string) {
  if (!videoUrl) return "";
  try {
    const u = new URL(videoUrl);
    const pathname = u.pathname; // preserves path without query
    const dot = pathname.lastIndexOf(".");
    const thumbPath = dot !== -1 ? pathname.slice(0, dot) + ".jpg" : pathname + ".jpg";
    return `${u.origin}${thumbPath}`;
  } catch {
    // fallback for non-absolute urls or CDN signed URLs
    const noQuery = String(videoUrl || "").split("?")[0];
    const dot = noQuery?.lastIndexOf(".");
    return dot !== -1 ? noQuery?.slice(0, dot) + ".jpg" : noQuery + ".jpg";
  }
}

interface VideoSmallProps {
  video: {
    id: string;
    videoUrl: string;
    thumnail?: string;
    title: string;
  };
}

const VideoSmall: React.FC<VideoSmallProps> = ({ video }) => {
  return (
    <Link className="block" href={`/video/${video?.id}`}>
      <div className="relative">
        <div className="aspect-[9/16] overflow-hidden">
          <LazyLoadImage
            className="aspect-[9/16]"
            src={video?.thumnail ?? getThumbnail(video?.videoUrl)}
            alt={video?.title || "video thumbnail"}
            effect="opacity"
          />
        </div>
        <h3 className="line-clamp-1 absolute bottom-0 left-0 right-0 m-2 mt-2 text-sm font-normal drop-shadow-xl">
          {video?.title}
        </h3>
      </div>
    </Link>
  );
};

export default VideoSmall;
