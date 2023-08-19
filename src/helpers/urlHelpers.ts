import { IBookParams } from "@/types/globalTypes";

const createParams = (params: IBookParams): string => {
  const formattedParams = Object.entries(params).map(
    ([key, value]) => `${key}=${value}`,
  );
  return formattedParams.join("&");
};

const userBookUrl = (endpoint: string, email?: string, id?: string) => {
  return !email
    ? `/user-book/${endpoint}`
    : !id
    ? `/user-book/${endpoint}/${email}`
    : `/user-book/${endpoint}/${email}/${id}`;
};

export const urlHelper = {
  createParams,
  userBookUrl,
};
