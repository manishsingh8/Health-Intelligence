import type React from "react";

interface TileProps {
  image: string | React.ReactNode;
  text: string;
  style?: {
    containerClassName?: string;
    imageSize?: number;
    textClassName?: string;
    backgroundColor?: string;
    imageBgColor?: string;
  };
  onClick?: () => void;
}

const Tile = ({ image, text, style = {}, onClick }: TileProps) => {
  const {
    containerClassName = "w-32 h-32",
    imageSize = 36,
    textClassName = "text-base font-semibold",
    backgroundColor = "bg-white",
  } = style;

  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col flex-wrap items-center justify-center gap-3 
        rounded-2xl p-2 cursor-pointer
        transition-transform duration-200 hover:scale-105
        ${containerClassName}
        ${backgroundColor}
        max-w-[100px] max-h-[90px]
      `}
    >
      {/* Image Container */}
      <div>
        {typeof image === "string" ? (
          <img
            src={image || "/placeholder.svg"}
            alt={text}
            width={imageSize}
            height={imageSize}
            className="object-contain"
          />
        ) : (
          <div
          // className="flex items-center justify-center"
          // style={{ width: imageSize, height: imageSize }}
          >
            {image}
          </div>
        )}
      </div>

      {/* Text */}
      <p className={`text-center text-foreground ${textClassName}`}>{text}</p>
    </div>
  );
};

export default Tile;
