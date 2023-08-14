/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { bookGenres } from "@/constant/book";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { IBookForm } from "@/types/formTypes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { storage } from "@/lib/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { bookFormValidation } from "@/validation/bookForm.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiMessageError } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { SwalToast } from "./Toast";
import { useNavigate } from "react-router-dom";
import { usePostSingleBookMutation } from "@/redux/features/books/bookApi";
import { IApiResponse } from "@/types/responseTypes";
import { IBook } from "@/types/globalTypes";
import { inputFieldHelper } from "@/helpers/inputFieldHelper";
import { errorHandler } from "@/errors/errorHandler";

export default function FormAddBook() {
  const [loading, setLoading] = useState<boolean>(false);
  const { email } = useAppSelector((state) => state?.auth.user);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<IBookForm>({
    resolver: zodResolver(bookFormValidation.addBookZodSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: undefined,
      publicationDate: new Date(),
      imageUrl: "",
    },
  });

  const [postBook, { isLoading }] = usePostSingleBookMutation();

  const navigate = useNavigate();

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } =
    useDropzone({
      onDrop: (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          setValue("imageUrl", file);
          trigger("imageUrl");
        }
      },
      noClick: true,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
        "image/bmp": [".bmp"],
      },
      multiple: false,
    });

  const onSubmit: SubmitHandler<IBookForm> = async (data) => {
    // taking permission
    const submitProceed = await SwalToast.confirm.fire(
      "Book Publication",
      "Are you sure to publish your book?",
    );

    if (!submitProceed.isConfirmed) {
      return SwalToast.warn.fire("Cancelled", "Book publication cancelled!");
    }

    setLoading(true);

    // validating data
    if (
      Object.keys(data).length < 5 ||
      !data.imageUrl ||
      typeof data.imageUrl === "string"
    ) {
      return SwalToast.warn.fire("Invalid Form", "Provide valid data in form");
    }

    // structuring data
    const formattedData = inputFieldHelper.formatData(email!, data);

    // deploying image
    const { imageUrl } = data;
    const storageRef = ref(storage, `image/${imageUrl.name + "." + v4()}`);
    const snapshot = await uploadBytes(storageRef, imageUrl);
    const downloadURL = await getDownloadURL(snapshot.ref);
    const image = downloadURL.split("&token")[0];
    formattedData.imageUrl = image;

    // database and api
    const result: any = await postBook(formattedData);

    // show success message & visit
    if (result.data?.data?._id) {
      setLoading(false);
      reset();

      const bookResponseData: IApiResponse<IBook> = result.data;
      const bookId = bookResponseData.data?._id;

      const visitProceed = await SwalToast.succeedAndAsk.fire(
        "Congratulations",
        "Book publication successfully! click visit to see..",
      );

      if (visitProceed.isConfirmed) {
        navigate(`/book/${bookId}`);
      }
    } else {
      await deleteObject(storageRef);

      setLoading(false);

      await errorHandler.showApiErrorMessage(result.error);
    }
  };

  // * * Error Debugging
  // useEffect(() => {
  //   if (fileRejections[0]) {
  //     console.log(fileRejections[0]);
  //   }
  //   if (Object.keys(errors).length) {
  //     console.log(errors);
  //   }
  // }, [errors, fileRejections]);

  let errorMessage: string | undefined = "";
  if (Object.keys(errors).length > 0) {
    errorMessage =
      errors.title?.message ||
      errors.author?.message ||
      errors.genre?.message ||
      (errors.publicationDate?.message as string) ||
      errors.imageUrl?.message;
  }

  if (fileRejections.length) {
    errorMessage = fileRejections[0]?.errors[0]?.message;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 max-w-md w-full `}
    >
      <div>
        <Label className="sr-only font-bold" htmlFor="add-book-title">
          Title
        </Label>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              {...field}
              className="mt-2"
              type="text"
              placeholder="Enter book title"
              autoCapitalize="none"
              autoCorrect="off"
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
          render={({ field }) => (
            <Input
              {...field}
              className="mt-2"
              type="text"
              placeholder="Enter author name"
              autoCapitalize="none"
              autoCorrect="off"
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
            render={({ field }) => (
              <Select
                {...field}
                options={bookGenres.map((genre) => ({
                  value: genre,
                  label: genre,
                }))}
                value={field?.value || ""}
                onChange={(e) => field.onChange(e)}
                isClearable={true}
                classNamePrefix="react-select"
                className="w-full rounded-md text-sm"
                placeholder="Select genre"
                isSearchable={true}
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
            name="publicationDate"
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onSelect={(date: Date) => setValue("publicationDate", date)}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mr-10"
                dateFormat="dd/MM/yyyy"
              />
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
          name="imageUrl"
          render={({ field }) => (
            <div
              {...getRootProps()}
              className={`mt-2 border-dashed border-[1px] text-sm p-2 rounded-md ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {field.value ? (
                <div className="relative flex justify-center">
                  <img
                    src={URL.createObjectURL(field.value as File)}
                    alt="Uploaded"
                    className="max-h-72"
                  />
                  <Button
                    size="sm"
                    onClick={() => setValue("imageUrl", null)}
                    type="button"
                    variant="secondary"
                    className="mt-1 mr-1 p-2 h-6 text-red-500 rounded absolute top-0 right-0"
                  >
                    <RxCross2 />
                  </Button>
                </div>
              ) : (
                <div className="text-gray-700">
                  {isDragActive ? (
                    <div>
                      <p className="h-32 sm:h-32 ">Drop the image here</p>
                    </div>
                  ) : (
                    <div className="h-32 sm:h-32 flex flex-col justify-center items-center">
                      <p className="text-muted-foreground">
                        Drag an image here, or click to upload a image
                      </p>
                      <Button
                        onClick={open}
                        type="button"
                        variant="outline"
                        className="mt-5 mr-2"
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
        {errorMessage?.length ? (
          <p className="mt-3 ml-1 text-sm flex items-center space-x-2 text-red-500 capitalize">
            <span>{errorMessage}</span>
            <BiMessageError />
          </p>
        ) : (
          <p className="mt-12"></p>
        )}
      </div>
      <div className="w-full flex sm:justify-end">
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
          {loading || isLoading ? (
            <>
              <Button disabled variant="outline" type="button">
                Reset
              </Button>
              <LoadingButton value="" />
            </>
          ) : (
            <>
              <Button variant="outline" type="button" onClick={() => reset()}>
                Reset
              </Button>
              <Button disabled={!!errorMessage?.length} type="submit">
                Publish
              </Button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
