import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="mt-4 flex justify-between items-stretch h-[calc(100vh-130px)]">
      <div className="w-1/3 pr-4 overflow-y-scroll">
        <Outlet />
      </div>
      <div className="flex-1 bg-text100 relative">map</div>
    </div>
  );
};

export default AppLayout;
