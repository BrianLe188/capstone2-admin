import { useEffect, useState } from "react";
import Row from "./components/row";
import { toast } from "react-toastify";
import MemberSchoolService from "@/services/memberSchool";
import { MemberSchool } from "@/utils/responseTypes";
import { createPortal } from "react-dom";
import Details from "./components/details";

const View = () => {
  const [memberSchool, setmMemberSchool] = useState<Array<MemberSchool>>([]);
  const [target, setTarget] = useState<MemberSchool | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await MemberSchoolService.getAll();
      setmMemberSchool(res || []);
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
      <div className="mt-3 mx-3">
        <button
          className="bg-green-200 w-20 py-2 rounded-md"
          onClick={() => setTarget({} as MemberSchool)}
        >
          New
        </button>
      </div>
      <div className="mt-5 h-96">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Link
                </th>
                <th scope="col" className="px-6 py-3">
                  University
                </th>
                <th scope="col" className="px-6 py-3">
                  After University
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {memberSchool.map((item) => (
                <Row
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
