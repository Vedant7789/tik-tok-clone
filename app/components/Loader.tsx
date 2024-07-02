import { BiLoaderCircle } from "react-icons/bi";

const Loader: React.FC = (): React.ReactNode => {
    return (
        <div className="flex w-full h-full z-10 fixed top-0 left-0 bg-black/20 backdrop-blur-md justify-center items-center">
            <BiLoaderCircle
                className="animate-spin"
                color="#ffffff"
                size={22}
            />
        </div>
    );
};

export default Loader;