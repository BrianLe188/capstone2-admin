import MajorsService from "@/services/majors";
import SubjectBlockService from "@/services/subjectBlock";
import { ELEVEL } from "@/utils/enums";
import { Majors, SubjectBlock } from "@/utils/responseTypes";
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
    code: "",
    educationalLevel: ELEVEL.UNIVERSITY,
    description: "",
  });
  const [subjectBlocks, setSubjectBlocks] = useState<Array<SubjectBlock>>([]);
  const [
    selectSubjectBlocksBaseOnExamResult,
    setSelectSubjectBlocksBaseOnExamResult,
  ] = useState<Array<string>>([]);
  const [
    selectSubjectBlocksBaseOnTranscript,
    setSelectSubjectBlocksBaseOnTranscript,
  ] = useState<Array<string>>([]);

  useEffect(() => {
    loadData();
    if (data) {
      setDetails(data);
      if (data?.basedOnHighSchoolExamResults) {
        const ids = data?.basedOnHighSchoolExamResults.map((item) => item.id);
        setSelectSubjectBlocksBaseOnExamResult(ids);
      }
      if (data?.basedOnHighSchoolTranscripts) {
        const ids = data?.basedOnHighSchoolTranscripts.map((item) => item.id);
        setSelectSubjectBlocksBaseOnTranscript(ids);
      }
    }
  }, [data]);

  const loadData = async () => {
    try {
      const res = await SubjectBlockService.getAll();
      setSubjectBlocks(res || []);
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
        res = await MajorsService.update({
          params: {
            id: data.id,
          },
          body: {
            ...rest,
            basedOnHighSchoolExamResults: selectSubjectBlocksBaseOnExamResult,
            basedOnHighSchoolTranscripts: selectSubjectBlocksBaseOnTranscript,
          },
        });
      } else {
        res = await MajorsService.create({
          body: {
            name: details.name,
            code: details.code,
            educationalLevel: details.educationalLevel,
            basedOnHighSchoolExamResults: selectSubjectBlocksBaseOnExamResult,
            basedOnHighSchoolTranscripts: selectSubjectBlocksBaseOnTranscript,
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

  const selectSubjectBlock = (id: string, type: "exam" | "transcript") => {
    switch (type) {
      case "exam": {
        if (selectSubjectBlocksBaseOnExamResult.includes(id)) {
          setSelectSubjectBlocksBaseOnExamResult((state) =>
            state.filter((item) => item !== id)
          );
        } else {
          setSelectSubjectBlocksBaseOnExamResult((state) => [...state, id]);
        }
        break;
      }
      case "transcript": {
        if (selectSubjectBlocksBaseOnTranscript.includes(id)) {
          setSelectSubjectBlocksBaseOnTranscript((state) =>
            state.filter((item) => item !== id)
          );
        } else {
          setSelectSubjectBlocksBaseOnTranscript((state) => [...state, id]);
        }
        break;
      }
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
        <div>
          <div>
            <label htmlFor="">Base on exam result</label>
            <div className="flex flex-wrap h-48 overflow-auto">
              {subjectBlocks.map((item, index) => (
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor={item.name} key={index}>
                    {item.name}
                  </label>
                  <input
                    id={item.name}
                    type="checkbox"
                    onChange={() => selectSubjectBlock(item.id, "exam")}
                    className="border p-2 rounded-lg"
                    checked={
                      !!selectSubjectBlocksBaseOnExamResult.find(
                        (i) => i === item.id
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div>
            <label htmlFor="">Base on transcript</label>
            <div className="flex flex-wrap h-48 overflow-auto">
              {subjectBlocks.map((item, index) => (
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor={item.name} key={index}>
                    {item.name}
                  </label>
                  <input
                    id={item.name}
                    type="checkbox"
                    onChange={() => selectSubjectBlock(item.id, "transcript")}
                    className="border p-2 rounded-lg"
                    checked={
                      !!selectSubjectBlocksBaseOnTranscript.find(
                        (i) => i === item.id
                      )
                    }
                  />
                </div>
              ))}
            </div>
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
