import SubjectService from "@/services/subject";
import SubjectBlockService from "@/services/subjectBlock";
import { Subject, SubjectBlock } from "@/utils/responseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
}: {
  data?: SubjectBlock;
  load: () => void;
  setTarget: Dispatch<SetStateAction<SubjectBlock | null>>;
}) => {
  const [details, setDetails] = useState<Partial<SubjectBlock>>({});
  const [selectSubjects, setSelectSubjects] = useState<Array<string>>([]);
  const [subjects, setSubjects] = useState<Array<Subject>>([]);

  useEffect(() => {
    loadData();
    if (data) {
      setDetails(data);
      if (data?.subjects) {
        const ids = data?.subjects.map((item) => item.id);
        setSelectSubjects(ids);
      }
    }
  }, [data]);

  const selectSubject = (id: string) => {
    if (selectSubjects.includes(id)) {
      setSelectSubjects((state) => state.filter((item) => item !== id));
    } else {
      setSelectSubjects((state) => [...state, id]);
    }
  };

  const loadData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await SubjectService.getAll();
      setSubjects(res || []);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

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
        res = await SubjectBlockService.update({
          params: {
            id: data.id,
          },
          body: { ...rest, subjects: selectSubjects },
        });
      } else {
        res = await SubjectBlockService.create({
          body: {
            ...details,
            subjects: selectSubjects,
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
      <p className="text-center text-blue-500 font-semibold mb-5">
        Subject Block
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
      </div>
      <div className="flex gap-6 flex-wrap max-h-96 overflow-auto">
        {subjects.map((item, index) => (
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor={item.name} key={index}>
              {item.name}
            </label>
            <input
              id={item.name}
              type="checkbox"
              onChange={() => selectSubject(item.id)}
              className="border p-2 rounded-lg"
              checked={!!selectSubjects.find((i) => i === item.id)}
            />
          </div>
        ))}
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
