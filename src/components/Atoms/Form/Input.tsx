import cn from "../../../utils/cn";
import {
    UseFormRegister,
    Path,
    FieldValues,
    RegisterOptions,
    FieldError
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
    placeholder: string;
    type: string;
    register: UseFormRegister<T>;
    inputName: Path<T>;
    errorMessage: string | boolean | undefined;
    errors?: FieldError | undefined;
    className: string | undefined;
    isRequirePattern?: boolean | undefined;
    requirePattern: RegisterOptions | undefined;
}

const Input = <T extends FieldValues>({
    placeholder,
    type,
    register,
    className,
    isRequirePattern = false,
    inputName,
    errorMessage,
    requirePattern,
    errors,
    ...restProps
}: InputProps<T>) => {
    return (
        <input
            {...register(
                inputName,
                !isRequirePattern
                    ? {
                          required: errorMessage,
                      }
                    : requirePattern
            )}
            type={type}
            className={cn(
                ` text-gray-800 text-sm rounded-lg  ring-0 block w-full pl-6 p-3  placeholder:text-[13px] placeholder-gray-600  border  focus:outline-offset-0 focus:outline-0 focus:outline-green-400 focus:ring-green-300 shadow-sm ${
                    errors?.message
                        ? "bg-red-50 focus:border-red-200 text-red-700 placeholder-red-700"
                        : "bg-white focus:border-success"
                }`,
                className ? className : ""
            )}
            placeholder={placeholder}
            {...restProps}
        />
    );
};

export default Input;
