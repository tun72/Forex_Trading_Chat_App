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

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";

import axios from "@/helpers/axios";
import { CREATE_CHANNEL, GET_ALL_CONTACT } from "@/helpers/const";

import { useAppStore } from "@/store";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselector";
import { RadioOption } from "@/components/ui/RadioOption";

export default function CreateChannel() {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);

  const { addChannel } = useAppStore();
  const [selectedContacts, setselectedContacts] = useState([]);

  const [allContacts, setAllContacts] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(GET_ALL_CONTACT);

        if (response.status === 200) setAllContacts(response.data.contacts);
      } catch (err) {
        toast.error(err.message);
      }
    }
    getData();
  }, []);

  const handleOptionChange = (value) => {
    setIsPrivate(value);
  };

  async function createChannel() {
    try {
      if (channelName) {
        const response = await axios.post(CREATE_CHANNEL, {
          name: channelName,
          members: selectedContacts.map((contact) => contact.value),
          isPrivate,
        });

        if (response.status === 201 && response.data) {
          const channel = response.data;
          setChannelName("");
          setselectedContacts([]);
          setOpenNewContactModal(false);
          addChannel(channel.data);
          toast.success("Success");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
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
        <DialogContent className="bg-[#181920] border-none text-white w-[430px] h-[430px]  flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-center mt-4">
              Please fill up the details for new Channel
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg  bg-[#2c2e3b] border-none"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>

          <div>
            <MultipleSelector
              className="rounded-lg 
            bg-[#2c2e3b] border-none py-2 text-white"
              defaultOptions={allContacts}
              placeholder="Search Contacts"
              value={selectedContacts}
              onChange={setselectedContacts}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">
                  No result found
                </p>
              }
            />
          </div>

          <div className=" shadow rounded-md max-w-md text-white flex items-center gap-4">
            <RadioOption
              label="Private"
              value={true}
              selectedValue={isPrivate}
              onChange={handleOptionChange}
            />
            <RadioOption
              label="Public"
              value={false}
              selectedValue={isPrivate}
              onChange={handleOptionChange}
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
