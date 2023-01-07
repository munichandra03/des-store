import { FormConsts } from "@/consts/style.consts";
import { LcsLabel } from "@/widgets/LcsLabel";

export const LcsInput = ({
  type = "text",
  rows = 3,
  checked,
  data,
  placeholder,
  uistyle,
  value,
  action,
  pattern,
  label,
  name,
  id,
  disabled,
  validation,
  preGroup,
}) => {
  const formLablesAtEnd = ["checkbox", "radio"];

  function getInputClasses() {
    let classes = FormConsts.input();
    switch (validation?.type) {
      case "error":
        classes = FormConsts.inputError();
        break;
      case "success":
        classes = FormConsts.inputSuccess();
        break;
      case "warning":
        classes = FormConsts.inputWarning();
        break;
      default:
        classes = FormConsts.input();
    }
    return classes;
  }

  function eventHandler(e) {
    console.log(e.target);
  }

  function Input() {
    return (
      <input
        className={getInputClasses()}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        pattern={pattern}
        name={name}
        // onClick={eventHandler}
        onChange={action}
        disabled={disabled}
      />
    );
  }

  function CheckRadiobox() {
    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <LcsLabel content={label} htmlFor={id}>
            <input
              className={FormConsts.checkbox()}
              id={id}
              type={type}
              value={value}
              checked={checked}
              name={name}
              // onClick={eventHandler}
              onChange={action}
              disabled={disabled}
            />
          </LcsLabel>
        </div>
        <div className="ml-3 text-sm">
          {validation?.info ? InfoMessage("gray") : ""}
        </div>
      </div>
    );
  }

  function Textarea() {
    return (
      <textarea
        id={id}
        name={name}
        rows={rows}
        className={getInputClasses()}
        placeholder={placeholder}
        defaultValue={""}
        value={value}
        // onClick={eventHandler}
        onChange={action}
        disabled={disabled}
      />
    );
  }

  function SelectBox() {
    return (
      <select
        id={id}
        name={name}
        className={getInputClasses()}
        value={value}
        // onClick={eventHandler}
        onChange={action}
        disabled={disabled}
      >
        {data?.map((item, i) => (
          <option key={i} value={item.name}>
            {item.value}
          </option>
        ))}
      </select>
    );
  }

  function InfoMessage(varient) {
    return (
      <p className={FormConsts.getValidationMessage(varient)}>
        {validation?.info}
      </p>
    );
  }

  const isLableStart = () => formLablesAtEnd.indexOf(type) < 0 && label;

  function getInputBox(type) {
    switch (type) {
      case "textarea":
        return <Textarea />;
      case "select":
        return <SelectBox />;
      case "checkbox":
      case "radio":
        return <CheckRadiobox />;
      case "text":
      default:
        return <Input />;
    }
  }

  return (
    <div className={uistyle || FormConsts.fieldGroup()}>
      {isLableStart() ? <LcsLabel content={label} /> : ""}
      <div className={FormConsts.inputPreGroupPayrent()}>
        {preGroup ? (
          <span className={FormConsts.inputPreGroup()}>http://</span>
        ) : (
          ""
        )}
        {getInputBox(type)}
        {validation?.enabled ? (
          <p className={FormConsts.getValidationMessage("red")}>
            {validation.message}
          </p>
        ) : (
          ""
        )}
      </div>
      {isLableStart() && validation?.info ? InfoMessage("gray") : ""}
    </div>
  );
};

/*

USAGE
 <LcsInput
    id="push-everything"
    uistyle="mt-4 space-y-4 flex items-start"
    label="push Everything"
    name="push-notifications"
    type="radio"
    validation={{info:"Brief description for your profile. URLs are hyperlinked."}}
/>

* */
