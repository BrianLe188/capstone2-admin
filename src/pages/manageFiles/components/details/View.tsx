import FilesService from "@/services/manageFiles";
import { EFILE } from "@/utils/enums";
import { File } from "@/utils/responseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = ({
  data,
  load,
  setTarget,
}: {
  data?: File;
  load: () => void;
  setTarget: Dispatch<SetStateAction<File | null>>;
}) => {
  const [details, setDetails] = useState<Partial<File>>({
    id: "",
    name: "",
    fileExtension: EFILE.DOCX
  });

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
    console.log(setDetails)
  };

  const changeFileExtension = (value: string) => {
    setDetails((state) => ({
      ...state,
      fileExtension: EFILE[value as keyof typeof EFILE],
    }));
    const addFileExtension = document.querySelector('.upload')
    addFileExtension?.setAttribute('accept', `.${EFILE[value as keyof typeof EFILE]}`)
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileUpload = (event : any) => {
    const file = event.target.files[0];
  }

  const submit = async () => {
    try {
      let res;
      if (data?.id) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = details;
        res = await FilesService.update({
          params: {
            id: data.id,
          },
          body: rest,
        });
      } else {
        res = await FilesService.create({
          body: {
            file: {
              name: details.name,
              fileExtension: details.fileExtension,
            },
          },
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
        <label
          htmlFor="fileExtension"
          className="flex items-center gap-3 mb-2"
        >
          File Extension
          <select
            id="fileExtension"
            onChange={(e) => changeFileExtension(e.target.value)}
            className="border p-2 rounded-lg w-full"
          >
            <option>Select File Extension</option>
            {Object.keys(EFILE).map((file) => (
              <option value={file}>
                {file}
              </option>
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
