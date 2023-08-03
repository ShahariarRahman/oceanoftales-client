/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiOutlineSearch } from "react-icons/hi";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { BsFilterLeft } from "react-icons/bs";
import { bookGenres } from "@/constant/book";
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";

type ISearch = {
  search: string;
};
type IFilter = {
  genres: {
    [genre: string]: boolean;
  };
  fromYear: string;
  toYear: string;
};

type Props = {
  setUrl: Dispatch<SetStateAction<string>>;
  refetch: () => any;
};

export default function BookFilter({ setUrl }: Props) {
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
      fromYear: "2001",
      toYear: "2027",
    },
  });

  const { genres } = useWatch({ control: filterControl });
  const { search } = useWatch({ control: searchControl });

  useEffect(() => {
    if (genres) {
      const checkedGenres = Object.keys(genres).filter(
        (genre) => genres[genre],
      );
      if (!checkedGenres.length) {
        setUrl(`/books`);
      }
    }
  }, [genres, setUrl]);

  useEffect(() => {
    if (!search?.length) {
      setUrl(`/books`);
      console.log("search =", search);
    }
  }, [search, setUrl]);

  const handleSearch: SubmitHandler<ISearch> = (data) => {
    setUrl(`books?searchTerm=${data.search}`);
  };

  const handleFilter: SubmitHandler<IFilter> = (data) => {
    const genres = Object.keys(data.genres).filter(
      (genre) => data.genres[genre],
    );

    if (data && data.fromYear && data.toYear && genres.length) {
      const filter = {
        fromYear: data.fromYear,
        toYear: data.toYear,
        genres,
      };
      console.log(filter);
      // setUrl(
      //   `books?genre=${filter.genres}&publicationDate=${filter.fromYear},${filter.toYear}`,
      // );
      setUrl(`books?genre=${filter.genres}`);
    }
    if (!genres.length) {
      setUrl(`/books`);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 my-5">
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
        className="w-full max-w-md border border-gray-300 rounded-md p-4"
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
          <div className="grid grid-cols-3 gap-2">
            <label
              htmlFor="yearSelect"
              className="flex items-center text-gray-700 font-semibold mb-2"
            >
              From
            </label>
            <Controller
              name="fromYear"
              rules={{ required: true }}
              control={filterControl}
              render={({ field }) => (
                <select
                  {...field}
                  className="col-span-2 bg-white border appearance-none border-gray-300  px-4 py-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full rounded-md text-gray-600 focus:shadow-outline"
                >
                  {[...Array(27)]
                    .map((_, index) => 2001 + index)
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
              )}
            />
            <label
              htmlFor="yearSelect"
              className=" flex items-center text-gray-700  font-semibold mb-2"
            >
              To
            </label>
            <Controller
              name="toYear"
              rules={{ required: true }}
              control={filterControl}
              render={({ field }) => (
                <select
                  {...field}
                  className="col-span-2 bg-white border appearance-none border-gray-300 px-4 py-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full rounded-md text-gray-600 focus:shadow-outline"
                >
                  {[...Array(27)]
                    .map((_, index) => 2001 + index)
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>
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
