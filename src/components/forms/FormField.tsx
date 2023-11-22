import FormError from "./FormError";
import { KeyboardEventHandler } from "react";

type FormFieldProps = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  error?: string;
};

export default function FormField({
  label,
  type,
  value,
  error,
  onChange,
  onKeyUp,
}: FormFieldProps) {
  const fieldName = label.replace(/\s/g, "-");

  return (
    <div className="flex flex-col mb-4 p-2 gap-2">
      <label className="font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        className="border border-teal-400 p-2 bg-teal-200 dark:bg-teal-950 rounded-md focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-500 focus:outline-none"
        type={type}
        id={fieldName}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={onKeyUp}
        aria-invalid={!!error}
      />
      <FormError fieldName={fieldName} message={error} />
    </div>
  );
}
