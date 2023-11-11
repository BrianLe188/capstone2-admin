import { GlobalContext } from "@/contexts/globalContext";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const View = () => {
  const { token, auth } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && auth.role.name === "admin") {
      navigate("/");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, auth]);

  return (
    <div className="surface-200 h-screen">
      <Outlet />
    </div>
  );
};

export default View;
