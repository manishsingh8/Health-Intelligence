import Logo from "@/assets/icons/rp-logo-icon.svg";

type LoaderProps = {
  message?: string;
  containerClassName?: string;
  spinnerClassName?: string;
};

const DEFAULT_CONTAINER =
  "flex items-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20";
const DEFAULT_SPINNER = "w-5 h-6 animate-spin";

export default function Loader({
  message = "Loading...",
  containerClassName = DEFAULT_CONTAINER,
  spinnerClassName = DEFAULT_SPINNER,
}: LoaderProps) {
  return (
    <div className={containerClassName}>
      <span className="flex items-center gap-2 text-gray-500 h-10">
        {message}
        <img src={Logo} className={spinnerClassName} alt="logo" />
      </span>
    </div>
  );
}
