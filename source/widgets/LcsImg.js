import { composeClasses, parseClasses } from "@/utils/index";
import { isNullOrUndefined } from "@/utils/index";
import Image from "next/image";

export const LcsImg = (props) => {
  const { src, alt, action, classes, nextImg } = props;

  const defaultImg = composeClasses("img", classes);

  if (isNullOrUndefined(nextImg)) {
    nextImg = false;
  }
  return (
    <>
      {nextImg ? (
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          onClick={action}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/product_default.jpg";
          }}
          className={parseClasses(defaultImg) + "cursor-pointer"}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onClick={action}
          className={parseClasses(defaultImg) + "cursor-pointer"}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/product_default.jpg";
          }}
        />
      )}
    </>
  );
};
