import React from "react";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  title: string;
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  title,
  className,
  disabled,
}) => {
  return (
    <button type={type} className={className} disabled={disabled}>
      {title}
    </button>
  );
};

export default CustomButton;
