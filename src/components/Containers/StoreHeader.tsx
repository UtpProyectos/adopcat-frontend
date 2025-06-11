import { ReactNode } from "react";

type StoreHeaderProps = {
  title: string;
  subtitle?: string;
  imageRight?: ReactNode;
};

const StoreHeader = ({ title, subtitle, imageRight }: StoreHeaderProps) => {
  return (
    <section className="bg-[#fafafa] dark:bg-[#1e1e1e] relative overflow-hidden pt-32 pb-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Texto */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-md">
              {subtitle}
            </p>
          )}
        </div>

        {/* Imagen derecha */}
        <div className="w-full md:w-1/2 relative flex justify-center items-end mt-10 md:mt-0">
          <div className="relative z-10">
            {imageRight}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreHeader;
