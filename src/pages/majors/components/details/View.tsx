import MajorsService from "@/services/majors";
import { ELEVEL } from "@/utils/enums";
import { Majors } from "@/utils/responseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
}: {
  data?: Majors;
  load: () => void;
  setTarget: Dispatch<SetStateAction<Majors | null>>;
}) => {
  const [details, setDetails] = useState<Partial<Majors>>({
    id: "",
    name: "",
    industryCode: "",
    specializedCode: "",
    educationalLevel: ELEVEL.UNIVERSITY,
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

  const submit = async () => {
    try {
      let res;
      if (data?.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = details;
        res = await MajorsService.update({
          params: {
            id: data.id,
          },
          body: rest,
        });
      } else {
        res = await MajorsService.create({
          body: {
            name: details.name,
            industryCode: details.industryCode,
            specializedCode: details.specializedCode,
            educationalLevel: details.educationalLevel,
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
        <label htmlFor="industryCode" className="flex items-center gap-3 mb-2">
          Industry Code
          <input
            id="industryCode"
            type="text"
            value={details?.industryCode}
            onChange={(e) => changeHandler("industryCode", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label
          htmlFor="specializedCode"
          className="flex items-center gap-3 mb-2"
        >
          Specialized Code
          <input
            id="specializedCode"
            type="text"
            value={details?.specializedCode}
            onChange={(e) => changeHandler("specializedCode", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label
          htmlFor="educationLevel"
          className="flex items-center gap-3 mb-2"
        >
          Education Level
          <select
            id="educationLevel"
            value={details.educationalLevel}
            onChange={(e) => changeHandler("educationalLevel", e.target.value)}
            className="border p-2 rounded-lg w-full"
          >
            <option>Select Education Level</option>
            {Object.keys(ELEVEL).map((level) => (
              <option value={ELEVEL[level as keyof typeof ELEVEL]}>
                {level}
              </option>
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
