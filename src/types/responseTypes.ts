export type IErrorResponse = {
  data: {
    errorMessages: Array<object>;
    message: string;
    stack: string;
    succuss: boolean;
  };
};

export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};
