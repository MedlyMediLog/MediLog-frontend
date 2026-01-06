import * as React from "react";
import { cn } from "@/utils/cn";

type InputSize = "sm" | "md" | "lg";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  inputSize?: InputSize;

  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;

  clearable?: boolean;
  onClear?: () => void;

  withPasswordToggle?: boolean;

  loading?: boolean;

  containerClassName?: string;

  invalid?: boolean;
};

const sizeClass: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "md",
      leftSlot,
      rightSlot,
      clearable,
      onClear,
      withPasswordToggle,
      loading,
      containerClassName,
      className,
      type,
      value,
      defaultValue,
      onChange,
      invalid,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState<string>(
      String(defaultValue ?? "")
    );
    const currentValue = String(isControlled ? value ?? "" : inner);

    const [showPw, setShowPw] = React.useState(false);
    const resolvedType =
      withPasswordToggle && type === "password"
        ? showPw
          ? "text"
          : "password"
        : type;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!isControlled) setInner(e.target.value);
      onChange?.(e);
    };

    const canClear = !!clearable && !disabled && currentValue.length > 0;

    const handleClear = () => {
      if (!canClear) return;
      onClear?.();

      if (!isControlled) setInner("");

      if (isControlled && onChange) {
        const event = {
          ...new Event("change"),
          target: { value: "" },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border",
          invalid ? "border-red-500" : "border-neutral-300",
          disabled ? "opacity-60" : "",
          containerClassName
        )}
      >
        {leftSlot ? <span className="pl-2">{leftSlot}</span> : null}

        <input
          ref={ref}
          type={resolvedType}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={invalid ? true : undefined}
          className={cn(
            "w-full bg-transparent outline-none",
            sizeClass[inputSize],
            className
          )}
          {...props}
        />

        {/* Right area */}
        <div className="flex items-center gap-1 pr-2">
          {loading ? <span aria-label="loading">⏳</span> : null}

          {canClear ? (
            <button
              type="button"
              onClick={handleClear}
              aria-label="clear"
              className="px-1"
            >
              ✕
            </button>
          ) : null}

          {withPasswordToggle && type === "password" ? (
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "hide password" : "show password"}
              className="px-1"
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          ) : null}

          {rightSlot ? <span>{rightSlot}</span> : null}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
