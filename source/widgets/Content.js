import { parseClasses, parseContent } from "@/utils/index";

export const Content = (props) => {
    const { uistyle, content } = props;
    return (
        <p className={parseClasses(uistyle)}>{parseContent(content)}</p>
    )
};




