import React from "react";
import AddressInfo from "../../Molecules/Profile/AddressInfo";
import { IShippingAddress } from "../../../types/user.type";

interface AddressInfosProps {
    address: IShippingAddress;
}

const AddressInfos: React.FC<AddressInfosProps> = ({ address }) => {
    return (
        <div className="max-w-md text-gray-900 divide-y divide-gray-200 ">
            <AddressInfo name={"First Name"} value={address?.firstName} />
            <AddressInfo name={"Last Name"} value={address?.lastName} />
            <AddressInfo name={"Address 1:"} value={address?.address1} />
            <AddressInfo name={"Address 2:"} value={address?.address2} />
            <AddressInfo name={"City"} value={address?.city} />
            <AddressInfo name={"Country"} value={address?.country} />
            <AddressInfo name={"Post Code"} value={address?.postCode} />
            <AddressInfo name={"State"} value={address?.state} />
        </div>
    );
};

export default AddressInfos;
