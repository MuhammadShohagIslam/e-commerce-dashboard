import Division from "../../../Atoms/Division";

const FormSkeleton = () => {
    return (
        <form className="lg:mt-5 md:mt-0 mt-0 pt-4 pb-7 px-6">
            <div className="grid grid-cols-2">
                <Division className="border border-green-100 bg-green-50 rounded-md p-4 animate-pulse w-24 h-24" />
            </div>
            <div className="grid md:gap-x-5 lg:mb-5 lg:grid-cols-2 grid-cols-1 md:grid-cols-1 mb-2 md:mb-0 gap-x-3 gap-y-2">
                <Division className="mt-4">
                    <Division className="rounded-md h-5 w-24 animate-pulse bg-green-50" />
                    <Division className="border border-green-100 rounded-md p-4 animate-pulse mt-2 bg-green-50" />
                </Division>

                <Division className="mt-4">
                    <Division className="rounded-md h-5 w-24 animate-pulse bg-green-50" />
                    <Division className="border border-green-100 rounded-md p-4 animate-pulse mt-2 bg-green-50" />
                </Division>
                <Division className="mt-4">
                    <Division className="rounded-md h-5 w-24 animate-pulse bg-green-50" />
                    <Division className="border border-green-100 rounded-md p-4 animate-pulse mt-2 bg-green-50" />
                </Division>
                <Division className="mt-4">
                    <Division className="rounded-md h-5 w-24 animate-pulse bg-green-50" />
                    <Division className="border border-green-100 rounded-md p-4 animate-pulse mt-2 bg-green-50" />
                </Division>
                <Division className="mt-4">
                    <Division className="rounded-md h-5 w-24 animate-pulse bg-green-50" />
                    <Division className="border border-green-100 rounded-md p-4 animate-pulse mt-2 bg-green-50" />
                </Division>
            </div>

            <div className="mt-5">
            <Division className="rounded-md h-8 w-24 animate-pulse bg-green-50" />

            </div>
        </form>
    );
};

export default FormSkeleton;
