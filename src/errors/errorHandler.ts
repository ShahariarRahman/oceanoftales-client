import { SwalToast } from "@/components/Toast";
import { IErrorResponse } from "@/types/responseTypes";

type ICustomMsg = {
  title: string;
  des: string;
};

const showError = (error: IErrorResponse, custom?: ICustomMsg) => {
  const errorMessage = error?.data?.message;

  if (errorMessage) {
    const genMessage = (len: number) =>
      errorMessage?.split(" ").slice(0, len).join(" ");

    return SwalToast.failed.fire(genMessage(3), genMessage(10));
  } else {
    return SwalToast.failed.fire(custom?.title, custom?.des);
  }
};

export const errorHandler = {
  showError,
};
