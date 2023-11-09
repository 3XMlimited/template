import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputListForm = ({
  title,
  name,
  placeholder,
  style,
  value,
  setValue,
  index,
}) => {
  async function arraySetValue(v) {
    if (title === "score") {
      try {
        if (v !== "") {
          v = parseInt(v);
        }
      } catch (error) {
        v = 1;
      }
      if (isNaN(v)) {
        v = 1;
      }
    }
    let array = value[`${name}`];

    for (let i = 0; i < array.length; i++) {
      if (i === index) {
        if (array.includes(v) && v !== "" && title !== "score") {
          array[i] = v + "_copy";
        } else {
          array[i] = v;
        }
      }
    }

    setValue((prev) => ({ ...prev, [`${name}`]: array }));
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 ">
      <Label htmlFor={name}>{title}</Label>
      <Input
        // type="string"
        id={index}
        placeholder={placeholder}
        style={style}
        value={value[`${name}`][index]}
        onChange={(e) => arraySetValue(e.target.value)}
      />
      {/* <Separator /> */}
    </div>
  );
};

export default InputListForm;
