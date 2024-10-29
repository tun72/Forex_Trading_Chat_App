import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";
import axios from "@/helpers/axios";
import { BACKEND_URL, SEARCH_CONTACT_ROUTE } from "@/helpers/const";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";

export default function NewDirectMessage() {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchContacts, setSearchContacts] = useState([]);
  const { setSelectedChatData, setSelectedChatType, closeTrading } =
    useAppStore();

  async function handelSearchContact(search) {
    if (search) {
      try {
        const response = await axios.post(SEARCH_CONTACT_ROUTE, { search });

        if (response.status === 200 && response.data.contacts) {
          

          setSearchContacts((prev) => [...response.data.contacts]);
         
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchContacts((prev) => []);
    }
  }

  function selectNewContact(contact) {
    setOpenNewContactModal(false);
    setSelectedChatData(contact);
    setSelectedChatType("contact");
    closeTrading(true);
    setSearchContacts((prev) => []);
  }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className=" text-neutral-400 font-light text-opacity-90 text-start hover:text-neural-100 cursor-pointer 
            transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            select new contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px]  flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-center mt-2">
              Please select a contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contact"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => handelSearchContact(e.target.value)}
            />
          </div>

          {!!searchContacts.length && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative">
                      <Avatar className="w-12 h-12  rounded-full overflow-hidden">
                        {contact?.image ? (
                          <AvatarImage
                            src={BACKEND_URL + "/" + contact.image}
                            alt="Profile"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase w-12 h-12  flex items-center justify-center text-lg border rounded-full ${getColor()}`}
                          >
                            {contact.username.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>

                    <div className="flex flex-col">
                      <span>{contact.username}</span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchContacts.length <= 0 && (
            <div className=" flex-1  md:flex flex-col justify-center items-center  duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div
                className=" text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl 
              text-xl transition-all duration-300 text-center"
              >
                <h3 className=" popins-medium">
                  Search New <span className="text-purple-500">Contact.</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
