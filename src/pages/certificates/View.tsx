/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Row from "./components/row";
import { toast } from "react-toastify";
import { Certificate } from "@/utils/responseTypes";
import { createPortal } from "react-dom";
import Details from "./components/details";
import CertificateService from "@/services/certificates";

const View = () => {
  const [certificates, setRules] = useState<Array<Certificate>>([]);
  const [target, setTarget] = useState<Certificate | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await CertificateService.getAll();
      setRules(res || []);
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
          className="bg-green-200 w-20 py-2 rounded-md mr-3"
          onClick={() => setTarget({} as Certificate)}
        >
          New
        </button>
      </div>
      <div className="mt-5 h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
        <div className="relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((item) => (
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
