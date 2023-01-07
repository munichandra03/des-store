import { parseClasses, parseContent } from "@/utils/index";

export const LcsContent = (props) => {
    const { uistyle, content } = props;
    return (
        <span className={parseClasses(uistyle)}>{parseContent(content)}</span>
    )
};