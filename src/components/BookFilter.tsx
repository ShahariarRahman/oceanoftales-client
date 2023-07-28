import { HiOutlineSearch } from "react-icons/hi";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { BsFilterLeft } from "react-icons/bs";
import { bookGenres } from "@/constant/bookInfo";

export default function BookFilter() {
  //! Dummy Data
  const handleFilter = () => {};
  const handleReset = () => {};
  //! Dummy Data

  return (
    <div className="flex flex-col items-center space-y-4 my-5">
      <div className="w-full flex justify-between gap-3 items-center">
        <Input
          className="py-2"
          placeholder="Search by title, author, or genre"
        />
        <Button variant="secondary" className="w-3/12 hover:w-4/12">
          <HiOutlineSearch size={16} />
        </Button>
      </div>
      <div className="w-full max-w-md border border-gray-300 rounded-md p-4">
        <h2 className="text-xl uppercase mb-3">Filter Options</h2>
        <div className="mb-4">
          <h3 className="text-lg uppercase mb-2">Genre</h3>
          {bookGenres.map((genre) => (
            <label key={genre} className="flex items-center">
              <Checkbox
                value={genre}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  console.log(target.value);
                }}
                className="mr-2"
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
            <select
              className="col-span-2 bg-white border appearance-none border-gray-300  px-4 py-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full rounded-md   text-gray-600 focus:shadow-outline"
              defaultValue={2022}
            >
              {[...Array(27)]
                .map((_, index) => 2001 + index)
                .map((year) => (
                  <option value={year}>{year}</option>
                ))}
            </select>
            <label
              htmlFor="yearSelect"
              className=" flex items-center text-gray-700  font-semibold mb-2"
            >
              To
            </label>
            <select
              className="col-span-2 bg-white border appearance-none border-gray-300  px-4 py-2 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full rounded-md text-gray-600 focus:shadow-outline"
              defaultValue={2023}
            >
              {[...Array(27)]
                .map((_, index) => 2001 + index)
                .map((year) => (
                  <option value={year}>{year}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mr-2" onClick={handleFilter}>
            <BsFilterLeft size={20} />
            <span className="ml-1">Apply Filter</span>
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
