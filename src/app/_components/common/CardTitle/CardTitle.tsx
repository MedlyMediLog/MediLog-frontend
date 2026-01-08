import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: ReactNode;
  right?: ReactNode;
  className?: string;
};

export default function CardTitle({ icon, title, right, className }: Props) {
  return (
    <div className={clsx("flex items-center w-full gap-2", className)}>
      {icon ? <div className="shrink-0">{icon}</div> : null}

      <div className=" min-w-0">
        <div className="block truncate text-fg-basic-accent typo-h5 desktop:typo-h4 ">
          {title}
        </div>
      </div>

      {right ? <div className="shrink-0 flex items-center">{right}</div> : null}
    </div>
  );
}
