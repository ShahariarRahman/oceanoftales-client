import FormAddBook from "@/components/FormAddBook";

export default function EditBook() {
  return (
    // <div
    //   className="fixed inset-0 md:fixed lg w-full bg-cover bg-center min-h-screen"
    //   style={{
    //     backgroundImage: `url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format')`,
    //   }}
    // >
    //   <div className="w-full flex justify-center mt-20">
    //     <div className="rounded-lg shadow-lg p-10 mx-2 sm:m-0 w-full sm:w-4/5 lg:w-1/2 2xl:w-2/5 bg-white">
    //       <FormAddBook />
    //     </div>
    //   </div>
    // </div>

    <div className="flex inset-0 md:fixed min-h-screen lg:grid grid-cols-2">
      <div className="w-full flex justify-center mt-14">
        <div className="flex flex-col items-center rounded-lg mx-5 sm:m-12 w-full bg-white">
          <h4 className="mb-2 text-xl font-bold text-gray-900">
            Update your book
          </h4>
          <h6 className="mb-10 text-sm text-muted-foreground">
            Submit the latest book form to ensure accurate information.
          </h6>
          <FormAddBook />
        </div>
      </div>
      <div
        className="hidden w-full bg-cover bg-center min-h-screen lg:flex justify-center mt-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80)`,
        }}
      ></div>
    </div>
  );
}
