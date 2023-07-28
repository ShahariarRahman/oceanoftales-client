import { SyntheticEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { bookGenres } from "@/constant/bookInfo";

export default function FormEditBook() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({ title, author, genre, publicationDate, imageUrl });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <div className="mb-6">
            <Label className="font-bold" htmlFor="edit-book-title">
              Title
            </Label>
            <Input
              className="mt-2"
              id="edit-book-title"
              type="text"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="edit-book-genre"
            >
              Genre
            </label>
            <select
              onChange={(e) => setGenre(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="edit-book-genre"
              placeholder="Enter genre"
              required
            >
              {bookGenres.map((genre) => (
                <option value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="mb-6">
            <Label className="font-bold" htmlFor="edit-book-author">
              Author
            </Label>
            <Input
              className="mt-2"
              id="edit-book-author"
              type="text"
              value={author}
              placeholder="Enter Author Name"
              onChange={(e) => setAuthor(e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="publicationDate"
            >
              Publication Date
            </label>
            <input
              className="w-full bg-gray-200 border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="publicationDate"
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Label className="font-bold" htmlFor="edit-book-image">
          Upload a Image
        </Label>
        <Input
          className="mt-2"
          id="edit-book-image"
          type="file"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            setAuthor("");
            setGenre("");
            setPublicationDate("");
            setImageUrl("");
            setTitle("");
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
