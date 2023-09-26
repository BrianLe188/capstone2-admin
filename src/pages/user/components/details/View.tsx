import UserService from "@/services/user";
import { EROLE } from "@/utils/enums";
import { User } from "@/utils/responseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
}: {
  data?: User;
  load: () => void;
  setTarget: Dispatch<SetStateAction<User | null>>;
}) => {
  const [details, setDetails] = useState<Partial<User>>({
    email: "",
    fullName: "",
    role: {
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data]);

  const changeHandler = (name: string, value: number | string) => {
    setDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const changeRole = (value: string) => {
    setDetails((state) => ({
      ...state,
      role: {
        name: value,
      },
    }));
  };

  const submit = async () => {
    try {
      let res;
      if (data?.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = details;
        res = await UserService.update({
          params: {
            id: data.id,
          },
          body: rest,
        });
      } else {
        res = await UserService.create({
          body: {
            user: {
              email: details.email,
              password: details.password,
              fullName: details.fullName,
            },
            role: {
              name: details.role?.name as EROLE,
            },
          },
        });
      }
      if (res) {
        toast.success("Success");
        setTarget(null);
        load();
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  console.log(details);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl w-1/2 p-5">
      <p className="text-center text-blue-500 font-semibold mb-5">User</p>
      <div>
        <label htmlFor="email" className="flex items-center gap-3 mb-2">
          Email
          <input
            id="email"
            type="email"
            value={details?.email}
            onChange={(e) => changeHandler("email", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label htmlFor="fullName" className="flex items-center gap-3 mb-2">
          Full Name
          <input
            id="fullName"
            type="text"
            value={details?.fullName}
            onChange={(e) => changeHandler("fullName", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label htmlFor="role" className="flex items-center gap-3 mb-2">
          Role
          <select
            id="role"
            value={details.role?.name}
            onChange={(e) => changeRole(e.target.value)}
            className="border p-2 rounded-lg w-full"
          >
            <option>Select Role</option>
            {Object.keys(EROLE).map((role) => (
              <option value={EROLE[role as keyof typeof EROLE]}>{role}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-5">
        <button
          className="border px-3 py-1 rounded-lg bg-green-200 mr-2"
          onClick={submit}
        >
          Submit
        </button>
        <button
          className="border px-3 py-1 rounded-lg bg-gray-200"
          onClick={() => setTarget(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default View;
