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
    <div className="text-center my-28 ">
      <div className="flex justify-center">
        <p className="text-sm text-muted-foreground pb-4 border-b-[1px] w-3/4">
          {`Showing ${startItem}-${lastItem} of ${meta.total} books`}
        </p>
      </div>
      <div className="flex justify-evenly gap-3 text-xs font-medium mt-5 items-center">
        <Button
          onClick={() => handlePage(1)}
          size="sm"
          variant="outline"
          disabled={meta.page === 1}
        >
          <RiArrowLeftDoubleFill size={16} />
        </Button>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => handlePage(meta.page - 1)}
            className="w-8 p-0"
            size="sm"
            variant="outline"
            disabled={meta.page === 1}
          >
            <RiArrowLeftSLine size={16} />
          </Button>
          {meta.page > pageLen && (
            <Button className="w-8 p-0" size="sm" variant="ghost" disabled>
              <BsThreeDots size={16} />
            </Button>
          )}
          {displayedPages.map((page) => (
            <Button
              key={page}
              size="sm"
              variant={meta.page === page ? "default" : "outline"}
              onClick={() => handlePage(page)}
            >
              {page}
            </Button>
          ))}
          {lessThanMaxLen && notLastPage && (
            <Button className="w-8 p-0" size="sm" variant="ghost" disabled>
              <BsThreeDots size={16} />
            </Button>
          )}
          <Button
            onClick={() => handlePage(meta.page + 1)}
            className="w-8 p-0"
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
          variant="outline"
          disabled={meta.page === totalPages}
        >
          <RiArrowRightDoubleFill size={16} />
        </Button>
      </div>
    </div>
  );
}
