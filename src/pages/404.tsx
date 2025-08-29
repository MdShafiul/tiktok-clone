import React from "react";
import Error from "../components/Error";
import Meta from "../components/Meta";

const PageNotFound = () => {
  return (
    <div>
      <Meta
        title="Page not found | 404"
        description="Page not found | 404"
        image="https://res.cloudinary.com/alam313/image/upload/v1756429642/ReelRushLogo_j0oicz.png"
      />
      <Error />
    </div>
  );
};

export default PageNotFound;
