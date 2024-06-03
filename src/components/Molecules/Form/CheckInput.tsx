import React from "react";

type CheckInputType = {
    checkInputLabel: JSX.Element | string;
    accepted: boolean;
    toggleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckInput = ({
    checkInputLabel,
    toggleCheck,
    accepted,
}: CheckInputType) => {
    return (
        <div className="form-control">
            <label className="cursor-pointer justify-start space-x-3 label">
                <input
                    type="checkbox"
                    onChange={toggleCheck}
                    checked={accepted}
                    className="checkbox checkbox-success"
                />
                <span className="label-text text-primary">{checkInputLabel}</span>
            </label>
        </div>
    );
};

export default CheckInput;
