import { ComponentProps } from "react";
import "./input.css";

type TextareaProps = ComponentProps<"textarea">;

type Props = Omit<TextareaProps, "onChange"> & {
  onChange: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Input = ({ className, onChange, ...props }: Props) => {
  return (
    <textarea
      {...props}
      onChange={(e) => {
        onChange(e.target.value, e);
      }}
      className={`input-custom-class ${className}`}
    />
  );
};
