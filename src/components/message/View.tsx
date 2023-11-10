import { banner } from "@/assets";
import { EMessageType } from "@/utils/enums";
import { Message } from "@/utils/responseTypes";
import { twMerge } from "tailwind-merge";

const View = ({ message, isMe }: { message: Message; isMe: boolean }) => {
  return (
    <div
      className={twMerge(
        "bg-gray-200 w-fit max-w-[40rem] min-h-[5rem] h-fit rounded-2xl p-4 mb-4",
        (!isMe || message.type === EMessageType.AI) && "bg-[#A62823]",
        isMe && message.type === EMessageType.USER && "ml-auto"
      )}
    >
      <div className="flex gap-4">
        {(!isMe || message.type === EMessageType.AI) && (
          <div>
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img src={banner} alt="avatar" className="w-full h-full" />
            </div>
          </div>
        )}
        <span
          className={twMerge(
            "mt-3 text-[#A62823]",
            (!isMe || message.type === EMessageType.AI) && "text-gray-200"
          )}
        >
          {message.content}
        </span>
        {isMe && message.type === EMessageType.USER && (
          <div>
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img src={banner} alt="avatar" className="w-full h-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
