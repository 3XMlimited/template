import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputForm = ({
  title,
  name,
  placeholder,
  style,
  value,
  setValue,
  index,
}) => {
  async function arraySetValue(v) {
    setValue((prev) => ({ ...prev, [`${name}`]: v }));
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 ">
      <Label
        htmlFor={name}
        className={`${
          (title === "Topic" || title === "Form") &&
          "text-primary-500 font-bold text-[30px]"
        }`}
      >
        {title}
      </Label>
      <Input
        // type="string"
        id={index}
        placeholder={placeholder}
        style={style}
        value={
          Array.isArray(value[`${name}`])
            ? value[`${name}`][index]
            : value[`${name}`]
        }
        onChange={(e) => arraySetValue(e.target.value)}
      />
      {/* <Separator /> */}
    </div>
  );
};

export default InputForm;
