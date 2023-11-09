import { addMessage } from "@/redux/chat/chat.slice";
import People from "./components/people";
import { useAppDispatch } from "@/redux/hooks";
import { EMessageType } from "@/utils/enums";
import { useState } from "react";

const View = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<string | null>(null);

  const handleSubmit = () => {
    if (target) {
      dispatch(
        addMessage({
          type: EMessageType.USER,
          content: message,
          file: target,
          target,
          room: target,
        })
      );
    }
    setMessage("");
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message) {
      handleSubmit();
    }
  };

  return (
    <div className="grid grid-cols-12 h-full">
      <People className="col-span-3" target={target} setTarget={setTarget} />
      <div className="col-span-9">
        <div></div>
        {target && (
          <div className="relative top-[93%]">
            <input
              type="text"
              className="border rounded-lg w-full p-2"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => handleEnterPress(e)}
              value={message}
            />
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#A62823] text-white px-2 py-1 rounded-md"
              onClick={() => handleSubmit()}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
