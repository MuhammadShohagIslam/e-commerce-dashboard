import React from "react";

import cn from "../../../../utils/cn";
import LocalSearch from "../../../Molecules/LocalSearch/LocalSearch";
import Pagination from "../../../Molecules/Pagination/Pagination";
import AntdSelect from "../../../Atoms/Form/Select";


interface TableFilterProps  {
    setLimit: (limit: number) => void;
    setSearchTerm: (value: string) => void;
    setPage: (page: number) => void;
    page: number;
    pages: number;
    className?: string | undefined;
}

const TableFilter: React.FC<TableFilterProps> = ({
    setLimit,
    setSearchTerm,
    setPage,
    page,
    pages,
    className,
}) => {
    return (
        <div className={cn("lg:flex block justify-between", className || "")}>
            <div className="flex space-x-3">
                <AntdSelect
                    defaultValues="5"
                    width={130}
                    size="small"
                    onChange={(value: string) => setLimit(Number(value))}
                    options={[
                        { value: "5", label: "Show 5" },
                        { value: "10", label: "Show 10" },
                        { value: "15", label: "Show 15" },
                        { value: "20", label: "Show 20" },
                        { value: "25", label: "Show 25" },
                    ]}
                /> 

                <div>
                    <LocalSearch
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchTerm(e.target.value)
                        }
                        placeholder="Search Anything"
                        className="text-gray-800"
                    />
                </div>
            </div>
            <div>
                {pages ? (
                    <Pagination pages={pages} page={page} setPage={setPage} />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default TableFilter;
