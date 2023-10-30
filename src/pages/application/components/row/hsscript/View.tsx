/* eslint-disable @typescript-eslint/no-explicit-any */
import SubjectService from "@/services/subject";
import { Subject } from "@/utils/responseTypes";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  onEdit,
  setTarget,
  load,
}: {
  data: any;
  onEdit?: () => void;
  setTarget: Dispatch<SetStateAction<Subject | null>>;
  load: () => void;
}) => {
  const deleted = async () => {
    try {
      await SubjectService.deleted({
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
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.candidate?.avatar}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.candidate?.fullName}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.candidate?.birthday}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.candidate?.cccd}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.candidate?.email}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.status}
      </td>
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
