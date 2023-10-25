import MemberSchoolService from "@/services/memberSchool";
import { MemberSchool } from "@/utils/responseTypes";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  onEdit,
  setTarget,
  load,
}: {
  data: MemberSchool;
  onEdit?: () => void;
  setTarget: Dispatch<SetStateAction<MemberSchool | null>>;
  load: () => void;
}) => {
  const deleted = async () => {
    try {
      await MemberSchoolService.deleted({
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
        {data.name}
      </th>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data.link}
      </td>
      <td className="px-6 py-4">{data.university && "Y"}</td>
      <td className="px-6 py-4">{data.afterUniversity && "Y"}</td>
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
