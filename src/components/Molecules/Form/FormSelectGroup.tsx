
import { Control, FieldValues, FieldError, Path } from "react-hook-form";

import Label from "../../Atoms/Form/Label";
import AntdSelect from "../../Atoms/Form/AntdSelect";

interface OptionType<T> {
    label: string;
    value: T;
}

type FormSelectGroupType<T extends FieldValues> = {
    labelName: string;
    className?: string | undefined;
    selectName: Path<T> | string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<T | any>;
    errors?: FieldError | undefined;
    mode?: "multiple" | "tags" | undefined;
    placeholder: string;
    options: OptionType<string>[] | undefined;
    errorMessage?: string | undefined;
    defaultValue?: OptionType<string>[] | T | null | undefined 
};

const FormSelectGroup = <T extends FieldValues>({
    labelName,
    selectName,
    errors,
    placeholder,
    control,
    className,
    defaultValue,
    errorMessage,
    options,
    mode,
}: FormSelectGroupType<T>) => {
    return (
        <div className="mb-3">
            <Label name={labelName} {...{ htmlFor: selectName }} />

            <AntdSelect
                errorMessage={errorMessage}
                selectName={selectName}
                control={control}
                placeholder={placeholder}
                className={className}
                defaultValue={defaultValue}
                errors={errors}
                options={options}
                mode={mode}
            />
        </div>
    );
};

export default FormSelectGroup;
