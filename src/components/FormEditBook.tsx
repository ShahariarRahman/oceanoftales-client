import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { bookGenres } from "@/constant/book";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { IBook } from "@/types/globalTypes";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export default function FormEditBook() {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Partial<IBook>>();

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } =
    useDropzone({
      onDrop: async (acceptedFiles: File[]) => {
        console.log(acceptedFiles);
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          setValue("imageUrl", file);
        }
      },
      noClick: true,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      },
      multiple: false,
    });

  const onSubmit: SubmitHandler<Partial<IBook>> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log(errors?.imageUrl);
    }
  }, [errors]);

  const handleReset = () => {
    reset({
      title: "",
      author: "",
      genre: "",
      publicationDate: new Date(),
      imageUrl: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-md w-full"
    >
      <div>
        <Label className="sr-only font-bold" htmlFor="add-book-title">
          Title
        </Label>
        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              className="mt-2"
              type="text"
              placeholder="Enter book title"
              autoCapitalize="none"
              autoCorrect="off"
              required
            />
          )}
        />
      </div>
      <div>
        <Label className="sr-only font-bold" htmlFor="add-book-author">
          Author
        </Label>
        <Controller
          control={control}
          name="author"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              className="mt-2"
              type="text"
              placeholder="Enter author name"
              autoCapitalize="none"
              autoCorrect="off"
              required
            />
          )}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label
            className="sr-only block text-gray-700 text-sm font-bold mb-2"
            htmlFor="add-book-genre"
          >
            Genre
          </Label>
          <Controller
            control={control}
            name="genre"
            defaultValue=""
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  options={
                    bookGenres.map((genre) => ({
                      value: genre,
                      label: genre,
                    })) as never
                  }
                  classNamePrefix="react-select"
                  className="w-full rounded-md  text-sm"
                  placeholder="Select genre"
                  noOptionsMessage={() => "No genres available"}
                  isSearchable={false}
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
                      color: state.isSelected ? "white" : "black",
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
              </>
            )}
          />
        </div>
        <div>
          <Label
            className="sr-only block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publicationDate"
          >
            Publication Date
          </Label>
          <Controller
            control={control}
            defaultValue={new Date()}
            name="publicationDate"
            render={({ field }) => (
              <div className="w-full">
                <DatePicker
                  {...field}
                  selected={field.value}
                  onSelect={(date: Date) => setValue("publicationDate", date)}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mr-10"
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>
            )}
          />
        </div>
      </div>
      <div>
        <Label className="sr-only font-bold" htmlFor="add-book-image">
          Upload an Image
        </Label>
        <Controller
          control={control}
          rules={{ required: true }}
          name="imageUrl"
          defaultValue={null}
          render={({ field }) => (
            <div
              {...getRootProps()}
              className={`mt-2 border-dashed border-2 text-sm p-4 rounded-md ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {field.value ? (
                <img
                  src={URL.createObjectURL(field.value as File)}
                  alt="Uploaded"
                  className="w-full h-full"
                />
              ) : (
                <div className="text-gray-600">
                  {isDragActive ? (
                    <div>
                      <p className="h-32 sm:h-20 px-2">Drop the image here</p>
                    </div>
                  ) : (
                    <div className="h-32 sm:h-20 px-2 flex flex-col justify-center">
                      <p>Drag an image here, or click to upload a file</p>
                      <Button
                        onClick={open}
                        type="button"
                        variant="outline"
                        className="mt-5 w-32"
                      >
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        />
        {fileRejections.length > 0 && (
          <p className="mt-3 text-xs text-red-500">
            {fileRejections[0]?.errors[0]?.message}
          </p>
        )}
      </div>
      <div className="w-full flex sm:justify-end">
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
          <Button variant="outline" type="button" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Publish</Button>
        </div>
      </div>
    </form>
  );
}
