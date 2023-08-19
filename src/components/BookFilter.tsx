/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiOutlineSearch } from "react-icons/hi";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { BsFilterLeft } from "react-icons/bs";
import { bookGenres } from "@/constant/book";
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import Select from "react-select";
import { IBookParams } from "@/types/globalTypes";
import { Label } from "./ui/label";

type ISearch = {
  search: string;
};
type IFilter = {
  genres: {
    [genre: string]: boolean;
  };
  fromYear: {
    label: number;
    value: number;
  };
  toYear: {
    label: number;
    value: number;
  };
};

type Props = {
  params: IBookParams;
  setParams: Dispatch<SetStateAction<IBookParams>>;
  refetch?: () => any;
};

export default function BookFilter({ params, setParams }: Props) {
  const { control: searchControl, handleSubmit: searchHandleSubmit } =
    useForm<ISearch>({
      defaultValues: {
        search: "",
      },
    });

  const {
    control: filterControl,
    reset: filterReset,
    handleSubmit: filterHandleSubmit,
  } = useForm<IFilter>({});

  const { search } = useWatch({ control: searchControl });

  //  * heavily rendering
  // const { genres, fromYear, toYear } = useWatch({ control: filterControl });
  // useEffect(() => {
  //   if (genres) {
  //     const checkedGenres = Object.keys(genres).filter(
  //       (genre) => genres[genre],
  //     );
  //     if (!checkedGenres.length && params?.genre) {
  //       const { genre, ...rest } = params;
  //       setParams({ ...rest, page: 1 });
  //       console.log({ genre });
  //     }
  //   }
  //   if (!fromYear && !toYear && params.publicationDate?.length) {
  //     const { publicationDate, ...rest } = params;
  //     setParams({ ...rest, page: 1 });
  //     console.log({ publicationDate });
  //   }
  // }, [genres, params, fromYear, toYear, setParams]);

  useEffect(() => {
    if (!search?.length && params?.searchTerm) {
      const { searchTerm, ...rest } = params;
      setParams({ ...rest, page: 1 });
      console.log({ searchTerm });
    }
  }, [search, setParams, params]);

  const handleSearch: SubmitHandler<ISearch> = (data) => {
    setParams({
      ...params,
      searchTerm: data.search,
      page: 1,
    });
  };

  const handleFilter: SubmitHandler<IFilter> = (data) => {
    const { toYear, genres, fromYear } = data;
    const filter: IBookParams = {};

    const genresData = Object.keys(genres).filter((genre) => genres[genre]);

    if (genresData.length) {
      filter.genre = genresData.join();
    }
    if (toYear || fromYear) {
      const to = toYear?.value;
      const from = fromYear?.value;
      filter.publicationDate = [from, to].join();
    }

    if (Object.keys(filter).length) {
      setParams({
        page: 1,
        limit: 6,
        sortBy: "publicationDate",
        ...filter,
      });
    } else {
      setParams({
        sortBy: "publicationDate",
        limit: 6,
      });
    }
  };

  const handleReset = () => {
    filterReset();
    setParams({
      sortBy: "publicationDate",
      limit: 6,
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-sm  font-semibold">
      <form
        onSubmit={searchHandleSubmit(handleSearch)}
        className="w-full flex justify-between gap-3 py-10 md:py-0 items-center"
      >
        <Controller
          name="search"
          rules={{ required: true }}
          control={searchControl}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="py-2 focus:scale-[1.02] focus-visible:ring-0"
              placeholder="Search by title, author, or genre"
            />
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className="w-3/12 hover:w-4/12 "
        >
          <HiOutlineSearch size={16} />
        </Button>
      </form>
      <form
        onSubmit={filterHandleSubmit(handleFilter)}
        className="w-full   border-[1px] border-gray-200 rounded p-4"
      >
        <h2 className="text-lg uppercase mb-3 font-bold text-gray-500">
          Filter Options
        </h2>
        <div className="mb-4">
          <p className="pb-2">
            <Label className="uppercase text-xs">popular Genres</Label>
          </p>
          {bookGenres.map((genre, index) => (
            <Label
              key={index}
              className="flex items-center hover:scale-[1.02] hover:text-blue-600"
            >
              <Controller
                name={`genres.${genre}`}
                control={filterControl}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onCheckedChange={(e) => onChange(e)}
                    checked={value}
                    value={genre}
                    className="mr-2 my-[2px]"
                  />
                )}
              />
              {genre}
            </Label>
          ))}
        </div>
        <div className="mb-8">
          <p className="pb-2">
            <Label className="uppercase text-xs">Publish Year</Label>
          </p>
          <div className="grid gap-2 mt-1">
            <Controller
              control={filterControl}
              name="toYear"
              render={({ field }) => (
                <Select
                  {...field}
                  options={(
                    [...Array(224)].map((_, index) => 2024 - index) as any
                  ).map((year: object) => ({
                    value: year,
                    label: year,
                  }))}
                  value={field?.value || ""}
                  onChange={(e) => field.onChange(e)}
                  classNamePrefix="react-select"
                  className="rounded-md focus-within:scale-[1.02]"
                  placeholder="Less than or equal to"
                  isSearchable={true}
                  isClearable={true}
                  menuPlacement="top"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                      "&:hover": {
                        border: "1px solid #e2e8f0",
                      },
                      boxShadow: "none",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? "white" : "#333333",
                      backgroundColor: state.isSelected ? "#3870ff" : "white",
                      "&:hover": {
                        backgroundColor: "#7398f7",
                        color: "white",
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#0f172a",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#64748b",
                    }),
                  }}
                />
              )}
            />
            <Controller
              control={filterControl}
              name="fromYear"
              render={({ field }) => (
                <Select
                  {...field}
                  options={(
                    [...Array(224)].map((_, index) => 2024 - index) as any
                  ).map((year: object) => ({
                    value: year,
                    label: year,
                  }))}
                  value={field?.value || ""}
                  onChange={(e) => field.onChange(e)}
                  classNamePrefix="react-select"
                  className="rounded focus-within:scale-[1.02]"
                  placeholder="Better than or equal to"
                  isSearchable={true}
                  isClearable={true}
                  menuPlacement="top"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "1px solid #e2e8f0",
                      color: "#64748b",
                      "&:hover": {
                        border: "1px solid #e2e8f0",
                      },
                      boxShadow: "none",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: state.isSelected ? "white" : "#333333",
                      backgroundColor: state.isSelected ? "#3870ff" : "white",
                      "&:hover": {
                        backgroundColor: "#7398f7",
                        color: "white",
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#0f172a",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#64748b",
                    }),
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            className="w-20 mr-2 rounded hover:scale-[1.02]"
            size="sm"
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            size="sm"
            className="w-20 rounded hover:scale-105"
            type="submit"
          >
            <BsFilterLeft size={18} />
            <span className="ml-1 whitespace-nowrap">Filter</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
