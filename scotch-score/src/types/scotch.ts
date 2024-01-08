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
  numberOfOneStarRatings: number;
  numberOfTwoStarRatings: number;
  numberOfThreeStarRatings: number;
  numberOfFourStarRatings: number;
  numberOfFiveStarRatings: number;
  numberOfRatings: number;
  averageRating: number;
  numberOfPositiveRecommendations: number;
  numberOfNegativeRecommendations: number;
  numberOfRecommendations: number;
  dateCreated: Date;
}

type ScotchColumn = keyof Scotch;

export default Scotch;
export type { ScotchColumn };
