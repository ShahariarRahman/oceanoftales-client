import FormEditBook from "@/components/FormEditBook";

const InputPage = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="rounded-lg shadow p-8 mx-2 sm:m-0 w-full sm:w-4/5 lg:w-1/2 2xl:w-2/5">
        <h2 className="text-3xl font-bold mb-8">Update Book Information</h2>
        <FormEditBook />
      </div>
    </div>
  );
};

export default InputPage;
