import { FormStyles } from "@/consts/style.consts";
import { LcsLink } from "./LcsLink";

export const LcsLinkBtn = (props) => {
  const { to, content } = props;
  return (
    <LcsLink
      href={to}
      classes={FormStyles.link()}
      {...props}
      content={content}
    />
  );
};
