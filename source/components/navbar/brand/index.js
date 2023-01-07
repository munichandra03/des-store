import React from "react";
import { useRouter } from "next/router";

const Brand = () => {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/")}>
      <img
        src="/logixal.png"
        width="150px"
        height="50px"
        alt="logixal-logo"
        layout="responsive"
      />
    </div>
  );
};

export default Brand;
