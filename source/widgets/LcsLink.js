import Link from "next/link";
import { isNullOrUndefined } from "@/utils/index";

export const LcsLink = (props) => {
  const { href, content, type, classes } = props;
  if (isNullOrUndefined(type)) {
    type === "SOFT";
  }
  if (isNullOrUndefined(classes)) {
    classes === "";
  }

  let route =
    type === "HARD" ? `${process.env.NEXT_PUBLIC_COMUI_HOST}${href}` : href;

  return (
    <Link prefetch={false} href={route} className={classes}>
      <a>{props.children ? props.children : content}</a>
    </Link>
  );
};
