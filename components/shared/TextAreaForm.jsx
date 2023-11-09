import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const TextAreaForm = ({
  title,
  name,
  placeholder,
  value,
  setValue,
  category,
}) => {
  // console.log("value", value);

  let s = [];
  if (category && category !== "") {
    s = value[`${name}`].filter((r) => r.category === category);
    s = s[s.length - 1] ? s[s.length - 1].value : null;
  } else {
    s = value[`${name}`];
  }

  async function fetchChange(e) {
    console.log("change", e.target.value);
    if (category && category !== "") {
      setValue((prev) => ({
        ...prev,
        [`${name}`]: [
          ...value[`${name}`],
          { category, value: e.target.value.replace("↵", "").split(",") },
        ],
      }));
    } else {
      setValue((prev) => ({ ...prev, [`${name}`]: e.target.value }));
    }
  }
  // console.log(name, text);
  return (
    <div className="grid w-full gap-1.5 max-h-[400px]  ">
      <Label htmlFor="message-2">{title}</Label>
      <Textarea
        placeholder={placeholder}
        id="message-2"
        className="h-[200px] "
        value={s}
        // value={
        //   category && category !== ""
        //     ? s[s.length - 1].value?.toString()
        //     : value[`${name}`]
        // }
        onChange={(e) => fetchChange(e)}
      />
    </div>
  );
};

export default TextAreaForm;
