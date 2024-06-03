import cn from "../../../utils/cn";

// Define a type for the props passed to LocalSearch
interface LocalSearchProps extends React.HTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder: string;
}

const LocalSearch: React.FC<LocalSearchProps> = ({
    className,
    placeholder,
    ...rest
}) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>
            <input
                type="search"
                {...rest}
                className={cn(
                    "block w-full h-10 pl-10 pr-4 text-sm text-green-400 border border-green-400 rounded-lg bg-white focus:outline-offset-4 focus:outline-1 focus:outline-green-400 focus:ring-green-300",
                    className || ""
                )}
                placeholder={placeholder}
            />
        </div>
    );
};

export default LocalSearch;
