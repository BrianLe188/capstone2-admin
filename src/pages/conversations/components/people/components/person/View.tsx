import { twMerge } from "tailwind-merge";

/* eslint-disable @typescript-eslint/no-explicit-any */
const View = ({
  data,
  active = false,
  onClick,
}: {
  data: { [key: string]: any };
  active?: boolean;
  onClick?: (id: string) => void;
}) => {
  return (
    <button
      className={twMerge(
        "border-2 border-gray-400 bg-white rounded-lg p-3 mt-2",
        active && "bg-gray-200"
      )}
      onClick={() => onClick && onClick(data.id)}
    >
      {data.fullName}
    </button>
  );
};

export default View;
