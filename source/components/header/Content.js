import { parseClasses, parseContent } from "@/utils/index";

export const LcsContent = (props) => {
  const { uistyle, content } = props;
  return <p className={parseClasses(uistyle)}>{parseContent(content)}</p>;
};
