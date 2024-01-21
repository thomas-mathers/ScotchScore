import CurrencyCode from "./currencyCode";
import ScotchRegion from "./scotchRegion";

interface Scotch {
  id: string;
  name: string;
  description: string;
  distillery: string;
  region: ScotchRegion;
  age: number;
  amount: number;
  currency: CurrencyCode;
  images: string[];
  ratingCounts: number[];
  averageRating: number;
  dateCreated: Date;
}

type ScotchColumn = keyof Scotch;

export default Scotch;
export type { ScotchColumn };
