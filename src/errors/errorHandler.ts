import { SwalToast } from "@/components/Toast";
import { IErrorResponse } from "@/types/responseTypes";

const showApiErrorMessage = (errorData: IErrorResponse) => {
  const errorMessage = errorData?.data?.message;

  const genMessage = (len: number) =>
    errorMessage?.split(" ").slice(0, len).join(" ");

  return SwalToast.failed.fire(genMessage(3), genMessage(10));
};

export const errorHandler = {
  showApiErrorMessage,
};
