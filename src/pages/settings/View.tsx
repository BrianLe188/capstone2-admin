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

  const handleSyncRule = async () => {
    try {
      await SettingService.syncRule();
    } catch (error) {}
  };

  const handleStatisticSubmajor = async () => {
    try {
      await SettingService.statisticSubmajor();
    } catch (error) {}
  };

  const handleGenerateSourceFromReport = async () => {
    try {
      await SettingService.generateSourceFromReport();
    } catch (error) {}
  };

  return (
    <div>
      <div className="p-2 border-2">
        <label htmlFor="">AI source</label>
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
        <button
          className="py-2 rounded-md"
          onClick={handleGenerateSourceFromReport}
        >
          <label
            htmlFor="sync"
            className="cursor-pointer ml-6 p-3 bg-gray-200 rounded-md"
          >
            Generate source from report
          </label>
        </button>
      </div>
      <hr />
      <div className="p-2 border-2">
        <label htmlFor="">REPORT source</label>
        <button className="py-2 rounded-md" onClick={handleSyncRule}>
          <label
            htmlFor="sync"
            className="cursor-pointer ml-6 p-3 bg-gray-200 rounded-md"
          >
            Sync rule
          </label>
        </button>
        <button className="py-2 rounded-md" onClick={handleStatisticSubmajor}>
          <label
            htmlFor="sync"
            className="cursor-pointer ml-6 p-3 bg-gray-200 rounded-md"
          >
            Statistic sub major
          </label>
        </button>
      </div>
    </div>
  );
};

export default View;
