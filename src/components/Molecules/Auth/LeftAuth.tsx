import Logo from "../../../assets/images/logo-big.png";

const LeftAuth: React.FC = () => {
    return (
        <div className="lg:-mt-20 mt-7">
            <div className="flex items-center lg:px-0 px-5">
                <picture>
                    <img
                        src={Logo}
                        alt="logo"
                        className="lg:w-80 w-full rounded-xl"
                    />
                </picture>
            </div>
            <div className="mt-3 text-center">
                <p className="text-2xl font-bold text-black/70 italic">
                    E-Commerce
                </p>
            </div>
        </div>
    );
};

export default LeftAuth;
