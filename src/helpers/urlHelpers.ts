import { IBookParams } from "@/types/globalTypes";

export const createParams = (params: IBookParams): string => {
  const formattedParams = Object.entries(params).map(
    ([key, value]) => `${key}=${value}`,
  );
  return formattedParams.join("&");
};
