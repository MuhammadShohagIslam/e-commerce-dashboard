import {
    UseFormRegister,
    FieldValues,
    FieldError,
    RegisterOptions,
    Path,
} from "react-hook-form";
import Label from "../../Atoms/Form/Label";
import Input from "../../Atoms/Form/Input";

type RegisterInputGroupType<T extends FieldValues> = {
    labelName: string;
    inputName: Path<T>;
    register: UseFormRegister<T>;
    inputType: string;
    placeholder: string;
    errors?: FieldError | undefined;
    errorMessage?: string;
    isRequirePattern?: boolean;
    requirePattern?: RegisterOptions;
    className?: string | undefined;
};

const RegisterInputGroup = <T extends FieldValues>({
    labelName,
    inputName,
    register,
    errors,
    inputType,
    placeholder,
    className,
    errorMessage,
    isRequirePattern = false,
    requirePattern,
    ...rest
}: RegisterInputGroupType<T>) => {
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: inputName }} />
            <Input
                errorMessage={errorMessage}
                inputName={inputName}
                register={register}
                isRequirePattern={isRequirePattern}
                type={inputType}
                errors={errors}
                requirePattern={requirePattern}
                placeholder={placeholder}
                className={className}
                {...rest}
            />
        </div>
    );
};

export default RegisterInputGroup;
