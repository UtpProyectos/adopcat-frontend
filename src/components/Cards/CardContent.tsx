import React from "react";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={`p-4 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};
