"use client";
import StepBar from "./StepBar";

type RegisterLayoutProps = {
  step: number;
  children: React.ReactNode;
};

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ step, children }) => {
  return (
    <div className=" bg-basebg" >
        <StepBar step={step} />
        <div>{children}</div>
    </div>
  );
};

export default RegisterLayout;
