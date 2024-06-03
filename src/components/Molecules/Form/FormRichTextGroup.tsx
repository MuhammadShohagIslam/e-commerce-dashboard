import { Control, FieldValues, FieldError, Path } from "react-hook-form";

import Label from "../../Atoms/Form/Label";
// import Paragraph from "../../Atoms/Paragraph";
import CKEditorAtom from "../../Atoms/Form/CKEditor";

type FormRichTextGroupType<T extends FieldValues> = {
    labelName: string;
    className?: string | undefined;
    inputName: Path<T>;
    control: Control<T>;
    errors?: FieldError;
    placeholder: string | undefined;
    errorMessage?: string | undefined;
};

const FormRichTextGroup = <T extends FieldValues>({
    labelName,
    inputName,
    errors,
    control,
    placeholder,
    className,
    errorMessage,
}: FormRichTextGroupType<T>) => {
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: inputName }} />

            <CKEditorAtom
                name={inputName}
                control={control}
                placeholder={placeholder}
                errorMessage={errorMessage}
                className={className}
                errors={errors}
            />

            {/* {errors?.message && (
                <Paragraph
                    className="text-red-600 text-sm"
                    text={errors?.message}
                />
            )} */}
        </div>
    );
};

export default FormRichTextGroup;
