import type React from "react";
import PlusIcon from "../../assets/icons/plus-icon.svg";

interface ActionBarProps {
  text: string;
  icon?: string | React.ReactNode;
  onAddClick: () => void;
  style?: {
    containerClassName?: string;
    textClassName?: string;
    backgroundColor?: string;
    iconSize?: number;
    addButtonColor?: string;
  };
}
const AgentCard = ({ text, icon, onAddClick, style = {} }: ActionBarProps) => {
  const {
    containerClassName = "w-full",
    textClassName = "text-base font-semibold",
    backgroundColor = "bg-white",
    iconSize = 24,
    addButtonColor = "bg-green-500",
  } = style;

  return (
    <div
      className={`
        relative
        rounded-2xl px-6 py-5
        ${containerClassName}
        ${backgroundColor}
        shadow-sm border border-gray-100
      `}
    >
      <div className="flex items-center justify-center gap-3">
        {/* Optional Icon/Avatar */}
        {icon && (
          <div className="flex-shrink-0">
            {typeof icon === "string" ? (
              <img
                src={icon || "/placeholder.svg"}
                alt="icon"
                width={iconSize}
                height={iconSize}
                className="rounded-full object-contain"
              />
            ) : (
              <div
                className="rounded-full flex items-center justify-center bg-gray-200"
                style={{ width: iconSize, height: iconSize }}
              >
                {icon}
              </div>
            )}
          </div>
        )}

        {/* Text - Centered */}
        <p className={`text-foreground ${textClassName}`}>{text}</p>
      </div>

      <button
        onClick={onAddClick}
        className={`
          absolute top-[-1px] right-[-1px]
          flex items-center justify-center
          rounded-full w-7 h-7
          ${addButtonColor} hover:opacity-90
          transition-opacity duration-200
          text-white
          cursor-pointer
        `}
        aria-label="Add action"
      >
        <img src={PlusIcon} alt="plus-icon" />
      </button>
    </div>
  );
};

export default AgentCard;
