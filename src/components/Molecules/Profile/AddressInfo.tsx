import React from "react";

interface AddressInfoProps {
    name: string;
    value: string;
}

const AddressInfo: React.FC<AddressInfoProps> = ({ name, value }) => {
    return (
        <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg">{name}</dt>
            <dd className="text-lg font-semibold">{value}</dd>
        </div>
    );
};

export default AddressInfo;
