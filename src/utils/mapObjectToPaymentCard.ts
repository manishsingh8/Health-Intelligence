// utils/mapPaymentCardsWithBg.ts

const CARD_COLORS = ["#ECF2FF", "#E8F7FF", "#E6FFFA", "#FEF5E5", "#FFF0F0"];

type PaymentCardInput = {
  headerText: string;
  amount: string;
};

type PaymentCardOutput = PaymentCardInput & {
  id: number;
  bgColor: string;
};

type HeaderTextMap = Record<string, string>;

export const mapPaymentCardsWithBg = (
  data: PaymentCardInput[] = [],
  headerTextMap?: HeaderTextMap
): PaymentCardOutput[] => {
  return data.map((item, index) => ({
    ...item,
    id: index + 1,
    headerText: headerTextMap?.[item.headerText] ?? item.headerText,
    bgColor: CARD_COLORS[index % CARD_COLORS.length],
  }));
};
