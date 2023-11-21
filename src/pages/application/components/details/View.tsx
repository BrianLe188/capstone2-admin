/* eslint-disable @typescript-eslint/no-explicit-any */
import AdmissionService from "@/services/admission";
import { Subject } from "@/utils/responseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
  tab,
}: {
  data?: Subject;
  load: () => void;
  setTarget: Dispatch<SetStateAction<any>>;
  tab: string;
}) => {
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data]);

  const changeHandler = (name: string, value: number | string) => {
    setDetails((state: any) => ({
      ...state,
      [name]: value,
    }));
  };

  const submit = async () => {
    try {
      let res;
      if (data?.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, status } = details;
        if (id) {
          switch (tab) {
            case "admission-registration": {
              res = await AdmissionService.updateApplicationRegistration({
                params: { id },
                body: {
                  status,
                },
              });
              break;
            }
            case "high-school-script": {
              res =
                await AdmissionService.updateApplicationForAdmissionWithAHighSchoolScript(
                  {
                    params: { id },
                    body: {
                      status,
                    },
                  }
                );
              break;
            }
            case "straight-priority": {
              res =
                await AdmissionService.updateApplicationForStraightAdmissionAndPriorityConsideration(
                  {
                    params: { id },
                    body: {
                      status,
                    },
                  }
                );
              break;
            }
            case "test-result": {
              res =
                await AdmissionService.updateApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult(
                  {
                    params: { id },
                    body: {
                      status,
                    },
                  }
                );
              break;
            }
          }
        }
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
      <p className="text-center text-blue-500 font-semibold mb-5">Subject</p>
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
