import React from "react";
import ReactLoading from "react-loading";

export const Loading: React.FC = () => {
  return (
    <ReactLoading
      className="loader"
      type="bars"
      color="#000"
      height={467}
      width={175}
    />
  );
};
