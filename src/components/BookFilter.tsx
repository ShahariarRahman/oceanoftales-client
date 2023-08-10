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
  fromYear: number;
  toYear: number;
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
  } = useForm<IFilter>({
    defaultValues: {
      fromYear: undefined,
      toYear: undefined,
    },
  });

  const { genres } = useWatch({ control: filterControl });
  const { search } = useWatch({ control: searchControl });

  useEffect(() => {
    if (genres) {
      const checkedGenres = Object.keys(genres).filter(
        (genre) => genres[genre],
      );
      if (!checkedGenres.length && params?.genre) {
        const { genre, ...rest } = params;
        console.log(genre);
        setParams({ ...rest, page: 1 });
      }
    }
  }, [genres, params, setParams]);

  useEffect(() => {
    if (!search?.length && params?.searchTerm) {
      const { searchTerm, ...rest } = params;
      setParams({ ...rest, page: 1 });
      console.log(searchTerm);
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
    console.log(data);
    const genres = Object.keys(data.genres).filter(
      (genre) => data.genres[genre],
    );

    if (data && genres.length) {
      const filter = {
        fromYear: data?.fromYear,
        toYear: data?.toYear,
        genres,
      };
      console.log(filter);
      // setUrl(
      //   `books?genre=${filter.genres}&publicationDate=${filter.fromYear},${filter.toYear}`,
      // );
      setParams({
        ...params,
        page: 1,
        genre: filter.genres.join(","),
      });
      console.log(genres);
      // setUrl(`books?genre=${filter.genres}`);
    }
    if (!genres.length) {
      const { genre, ...rest } = params;
      console.log(genre);
      setParams(rest);
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center space-y-4 sticky top-20">
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
        <h2 className="text-xl uppercase mb-3">Filter Options</h2>
        <div className="mb-4">
          <h3 className="text-lg uppercase mb-2">Genre</h3>
          {bookGenres.map((genre, index) => (
            <label key={index} className="flex items-center">
              <Controller
                name={`genres.${genre}`}
                control={filterControl}
                defaultValue={false}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    onCheckedChange={onChange}
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
              name="fromYear"
              render={({ field }) => (
                <Select
                  {...field}
                  options={(
                    [...Array(27)].map((_, index) => 2001 + index) as any
                  ).map((year: object) => ({
                    value: year,
                    label: year,
                  }))}
                  value={field?.value || ""}
                  onChange={(e) => field.onChange(e)}
                  classNamePrefix="react-select"
                  className="rounded-md text-md"
                  placeholder="Select from year"
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
              name="toYear"
              render={({ field }) => (
                <Select
                  {...field}
                  options={(
                    [...Array(27)].map((_, index) => 2001 + index) as any
                  ).map((year: object) => ({
                    value: year,
                    label: year,
                  }))}
                  value={field?.value || ""}
                  onChange={(e) => field.onChange(e)}
                  classNamePrefix="react-select"
                  className="rounded-md text-md"
                  placeholder="Select to year"
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
        <div className="flex justify-end mt-4">
          <Button className="mr-2" type="submit">
            <BsFilterLeft size={18} />
            <span className="ml-1 whitespace-nowrap">Filter</span>
          </Button>
          <Button variant="outline" onClick={() => filterReset()}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
