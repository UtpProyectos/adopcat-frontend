import React, { useEffect, useRef, useState } from "react";

interface StepCardProps {
  number: string | number;
  title: string;
  description: string;
  className?: string;
  textAlign?: "start" | "center" | "end";
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, className, textAlign = "end" }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAbove, setShowAbove] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showTooltip && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      if (tooltipRect.bottom > containerRect.bottom) {
        setShowAbove(true);
      } else {
        setShowAbove(false);
      }
    }
  }, [showTooltip]);

  return (
    <div
    ref={containerRef}
      className={`max-w-xs cursor-pointer ${className ?? ""}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((prev) => !prev)} // toggle on click (útil en móviles)
    >
      <h2 className={`text-orange-500 font-extrabold text-xl  md:text-3xl text-${textAlign}`} >{number}</h2>
      <h3 className="text-gray-900 dark:text-gray-400 font-semibold text-xs  md:text-lg ">{title}</h3>

      {/* Tooltip */}
      {showTooltip && (
        <div
          ref={tooltipRef}
          className={`absolute z-10 bg-gray-900 text-white text-xs rounded-md p-3 w-40 shadow-lg left-1/2 transform -translate-x-1/2 ${showAbove ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          role="tooltip"
        >
          {description}
          <div
            className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 ${showAbove ? "top-full" : ""
              }`}
          />
        </div>
      )}
    </div>
  );
};

export default StepCard;
