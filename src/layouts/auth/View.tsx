import { Outlet } from "react-router-dom";

const View = () => {
  return (
    <div className="surface-200 h-screen">
      <Outlet />
    </div>
  );
};

export default View;
