/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Hsscript from "./components/row/hsscript";
import { toast } from "react-toastify";
import { Subject } from "@/utils/responseTypes";
import { createPortal } from "react-dom";
import Details from "./components/details";
import Tab from "@/components/tab";
import AdmissionService from "@/services/admission";

const tabs = [
  {
    name: "Admission registration",
    key: "admission-registration",
  },
  {
    name: "Test result",
    key: "test-result",
  },
  {
    name: "High school script",
    key: "high-school-script",
  },
  {
    name: "Straight and priority",
    key: "straight-priority",
  },
];

const View = () => {
  const [applications, setApplications] = useState<Array<Subject>>([]);
  const [target, setTarget] = useState<Subject | null>(null);
  const [tab, setTab] = useState(tabs[0].key);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const loadData = async () => {
    try {
      let res: any = [];
      switch (tab) {
        case "admission-registration": {
          res = await AdmissionService.getAllAdmissionRegistration();
          break;
        }
        case "high-school-script": {
          res =
            await AdmissionService.getApplicationForAdmissionWithAHighSchoolScript();
          break;
        }
        case "straight-priority": {
          res =
            await AdmissionService.getApplicationForStraightAdmissionAndPriorityConsideration();
          break;
        }
        case "test-result": {
          res =
            await AdmissionService.getApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult();
          break;
        }
      }
      setApplications(res);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      {target &&
        createPortal(
          <Details data={target} load={loadData} setTarget={setTarget} />,
          document.body
        )}
      <div className="m-3">
        <button
          className="bg-green-200 w-20 py-2 rounded-md mr-3"
          onClick={() => setTarget({} as Subject)}
        >
          New
        </button>
      </div>
      <Tab data={tabs} setTarget={setTab} target={tab} />
      <div className="mt-5 h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
        <div className="relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Avatar
                </th>
                <th scope="col" className="px-6 py-3">
                  Fullname
                </th>
                <th scope="col" className="px-6 py-3">
                  Birthday
                </th>
                <th scope="col" className="px-6 py-3">
                  CCCD
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((item) => (
                <Hsscript
                  data={item}
                  onEdit={() => setTarget(item)}
                  setTarget={setTarget}
                  load={loadData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default View;
