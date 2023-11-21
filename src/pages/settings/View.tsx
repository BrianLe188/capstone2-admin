import SettingService from "@/services/settings";
import { toast } from "react-toastify";

const View = () => {
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      await SettingService.importQATempate({
        body: formdata,
      });
      toast.success("Done");
    }
  };

  return (
    <div>
      <button className="py-2 rounded-md">
        <label
          htmlFor="nameImport"
          className="cursor-pointer ml-6 p-3 bg-gray-200 rounded-md"
        >
          Import question and answer template from excel
        </label>
        <input
          hidden
          id="nameImport"
          type="file"
          accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(e) => handleFileUpload(e)}
        />
      </button>
    </div>
  );
};

export default View;
