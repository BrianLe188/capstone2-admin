import { twMerge } from "tailwind-merge";
import Person from "./components/person";
import { useState } from "react";

const people = [
  {
    id: "1",
    fullName: "adsfasfdsaf",
    email: "asdfadsfadf@gmail.com",
  },
];

const View = ({ className }: { className?: string }) => {
  const [target, setTarget] = useState<string | null>(null);

  const changeTarget = (id: string) => {
    setTarget(id);
  };

  return (
    <div className={twMerge("border-r", className)}>
      <div className="mt-3 ml-3">
        {[...people, ...people, ...people].map((item) => (
          <Person
            data={item}
            onClick={changeTarget}
            active={item.id === target}
          />
        ))}
      </div>
    </div>
  );
};

export default View;
