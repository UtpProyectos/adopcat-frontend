// import { CircularProgress } from "@heroui/react";

import { IconCat } from "@tabler/icons-react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = "Cargando..." }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center text-center gap-2">
       <IconCat size={48} className="text-primary animate-spin" />
      {/* <CircularProgress aria-label="Loading..." /> */}
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
};

export default LoadingSpinner; 