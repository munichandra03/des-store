import { composeClasses, parseClasses, parseContent } from "../utils/index";
import { FormStyles, Icons, renderIcon } from "@/consts/style.consts";

export const LcsButton = (props) => {
  const { uistyle, content, action, IconName, value, icon, buttonId } = props;

  const defaultBtnUI = composeClasses("btn", uistyle);
  return (
    <button
      type="button"
      className={parseClasses(defaultBtnUI)}
      onClick={action}
      id={buttonId}
    >
      {IconName ? (
        <>
          <span className="sr-only">Dismiss</span>
          <IconName
            className={parseClasses(composeClasses("ticon", {}))}
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          {icon ? (
            <span className={FormStyles.iconWrap()}>
              {renderIcon({ icon })}
            </span>
          ) : (
            ""
          )}
          {parseContent(content) || value}
        </>
      )}
    </button>
  );
};
