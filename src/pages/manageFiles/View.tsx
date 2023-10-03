import { useEffect, useState } from "react";
import Row from "./components/row";
import { toast } from "react-toastify";
import { File } from "@/utils/responseTypes";
import { createPortal } from "react-dom";
import Details from "./components/details";
import FilesService from "@/services/manageFiles";

const View = () => {
  const [file, setfile] = useState<Array<File>>([]);
  const [target, setTarget] = useState<File | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await FilesService.getAll();
      setfile(res || []);
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
          onClick={() => setTarget({} as File)}
        >
          New
        </button>
      </div>
      <div className="mt-5 h-[calc(100vh-200px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  File Extension
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {file.map((item) => (
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
