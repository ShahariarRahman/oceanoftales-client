import bookNotFound from "@/assets/images/illustration/bookNotFound.png";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function BookNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center m-10">
      <div className="flex flex-col items-center max-w-lg">
        <img
          className="w-64 caret-transparent"
          src={bookNotFound}
          alt="bookNotFound"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Book Not Found
        </h2>
        <p className="text-muted-foreground text-sm text-center">
          We are sorry, but the book you are looking for is currently
          unavailable in our library. Please feel free to explore our other
          extensive collections of books or check back later for updates.
        </p>
        <Button
          onClick={() => navigate("/books")}
          variant="outline"
          size="sm"
          className="mt-5 w-20 rounded"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
