import FilesService from "@/services/manageFiles";
import { EFILE } from "@/utils/enums";
import type { File as FileType } from "@/utils/responseTypes";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
}: {
  data?: FileType;
  load: () => void;
  setTarget: Dispatch<SetStateAction<FileType | null>>;
}) => {
  const [details, setDetails] = useState<Partial<FileType>>({
    id: "",
    name: "",
    extension: EFILE.DOCX,
    path: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data]);

  const changeHandler = (name: string, value: number | string) => {
    setDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const changeFileExtension = (value: string) => {
    setDetails((state) => ({
      ...state,
      extension: EFILE[value as keyof typeof EFILE],
    }));
    const addFileExtension = document.querySelector(".upload");
    addFileExtension?.setAttribute(
      "accept",
      `.${EFILE[value as keyof typeof EFILE]}`
    );
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target && target.files && target.files[0]) {
      setFile(target.files[0]);
    }
  };

  const submit = async () => {
    try {
      let res;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const formdata = new FormData();
      if (details.name && details.extension && file) {
        formdata.append("name", details.name);
        formdata.append("extension", details.extension);
        formdata.append("file", file);
      }
      if (data?.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        res = await FilesService.update({
          params: {
            id: data.id,
          },
          body: formdata,
        });
      } else {
        res = await FilesService.create({
          body: formdata,
        });
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
      <p className="text-center text-blue-500 font-semibold mb-5">File</p>
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
        <label htmlFor="fileExtension" className="flex items-center gap-3 mb-2">
          File Extension
          <select
            id="fileExtension"
            onChange={(e) => changeFileExtension(e.target.value)}
            className="border p-2 rounded-lg w-full"
          >
            <option>Select File Extension</option>
            {Object.keys(EFILE).map((file) => (
              <option value={file}>{file}</option>
            ))}
          </select>
        </label>
        <label htmlFor="file" className="flex items-center gap-3 mb-2">
          Choose a file
          <input
            id="file"
            type="file"
            onChange={(e) => handleFileUpload(e)}
            className="border p-2 rounded-lg w-full upload"
            disabled={!details.extension}
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
