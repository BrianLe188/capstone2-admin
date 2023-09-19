import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

const View = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = useRef<any>(null);

  const onChange = (name: string, value: string) => {
    setLogin((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (login.email && login.password) {
        console.log(login);
      } else {
        toast.current?.show({
          severity: "info",
          summary: "Missing",
          detail: "Missing value",
        });
      }
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Card
        className="w-30rem absolute top-50 left-50"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="mb-5">
          <label htmlFor="email">
            <p>Email</p>
            <InputText
              id="email"
              className="w-full"
              type="email"
              value={login.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <InputText
              id="password"
              className="w-full"
              type="password"
              value={login.password}
              onChange={(e) => onChange("password", e.target.value)}
            />
          </label>
        </div>
        <Button label="Login" className="w-10rem" onClick={onSubmit} />
      </Card>
    </>
  );
};

export default View;
