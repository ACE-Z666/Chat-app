import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CreateGroups() {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const lightTheme = useSelector((state) => state.theme.light);
  const user = useSelector((state) => state.auth.user);

  const createGroup = async () => {
    if (!groupName || !users.length) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/chat/group",
        {
          chatName: groupName,
          users: users.map((user) => user._id),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Group created successfully:", response.data);
      alert("Group created successfully!");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Error creating group. Please try again.");
    }
  };

  const handleUserSelect = (selectedUser) => {
    if (users.includes(selectedUser)) {
      setUsers(users.filter((user) => user !== selectedUser));
    } else {
      setUsers([...users, selectedUser]);
    }
  };

  return (
    <div className="flex flex-col h-full w-[63vw] rounded-tr-2xl rounded-br-2xl items-center justify-center">
      <div
        className={
          "w-2/3 h-2/3 bg-[#e0dfd5] rounded-xl shade-g" +
          (lightTheme ? "" : " dark-theme")
        }
      >
        <div className="flex flex-col items-center justify-center gap-y-16 my-36">
          <div>
            <p
              className={
                "text-2xl font-semibold" +
                (lightTheme ? " text-gray-800" : " text-white")
              }
            >
              Create Groups
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-[20vw] bg-[#e8e9eb] rounded-full px-4 border-none outline-none h-10 text-black"
            />
          </div>
          <div>
            {users.map((user) => (
              <div key={user._id} onClick={() => handleUserSelect(user)}>
                {user.name}
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={createGroup}
              className="w-[10vw] h-10 bg-[#d18109] rounded-xl text-[#faf9f9] font-semibold hover:text-[#000000] hover:bg-[#ffffff] transition-all"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
