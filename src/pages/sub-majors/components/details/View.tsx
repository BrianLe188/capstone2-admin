import MajorsService from "@/services/majors";
import SubMajorsService from "@/services/sub-majors";
import { Majors, SubMajor } from "@/utils/responseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
}: {
  data?: SubMajor;
  load: () => void;
  setTarget: Dispatch<SetStateAction<SubMajor | null>>;
}) => {
  const [details, setDetails] = useState<Partial<SubMajor>>({
    id: "",
    name: "",
    code: "",
    description: "",
    majorId: "",
  });
  const [majors, setMajors] = useState<Array<Majors>>([]);

  useEffect(() => {
    loadMajors();
    if (data) {
      setDetails({
        ...data,
        majorId: data.major?.id || "",
      });
    }
  }, [data]);

  const changeHandler = (name: string, value: number | string) => {
    setDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const loadMajors = async () => {
    const res = await MajorsService.getAll();
    if (res) {
      setMajors(res);
    }
  };

  const submit = async () => {
    try {
      let res;
      if (data?.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = details;
        res = await SubMajorsService.update({
          params: {
            id: data.id,
          },
          body: {
            ...rest,
          },
        });
      } else {
        res = await SubMajorsService.create({
          body: details,
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

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl w-1/2 p-5">
      <p className="text-center text-blue-500 font-semibold mb-5">Major</p>
      <div>
        <label htmlFor="name" className="flex items-center gap-3 mb-2">
          Name
          <input
            id="name"
            type="text"
            value={details?.name}
            onChange={(e) => changeHandler("name", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label htmlFor="code" className="flex items-center gap-3 mb-2">
          Code
          <input
            id="code"
            type="text"
            value={details?.code}
            onChange={(e) => changeHandler("code", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label htmlFor="description" className="flex items-center gap-3 mb-2">
          Description
          <textarea
            id="description"
            value={details?.description}
            onChange={(e) => changeHandler("description", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <div>
          <label htmlFor="majorid">Major</label>
          <div className="h-96 overflow-auto flex flex-wrap gap-3">
            {majors.map((item) => (
              <label htmlFor={item.id}>
                <input
                  type="radio"
                  name="major"
                  id={item.id}
                  className="mr-1"
                  checked={details.majorId === item.id}
                  onChange={() => changeHandler("majorId", item.id)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>
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
