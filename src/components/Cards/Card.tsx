import React from "react";
import { cn } from "../../lib/utils"; // usa esto si tienes utilidades para unir clases (opcional)

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("bg-white border rounded-xl shadow-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
};
