import FormEditBook from "@/components/FormEditBook";

export default function EditBook() {
  return (
    <div className="absolute top-0 w-full">
      <div className="flex lg:grid grid-cols-2">
        <div className="w-full flex justify-center min-h-screen">
          <div className="flex flex-col items-center rounded-lg mx-5 sm:m-12 w-full bg-white">
            <h4 className="mt-10 2xl:mt-16 mb-1 text-xl font-bold text-gray-900">
              Update your added book
            </h4>
            <h6 className="mb-6 text-sm text-muted-foreground">
              Update book form to ensure accurate information.
            </h6>
            <FormEditBook />
          </div>
        </div>
        <div
          className="hidden w-full bg-cover bg-center lg:flex justify-center mt-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80)`,
          }}
        ></div>
      </div>
    </div>
  );
}
