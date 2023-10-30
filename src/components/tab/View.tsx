import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

const View = ({
  data = [],
  setTarget,
  target,
}: {
  data?: Array<{ name: string; key: string }>;
  setTarget?: Dispatch<SetStateAction<string>>;
  target?: string;
}) => {
  return (
    <div className="flex justify-between gap-2">
      {data.map((item) => (
        <button
          key={item.key}
          onClick={() => setTarget && setTarget(item.key)}
          className={twMerge(
            "border border-gray-200 w-full border-b-2 border-b-blue-400 py-3 hover:bg-blue-400 hover:text-white",
            target === item.key && "bg-blue-400 text-white"
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default View;
