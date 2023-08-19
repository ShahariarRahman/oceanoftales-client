import {
  RiArrowLeftDoubleFill,
  RiArrowLeftSLine,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
} from "react-icons/ri";
import { Button } from "./ui/button";
import { IApiResponse } from "@/types/responseTypes";
import { IBook, IBookParams } from "@/types/globalTypes";
import { Dispatch, SetStateAction } from "react";
import { paginationHelpers } from "@/helpers/paginationHelpers";
import { BsThreeDots } from "react-icons/bs";

type IProps = {
  meta: IApiResponse<IBook>["meta"];
  params: IBookParams;
  setParams: Dispatch<SetStateAction<IBookParams>>;
};

export default function Pagination({ meta, params, setParams }: IProps) {
  if (!meta) {
    return;
  }
  const pageLen = 5;

  const { displayedPages, totalPages, lessThanMaxLen, notLastPage } =
    paginationHelpers.getPages(meta, pageLen);

  const { startItem, lastItem } = paginationHelpers.getItems(meta);

  const handlePage = (pageNumber: number) => {
    setParams({
      ...params,
      page: pageNumber,
    });
  };

  return (
    <div className="my-20 caret-transparent">
      <p className="text-sm text-muted-foreground pb-4 border-b-[1px] w-full">
        {`Showing ${startItem}-${lastItem} of ${meta.total} books`}
      </p>
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-10 text-xs font-medium items-center">
          <Button
            onClick={() => handlePage(1)}
            size="sm"
            className="hidden w-8 p-0 hover:scale-105 sm:flex"
            variant="outline"
            disabled={meta.page === 1}
          >
            <RiArrowLeftDoubleFill size={16} />
          </Button>
          <div className="flex gap-1 sm:gap-2 items-center">
            <Button
              onClick={() => handlePage(meta.page - 1)}
              className="w-8 p-0 hover:scale-105"
              size="sm"
              variant="outline"
              disabled={meta.page === 1}
            >
              <RiArrowLeftSLine size={16} />
            </Button>
            {meta.page > pageLen && (
              <Button
                className="w-8 p-0 hover:scale-105"
                size="sm"
                variant="ghost"
                disabled
              >
                <BsThreeDots size={16} />
              </Button>
            )}
            {displayedPages.map((page) => (
              <Button
                key={page}
                size="sm"
                className="w-8 p-0 hover:scale-105"
                variant={meta.page === page ? "default" : "outline"}
                onClick={() => handlePage(page)}
              >
                <span>{page}</span>
              </Button>
            ))}
            {lessThanMaxLen && notLastPage && (
              <Button
                className="w-8 p-0 hover:scale-105"
                size="sm"
                variant="ghost"
                disabled
              >
                <BsThreeDots size={16} />
              </Button>
            )}
            <Button
              onClick={() => handlePage(meta.page + 1)}
              className="w-8 p-0 hover:scale-105"
              size="sm"
              variant="outline"
              disabled={meta.page === totalPages}
            >
              <RiArrowRightSLine size={16} />
            </Button>
          </div>
          <Button
            onClick={() => handlePage(totalPages)}
            size="sm"
            className="hidden w-8 p-0 hover:scale-105 sm:flex"
            variant="outline"
            disabled={meta.page === totalPages}
          >
            <RiArrowRightDoubleFill size={16} />
          </Button>
        </div>
        <Button
          className="font-normal cursor-default hover:bg-inherit"
          variant="ghost"
        >
          <span className="mr-1 hidden sm:flex">Page - </span>
          <span>{`${meta.page}/${totalPages}`}</span>
        </Button>
      </div>
    </div>
  );
}
