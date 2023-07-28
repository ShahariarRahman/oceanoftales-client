import notFound from "../assets/images/illustration/notFound.png";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-800">
      <img className="object-contain h-screen" src={notFound} alt="" />
    </div>
  );
}
