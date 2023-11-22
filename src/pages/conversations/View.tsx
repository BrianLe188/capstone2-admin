import { addMessage, typing } from "@/redux/chat/chat.slice";
import People from "./components/people";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EMessageType } from "@/utils/enums";
import { useContext, useEffect, useState } from "react";
import { chatSelector } from "@/redux/selectors";
import { fetchMessageByTarget } from "@/redux/chat/chat.async";
import Message from "@/components/message";
import { v4 } from "uuid";
import { GlobalContext } from "@/contexts/globalContext";
import ScrollToBottom from "react-scroll-to-bottom";

const View = () => {
  const dispatch = useAppDispatch();
  const { auth } = useContext(GlobalContext);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<string | null>(null);
  const { messages } = useAppSelector(chatSelector);

  const handleTyping = () => {
    if (target) {
      dispatch(
        typing({
          target,
          room: target,
        })
      );
    }
  };

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

  useEffect(() => {
    if (target) {
      dispatch(fetchMessageByTarget(target));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div className="grid grid-cols-12 h-full gap-2">
      <People
        className="col-span-3 h-[calc(100vh-100px)] overflow-auto"
        target={target}
        setTarget={setTarget}
      />
      <div className="col-span-9">
        <ScrollToBottom>
          <div className="overflow-auto h-[calc(100vh-150px)]">
            {messages.map((item) => (
              <Message
                key={v4()}
                message={item}
                isMe={auth?.id === item.sender}
              />
            ))}
          </div>
          {target && (
            <div className="relative p-3">
              <input
                type="text"
                className="border rounded-lg w-full p-2"
                onChange={(e) => {
                  handleTyping();
                  setMessage(e.target.value);
                }}
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
        </ScrollToBottom>
      </div>
    </div>
  );
};

export default View;
