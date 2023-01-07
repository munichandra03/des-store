import { composeClasses, parseClasses } from "@/utils/index";
import Image from "next/image";

export const Img = (props) => {
  const { src, alt, action, classes } = props;
  const defaultImg = composeClasses("img", classes);
  return (
    <Image
      src={src}
      alt={alt}
      onClick={action}
      className={parseClasses(defaultImg)}
      layout="responsive"
      width="100%"
      height="100%"
    />
  );
};
