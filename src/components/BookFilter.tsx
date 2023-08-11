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
    <div className="flex flex-col items-center space-y-4 sticky top-20 text-sm">
      <form
        onSubmit={searchHandleSubmit(handleSearch)}
        className="w-full flex justify-between gap-3 items-center"
      >
        <Controller
          name="search"
          rules={{ required: true }}
          control={searchControl}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="py-2"
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
        className="w-full max-w-md border border-gray-300 rounded-md p-4 text-gray-700"
      >
        <h2 className="text-lg uppercase mb-3">Filter Options</h2>
        <div className="mb-4">
          <h3 className="text-md uppercase mb-2">Genre</h3>
          {bookGenres.map((genre, index) => (
            <label key={index} className="flex items-center">
              <Controller
                name={`genres.${genre}`}
                control={filterControl}
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onCheckedChange={(e) => onChange(e)}
                    checked={value}
                    value={genre}
                    className="mr-2"
                  />
                )}
              />
              {genre}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="text-lg uppercase mb-2">Publish Year</h3>
          <div className="grid gap-2 mt-3">
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
                  className="rounded-md"
                  placeholder="To year or range"
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
                  className="rounded-md"
                  placeholder="From year or range"
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
            className="w-20 mr-2 rounded"
            size="sm"
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button size="sm" className="w-20 rounded" type="submit">
            <BsFilterLeft size={18} />
            <span className="ml-1 whitespace-nowrap">Filter</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
