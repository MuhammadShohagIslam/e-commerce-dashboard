import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Define a type alias that includes the required properties
export type CustomFetchBaseQueryError = FetchBaseQueryError & {
    data: {
        message: string;
    };
};

export type TImage ={
    uid: string;
    name: string;
    status: "done" | "error" | "uploading" | "removed";
    url: string;
    isFromData: boolean;
};