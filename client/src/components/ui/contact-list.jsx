import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "./avatar";
import { BACKEND_URL } from "@/helpers/const";
import { getColor } from "@/lib/utils";

export default function ContactList({ contacts, isChannel = false }) {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handelClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");

    setSelectedChatData(contact);
    if (setSelectedChatData && selectedChatData?._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData?._id === contact?._id
              ? "bg-[#8417ff] horver:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handelClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="w-10 h-10  rounded-full overflow-hidden">
                {contact?.image ? (
                  <AvatarImage
                    src={BACKEND_URL + "/" + contact?.image}
                    alt="Profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`${
                      selectedChatData && selectedChatData._id === contact._id
                        ? "bg-[#ffffff22] border border-white/50"
                        : getColor()
                    } uppercase w-10 h-10  flex items-center justify-center text-lg border rounded-full `}
                  >
                    {contact?.username.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{contact.username}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
