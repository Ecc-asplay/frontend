"use client";
import StepBar from "./StepBar";

type RegisterLayoutProps = {
  step: number;
  children: React.ReactNode;
};

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ step, children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center overflow-y-auto bg-basebg " >
        <div className="w-3/4">
          <StepBar step={step} />
        </div>
        
        <div className="flex-grow w-full flex flex-col justify-center items-center px-4">
          {children}
          </div>
    </div>
  );
};

export default RegisterLayout;
