import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const View = ({
  className,
  data,
}: {
  className?: string;
  data?: {
    key: string;
    name: string;
    position: string;
    values: { id: string; name: string; path: string }[];
  };
}) => {
  return (
    <div className={twMerge("h-screen border-right-1 border-200", className)}>
      <div>Logo</div>
      <div>
        {data &&
          data.values.map((item) => (
            <div key={item.id}>
              <Link to={item.path}>{item.name}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default View;
