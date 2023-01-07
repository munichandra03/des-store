import React from "react";
import { FormStyles } from "@/consts/style.consts";
import { LcsLink } from "@/widgets/LcsLink";
import { Input } from "@/widgets/Input";
import { Button } from "@ /widgets/Button";

export default function FormLayout({ form, action }) {
  function handleAction(e, type) {
    action(1, type);
  }
  return (
    <>
      {form ? (
        <form name={form.name}>
          {form.groups?.map((group, gi) => (
            <div className={FormStyles.group()} key={gi}>
              <div className={FormStyles.group()}>
                {group?.fields?.map((field, fi) => (
                  <React.Fragment key={fi}>
                    {field.type === "link" ? (
                      <LcsLink href={field.link} {...field} />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.label}
                        label={field.label}
                        data={field.data}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {form.actions?.map((action, ai) => (
            <div className={FormStyles.group()} key={ai}>
              <Button
                uistyle={FormStyles.button()}
                {...action}
                action={(e) => handleAction(e, action.action)}
              />
            </div>
          ))}
        </form>
      ) : (
        "Form Data not found"
      )}
    </>
  );
}
