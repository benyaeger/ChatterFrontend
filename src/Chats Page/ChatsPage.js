import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  getChatsOfUser,
  getMessagesOfChat,
  getUserDetails,
  sendMessage,
} from "./BackendInteraction";
import GroupChatCreateModal from "./Chats UI Components/GroupChatCreationModal";
import AlertModal from "./Chats UI Components/AlertModal";

// Tailwind CSS classes are used directly for styling
function ChatsPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Dummy Data for Developement TODO change this after auth implementation
  const dummydata = {
    user_id: 1,
  };

  // Elite Data
  const [userChats, setUserChats] = useState([]);

  // Alert Modal State Management
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalType, setAlertModalType] = useState("success");
  const [alertModalValue, setAlertModalValue] = useState("");

  function setAlert(showAlertModal, alertModalType, alertModalValue) {
    setShowAlertModal(showAlertModal);
    if (showAlertModal) {
      setAlertModalType(alertModalType);
      setAlertModalValue(alertModalValue);
    }
  }

  // New Group Modal Management
  const [showGroupChatCreateModal, setShowGroupChatCreateModal] =
    useState(false);

  async function getChatsFromBackend() {
    try {
      // Search For User
      let data = await getChatsOfUser(dummydata.user_id);
      // Set the State accordingly
      setUserChats(data);
    } catch (error) {
      console.log("Error: " + error);
      setUserChats([]);
      setAlert(true, "error", "Failed to Fetch Chats");
    }
  }

  // Current Viewed Chat Data
  const [currentChat, setCurrentChat] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function openChat() {
    try {
      // Get Messages from backend
      let data = await getMessagesOfChat(currentChat.chat_id, 20);
      // Set the State accordingly
      setChatMessages(data);
    } catch (error) {
      console.log("Error: " + error);
      setChatMessages([]);
      setAlert(true, "error", "Failed to Fetch Messages Of Chat");
    }
  }

  //   useEffect(() => {
  //     openChat();
  //   }, [currentChat]);

  async function postMessage() {
    try {
      // Get Messages from backend
      let data = await sendMessage(dummydata.user_id, "1", newMessage);
      console.log(data);
      setAlert(true, "sucess", `Sent Message! Server Res: ${data?.message}`);
      // openChat();
    } catch (error) {
      console.log("Error: " + error);
      // setChatMessages([]);
      setAlert(true, "error", "Failed to Send Message");
    }
  }

  useEffect(() => {
    let data = getChatsFromBackend();
  }, []);

  return (
    <div
      className="flex h-screen"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-col w-screen">
        {/** Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
          {/** Chatter + Logo on the left upper side */}
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
              Chatter
            </h2>
          </div>
          {/** Sign out button + user profile picture */}
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex gap-2">
              <button
                className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => {
                  test();
                  //  navigate('/');
                }}
              >
                Sign Out
              </button>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://cdn.usegalileo.ai/stability/38883bd7-ccbf-4e61-860e-a153017ba4c4.png")',
              }}
            ></div>
          </div>
        </header>
        {/** Main Centered Screen */}
        <div className="flex flex-1 overflow-hidden">
          {showAlertModal && (
            <AlertModal
              type={alertModalType}
              message={alertModalValue} // Customize the alert
              onClose={() => setShowAlertModal(false)} // Close the modal after 3 seconds
            />
          )}
          {/** Left side - Chats */}
          <div className="flex-none w-2/5 h-full px-6 py-5 box-border">
            <div className="layout-content-container flex flex-col h-full">
              {/** Chat Search Bar Container */}
              {/* Show New Group Chat Modal */}
              {showGroupChatCreateModal && (
                <GroupChatCreateModal
                  onClose={() => {
                    setShowGroupChatCreateModal(false);
                  }}
                  setAlert={setAlert}
                />
              )}
              <div className="px-4 py-3">
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                    {/** "+" Button - New Group Chat Modal */}
                    <div className="flex items-center justify-center p-1">
                      <button
                        className="bg-green-500 text-white rounded-full hover:bg-green-800 active:bg-green-700 flex items-center justify-center w-8 h-8"
                        onClick={() => {
                          setShowGroupChatCreateModal(true);
                          console.log("Open GroupChat Modal Button");
                        }}
                      >
                        <span className="text-xl font-bold">+</span>
                      </button>
                    </div>

                    {/** Chat Search Icon */}
                    <div className="text-[#637588] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                    {/** Chat Search Bar */}
                    <input
                      placeholder="Search Chatter"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637588] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    />
                  </div>
                </label>
              </div>
              {/** Chats */}
              <div className="flex flex-col flex-1 overflow-y-auto">
                {userChats.map((chat) => (
                  <div
                    className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between hover:bg-gray-100 transition-colors duration-200"
                    onClick={openChat}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                        style={{
                          backgroundImage: `url("${
                            chat.image ||
                            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                          }")`,
                        }}
                      ></div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                          {chat.chat_name}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <p className="text-[#637588] text-sm font-normal leading-normal">
                        3h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/** Chat Viewer (Where Messages Render) */}
          <div className="flex-1 border-l border-gray-200 flex flex-col overflow-hidden">
            {/** Chat Name (Title) */}
            <div className="bg-white px-4 py-3 border-b border-gray-200">
              <h1 className="text-xl font-bold text-[#111418]">
                {currentChat.chat_name}
              </h1>
            </div>
            {/** Container of messages */}
            <div className="flex-1 overflow-y-auto bg-[#e0f2f1] px-4 py-2">
              <div className="flex flex-col gap-2">
                {/** Message 1 */}
                <div className="flex items-start gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/stability/c335041d-6cdf-4707-9376-70db350be930.png")',
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <p className="text-[#111418] text-base font-medium">
                      Siqi Chen
                    </p>
                    <p className="text-[#637588] text-sm">
                      I just shared a link about this conversation
                    </p>
                  </div>
                </div>
                {/** Message 2 */}
                <div className="flex items-start gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/stability/a5f1b022-e1ed-4638-9661-e7dbad4b10a1.png")',
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <p className="text-[#111418] text-base font-medium">
                      Lisa Phipps
                    </p>
                    <p className="text-[#637588] text-sm">
                      You had me at Hi. You said it all
                    </p>
                  </div>
                </div>
                {/* Add more message items as needed */}
              </div>
            </div>
            {/** Message Text Input Container */}
            <div className="bg-white px-4 py-2 border-t border-gray-200 flex items-center gap-2 box-border">
              {/** Text Input Element */}
              <input
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 py-2 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/** Send Button */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={postMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatsPage;
