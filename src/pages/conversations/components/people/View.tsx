import { twMerge } from "tailwind-merge";
import Person from "./components/person";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { chatSelector } from "@/redux/selectors";
import { connectRoom } from "@/redux/chat/chat.slice";
import { Dispatch, SetStateAction } from "react";

const View = ({
  className,
  target,
  setTarget,
}: {
  className?: string;
  target: string | null;
  setTarget: Dispatch<SetStateAction<string | null>>;
}) => {
  const { conversations } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();

  const changeTarget = (id: string) => {
    setTarget(id);
    dispatch(
      connectRoom({
        roomId: id,
      })
    );
  };

  return (
    <div className={twMerge("border-r", className)}>
      <div className="mt-3 ml-3">
        {conversations.map((item) => (
          <Person
            key={item._id}
            data={item}
            onClick={changeTarget}
            active={item._id === target}
          />
        ))}
      </div>
    </div>
  );
};

export default View;
