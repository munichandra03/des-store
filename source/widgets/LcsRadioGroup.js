import React from "react";
import { LcsRadioGroupStyles } from "@/consts/style.consts";

const LcsRadioGroup = ({}) => {
  const { root, input, label, position } = LcsRadioGroupStyles;
  return (
    <ul className={root()}>
      <li className={position()}>
        <input
          className={input()}
          type="radio"
          value="yes"
          name="productsize"
          id="sizeXL"
        />
        <label className={label()} for="sizeXL">
          XL
        </label>
      </li>
      <li className={position()}>
        <input
          className={input()}
          type="radio"
          value="no"
          name="productsize"
          id="sizeL"
        />
        <label className={label()} for="sizeL">
          L
        </label>
      </li>
      <li className={position()}>
        <input
          className={input()}
          type="radio"
          value="maybe"
          name="productsize"
          id="sizeM"
        />
        <label className={label()} for="sizeM">
          M
        </label>
      </li>
    </ul>
  );
};

export default LcsRadioGroup;
