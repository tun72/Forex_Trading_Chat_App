import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "@/helpers/axios";
import { CHANNEL_ROUTE } from "@/helpers/const";
import { useAppStore } from "@/store";
import { useState } from "react";
import toast from "react-hot-toast";

import { MdDeleteForever } from "react-icons/md";

export function DeleteChannel({ channelId }) {
  const [deleting, setDeleting] = useState(false);
  const { deleteChannel, closeChat } = useAppStore();

  async function handleDelete() {
    console.log(channelId);

    try {
      setDeleting(true);
      const response = await axios.delete(CHANNEL_ROUTE + "/" + channelId);
      if (response.status === 204) {
        toast.success("Successfully Deleted");
        deleteChannel(channelId);
        closeChat();
      }
    } catch (error) {
      toast.error("Failed to delete channel:", error.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Wrap the icon in a span or button to allow ref forwarding */}
        <span className="cursor-pointer">
          <MdDeleteForever className="text-3xl text-red-400" />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#181920] border-none text-white flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            channel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-400 focus:bg-red-400"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
