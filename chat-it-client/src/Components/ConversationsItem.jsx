import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ConversationsItem({
  name,
  unreadCount,
  onClick,
  lastMessage,
  timeStamp,
  ...rest
}) {
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.theme.light);

  if (!name) return null; // Optional safety

  return (
    <div
      onClick={onClick}
      className={
        "flex flex-col items-baseline justify-start h-[7vh] py-2 pb-2 px-2 pr-1 mt-1 transition-all w-full  hover:text-[#0e0e0e] rounded-2xl " +
        (lightTheme ? " hover:bg-[#f1ce0e]" : " hover:bg-[rgb(240,240,240)]")
      }
      {...rest}
    >
      <div
        className={
          "flex justify-between" +
          (lightTheme ? " text-[#504343]" : " wt-txt")
        }
      >
        <div className={"con-icon"}>{name[0]}</div>
        <div className="flex flex-col pl-2">
          <div className="flex items-center">
            <p className="text-lg font-bold">{name}</p>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center w-[19vw] h-full">
            <p className="text-sm">{lastMessage ?? ""}</p>
            <p className="text-sm pr-5">{timeStamp ?? ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationsItem;
