import { IMeta } from "@/types/responseTypes";

const getPages = (meta: IMeta, pageLen: number = 5) => {
  const { limit, page, total } = meta;
  const totalPages = Math.ceil(total / limit);
  const startPage = Math.max(1, Math.floor((page - 1) / pageLen) * pageLen + 1);
  const endPage = Math.min(totalPages, startPage + pageLen - 1);

  const displayedPages = [...Array(endPage - startPage + 1)].map(
    (_, index) => startPage + index,
  );

  const lessThanMaxLen = totalPages > displayedPages.length;
  const isLastPage = totalPages === page;

  return {
    displayedPages,
    totalPages,
    lessThanMaxLen,
    isLastPage,
  };
};

const getItems = (meta: IMeta) => {
  const { limit, page, total } = meta;
  const sumOfItems = limit * page;
  const startItem = sumOfItems - limit + 1;
  const lastItem = Math.min(sumOfItems, total);

  return {
    startItem,
    lastItem,
  };
};

export const paginationHelpers = {
  getPages,
  getItems,
};
