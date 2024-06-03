import { UseFormRegister, FieldValues, Path, FieldError } from "react-hook-form";
import cn from "../../../utils/cn";

interface TextAreaProps<T extends FieldValues> {
    placeholder?: string;
    className?: string | undefined;
    register: UseFormRegister<T>;
    errors?: FieldError | undefined;
    inputName: Path<T>;
    errorMessage: string | boolean | undefined;
}

const TextArea = <T extends FieldValues>({
    placeholder,
    className,
    register,
    inputName,
    errorMessage,
    errors,
    ...restProps
}: TextAreaProps<T>) => {
    return (
        <textarea
            {...register(inputName, {
                required: errorMessage,
            })}
            className={cn(
                ` text-gray-800 text-sm rounded-lg  ring-0 block w-full pl-6 p-3  placeholder:text-[12px]  border placeholder-gray-600  focus:outline-offset-0 focus:outline-0 focus:outline-green-400 focus:ring-green-300 shadow-sm ${
                    errors?.message
                        ? "bg-red-50 focus:border-red-200 text-red-700 placeholder-red-700"
                        : "bg-white focus:border-success"
                }`,
                className ? className : ""
            )}
            placeholder={placeholder}
            {...restProps}
        ></textarea>
    );
};

export default TextArea;
