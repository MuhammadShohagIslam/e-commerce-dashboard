import Label from "../../Atoms/Form/Label";
import Select from "../../Atoms/Form/Select";
import Paragraph from "../../Atoms/Paragraph";

/* eslint-disable @typescript-eslint/no-explicit-any */
type FormGroupType = {
    labelName: string;
    inputName: string;
    register: any;
    errorField?: any;
    required?: any;
    isDefaultValue?: boolean;
    defaultValue?: string;
    dataArray: any[];
};

const SelectInput = ({
    labelName,
    inputName,
    register,
    errorField,
    required,
    isDefaultValue,
    defaultValue,
    dataArray,
}: FormGroupType) => {
    return (
        <>
            <Label name={labelName} {...{ htmlFor: labelName }} />

            {isDefaultValue ? (
                <Select
                    {...{ ...register(inputName, required) }}
                    {...{ defaultValue: defaultValue }}
                    className="select select-success w-full max-w-xs text-primary text-base"
                >
                    {dataArray.map((data: any) => (
                        <option
                            className="text-sm"
                            key={data._id ? data._id : data}
                            value={data._id ? data._id : data}
                        >
                            {data.name ? data.name : data}
                        </option>
                    ))}
                </Select>
            ) : (
                <Select
                    {...{ ...register(inputName, required) }}
                    {...{ defaultValue: defaultValue }}
                    className="select select-success w-full max-w-xs text-primary text-base"
                >
                    <option value="">Select {labelName}</option>
                    {dataArray.map((data: any) => (
                        <option
                            className="text-sm"
                            key={data._id ? data._id : data}
                            value={data._id ? data._id : data}
                        >
                            {data.name ? data.name : data}
                        </option>
                    ))}
                </Select>
            )}
            {errorField && (
                <Paragraph
                    className="text-red-600 text-sm"
                    text={errorField?.message}
                />
            )}
        </>
    );
};

export default SelectInput;
