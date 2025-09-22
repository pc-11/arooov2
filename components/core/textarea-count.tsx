import clsx from "clsx";
import { useState, type ComponentProps } from "react";

export function CountingTextArea({
  className,
  defaultValue,
  maxLength,
  ...props
}: ComponentProps<"textarea"> & {
  className?: string;
  defaultValue?: string;
  maxLength: number;
}): React.ReactElement {
  const [text, setText] = useState(defaultValue ?? "");
  let onchange = (e: any) => {
    console.log(e.target.value.length);
    setText(e.target.value);
  };
  let errorSpanClass =
    text.length > maxLength ? "text-[#ff0000]" : "text-black";
  let errorTextClass =
    text.length > maxLength ? "border-2 border-[#ff0000]!" : "";
  return (
    <>
      <p>
        <b>Character count:</b>{" "}
        <span className={errorSpanClass}>
          {text.length}/{maxLength}
        </span>
      </p>
      <textarea
        className={clsx(className, errorTextClass)}
        defaultValue={defaultValue}
        {...props}
        onChange={onchange}
      />
    </>
  );
}
