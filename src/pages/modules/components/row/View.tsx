import ModuleService from "@/services/modules";
import { Module } from "@/utils/responseTypes";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  onEdit,
  setTarget,
  load,
}: {
  data: Module;
  onEdit?: () => void;
  setTarget: Dispatch<SetStateAction<Module | null>>;
  load: () => void;
}) => {
  const deleted = async () => {
    try {
      await ModuleService.deleted({
        params: {
          id: data.id,
        },
      });
      load();
      toast.success("Success");
      setTarget(null);
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4">
        {data.icon}
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.key}
      </td>
      <td className="px-6 py-4">{data.name}</td>
      <td className="px-6 py-4">{data.path}</td>
      <td className="px-6 py-4">
        <button className="text-green-700 mr-2" onClick={onEdit}>
          Edit
        </button>
        <button className="text-red-700" onClick={deleted}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default View;
