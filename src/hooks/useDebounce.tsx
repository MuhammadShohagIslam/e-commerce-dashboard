import { useEffect, useState } from "react";

interface UseDebounceProps {
    searchQuery: string;
    delay: number;
}

const useDebounce = ({ searchQuery, delay }: UseDebounceProps) => {
    const [debouncedValue, setDebouncedValue] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, delay]);

    return debouncedValue;
};

export default useDebounce;
