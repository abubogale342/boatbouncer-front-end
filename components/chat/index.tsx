import React from "react";
import { Socket, io } from "socket.io-client";
import { useSession } from "next-auth/react";
import useFetcher from "@/lib/hooks/use-axios";
import { useEffect, useState, useRef } from "react";
import useAutosizeTextArea from "@/lib/hooks/useAutosizeTextArea";

const Chat = ({
  bookmarks,
  user,
  bookingTab,
}: {
  bookmarks: any;
  user: any;
  bookingTab: string;
}) => {
  const [messages, setMessages] = useState<any>([]);
  const [error, setError] = useState("");
  const { fetchWithAuthSync } = useFetcher();
  const { data: session } = useSession();
  const [value, setValue] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  const { _id, token, userName } = user;
  const conversation = bookmarks.conversationId;

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_BASE_API_URL}`, {
      extraHeaders: {
        Authorization: "Bearer " + token,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setSocket(newSocket);
      newSocket.emit("add-user", _id);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
      setSocket(null);
    });

    newSocket.on("getMessage", (data) => {
      setMessages((message: any) => [
        ...message,
        { ...data, _id: JSON.stringify(new Date()) },
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  const sendMessageHn = (event: React.FormEvent<HTMLFormElement>) => {
    const ownerId = bookmarks.owner._id;
    const renterId = bookmarks.renter._id;

    /* 
    senderId, reciverId, msg
    */
    const senderId = _id;
    const reciverId = [ownerId, renterId].filter((id: string) => id !== _id)[0];
    const msg = value;

    fetchWithAuthSync("/message", {
      conversation,
      sender: senderId,
      text: msg,
    })
      .then(() => {
        if (socket) {
          socket.emit("sendMessage", {
            senderId,
            reciverId,
            msg,
          });
          setMessages([
            ...messages,
            { senderId, reciverId, msg, _id: JSON.stringify(new Date()) },
          ]);
          setValue("");
        } else {
          setMessages([
            ...messages,
            { senderId, reciverId, msg, _id: JSON.stringify(new Date()) },
          ]);
        }
        event.preventDefault();
      })
      .catch((error) => {
        event.preventDefault();
      });

    event.preventDefault();
  };

  useEffect(() => {
    if (!bookmarks || !bookmarks.conversationId) return;
    if (!session?.token) return;

    fetchWithAuthSync(`/message/${bookmarks.conversationId}`)
      .then((response) => setMessages(response.data))
      .catch(() => setError("unable to fetch messages"));
  }, [bookmarks.conversationId, session?.token]);

  if (error) {
    return (
      <p className="mx-auto mb-6 justify-center text-center text-xl text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="chat relative mx-1 h-full w-full overflow-y-auto">
      {messages.map((message: any) => (
        <div key={message._id} className="mb-4 flex w-full flex-col">
          {_id === message?.sender || _id === message?.senderId ? (
            <div className="ml-auto flex w-[97.5%] flex-col sm:w-11/12 md:w-10/12">
              <p className="self-start text-sm font-medium leading-5 text-[#344054]">
                You
              </p>
              <p className="w-full self-end rounded-[8px_0px_8px_8px] bg-[#219EBC] px-[14px] py-[10px] text-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
                {message?.text ?? message?.msg}
              </p>
            </div>
          ) : (
            <div className="mr-auto flex w-[97.5%] flex-row gap-3 sm:w-11/12 md:w-10/12">
              <div className="relative m-1 mr-2 flex h-fit w-fit items-center justify-center rounded-full bg-[#F9F5FF] p-2 text-center text-base font-medium uppercase leading-6 text-[#219EBC]">
                {bookingTab === "renter"
                  ? `${bookmarks.renter.firstName.substring(
                      0,
                      1,
                    )}${bookmarks.renter.lastName.substring(0, 1)}`
                  : `${bookmarks.owner.firstName.substring(
                      0,
                      1,
                    )}${bookmarks.owner.lastName.substring(0, 1)}`}
              </div>

              <div className="flex w-full flex-col">
                <p className="text-sm font-medium leading-5 text-gray-700">
                  {bookingTab === "renter"
                    ? `${bookmarks.renter.firstName} ${bookmarks.renter.lastName}`
                    : `${bookmarks.owner.firstName} ${bookmarks.owner.lastName}`}
                </p>
                <p className="rounded-[0px_8px_8px_8px] bg-[#F2F4F7] px-[14px] py-[10px] shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
                  {message.text ?? message.msg}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}

      <form className="my-6" onSubmit={sendMessageHn}>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="relative mx-1.5 flex items-end rounded-lg bg-gray-50 sm:mx-0">
          <textarea
            required
            rows={1}
            id="chat"
            value={value}
            ref={textAreaRef}
            onChange={handleChange}
            placeholder="Write Your Message"
            className="block h-fit min-h-[3.5rem] w-full overflow-hidden rounded-2xl border-none border-gray-300 bg-slate-50 pr-14 text-sm text-gray-900 placeholder:absolute placeholder:top-3 placeholder:text-xs placeholder:font-light focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="absolute bottom-2.5 right-2.5 rounded-lg bg-[#023047] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#023017] focus:outline-none focus:ring-4"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
