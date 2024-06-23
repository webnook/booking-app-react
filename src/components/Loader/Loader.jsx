import { Hourglass } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center p-8 w-full">
      <Hourglass width={25} height={25} />
    </div>
  );
};

export default Loader;
