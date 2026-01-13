export type Target = "PREGNANT" | "TEEN" | "DIETER";
export type Level = "ALLOW" | "CAUTION" | "FORBID";

export type ProductDetail = {
  productId: number;
  category: string;
  name: string;
  manufacturer: string;
  target: Target | null;
  level: Level | null;
  appearanceForm: string;
  text: string;
  ingredients: string[];
  functionText: string[];
  howToEat: string;
  expiration: string;
  storageMethod: string;
  cautionRaw: string[];
  imageUrl: string;
};
