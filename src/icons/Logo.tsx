import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Image
        src="https://res.cloudinary.com/alam313/image/upload/v1756429961/ReelRushLogoBanner_jq6kly.png"
        alt="ReelRush"
        width={100}
        height={30}
        className="w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
