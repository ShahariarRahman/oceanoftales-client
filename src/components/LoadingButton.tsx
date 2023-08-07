type IProps = {
  value?: string;
  className?: string;
};

export default function LoadingButton({ value, className }: IProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className={`inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-primary/70 hover:bg-primary/60 transition ease-in-out duration-150 cursor-not-allowed ${className} ml-[1px]`}
        disabled
      >
        <svg
          className={`animate-spin h-6 w-[47px] text-white ${
            value && "-ml-1 mr-3 w-5"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {value}
      </button>
    </div>
  );
}
