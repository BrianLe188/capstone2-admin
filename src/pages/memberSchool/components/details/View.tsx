import MajorsService from "@/services/majors";
import MemberSchoolService from "@/services/memberSchool";
import type { Majors, MemberSchool } from "@/utils/responseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
}: {
  data?: MemberSchool;
  load: () => void;
  setTarget: Dispatch<SetStateAction<MemberSchool | null>>;
}) => {
  const [details, setDetails] = useState<Partial<MemberSchool>>({});
  const [majors, setMajors] = useState<Array<Majors>>([]);
  const [selectedMajors, setSelectedMajors] = useState<Array<string>>([]);

  useEffect(() => {
    loadMajors();
    if (data) {
      setDetails(data);
      if (Array.isArray(data?.majors) && data.majors?.length > 0) {
        setSelectedMajors(data.majors.map((item) => item.id));
      }
    }
  }, [data]);

  const loadMajors = async () => {
    const res = await MajorsService.getAll();
    if (res) {
      setMajors(res);
    }
  };

  const changeHandler = (name: string, value: number | string | boolean) => {
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
        res = await MemberSchoolService.update({
          params: {
            id: data.id,
          },
          body: { ...rest, majors: selectedMajors },
        });
      } else {
        res = await MemberSchoolService.create({
          body: {
            ...details,
            majors: selectedMajors,
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

  const selectMajor = (value: string) => {
    if (selectedMajors.includes(value)) {
      setSelectedMajors((state) => state.filter((item) => item !== value));
    } else {
      setSelectedMajors((state) => [...state, value]);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl w-1/2 p-5">
      <p className="text-center text-blue-500 font-semibold mb-5">
        Member School
      </p>
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
        <label htmlFor="link" className="flex items-center gap-3 mb-2">
          Link
          <input
            id="link"
            type="text"
            value={details?.link}
            onChange={(e) => changeHandler("link", e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label htmlFor="university" className="flex items-center gap-3 mb-2">
          University
          <input
            id="university"
            type="checkbox"
            checked={details?.university}
            onChange={(e) => changeHandler("university", e.target.checked)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <label
          htmlFor="afterUniversity"
          className="flex items-center gap-3 mb-2"
        >
          After University
          <input
            id="afterUniversity"
            type="checkbox"
            checked={details?.afterUniversity}
            onChange={(e) => changeHandler("afterUniversity", e.target.checked)}
            className="border p-2 rounded-lg w-full"
          />
        </label>
        <div className="flex flex-wrap gap-3 max-h-96 overflow-auto">
          {majors.map((item) => (
            <div key={item.id}>
              <input
                id={item.id}
                type="checkbox"
                className="mr-1"
                checked={!!selectedMajors.find((i) => i === item.id)}
                onChange={() => selectMajor(item.id)}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </div>
          ))}
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
