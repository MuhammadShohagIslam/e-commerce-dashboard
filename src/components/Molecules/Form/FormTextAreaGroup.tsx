import {
    UseFormRegister,
    FieldValues,
    FieldError,
    Path,
} from "react-hook-form";

import Label from "../../Atoms/Form/Label";
import TextArea from "../../Atoms/Form/TextArea";

type FormGroupType<T extends FieldValues> = {
    labelName: string;
    className?: string | undefined;
    inputName: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldError | undefined;
    placeholder: string;
    errorMessage?: string | boolean | undefined;
};

const FormTextAreaGroup = <T extends FieldValues>({
    labelName,
    inputName,
    register,
    errors,
    placeholder,
    className="",
    errorMessage,
}: FormGroupType<T>) => {
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: inputName }} />

            <TextArea
                errorMessage={errorMessage}
                inputName={inputName}
                register={register}
                placeholder={placeholder}
                className={className}
                errors={errors}
            />
        </div>
    );
};

export default FormTextAreaGroup;
