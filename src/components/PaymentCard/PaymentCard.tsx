interface PaymentCardProps {
  headerText: string;
  amount: string;
  bgColor?: string;
  border?: boolean;
  borderColor?: string;
  containerWidth?: "small" | "medium" | "large";
}

const widthMap: Record<
  NonNullable<PaymentCardProps["containerWidth"]>,
  string
> = {
  small: "200px",
  medium: "240px",
  large: "300px",
};

const PaymentCard = ({
  headerText,
  amount,
  bgColor = "#FFFFFF",
  border = false,
  borderColor = "#E5E7EB",
  containerWidth = "small",
}: PaymentCardProps) => {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: bgColor,
        border: border ? `1px solid ${borderColor}` : "none",
        width: widthMap[containerWidth],
      }}
    >
      <div className="text-sm text-[#737373]">{headerText}</div>
      <div className="text-xl font-semibold text-[#0A0A0A]">{amount}</div>
    </div>
  );
};

export default PaymentCard;
