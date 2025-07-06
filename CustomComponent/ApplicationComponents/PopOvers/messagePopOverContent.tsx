import { MessageOptions } from "@/CustomComponent/MessageComponents/messageOption";
import useChatSocket from "@/hooks/ChatHooks/useChatSocket";
import { useSelection } from "@/store/useMessageSelector";
import { Check, Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const MessagePopOverContent = ({ id, content }: MessageOptions) => {
  const { id: conversationId } = useParams();

  const { deleteMessage } = useChatSocket({
    conversationId: conversationId as string,
  });

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Text coppied!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  const { setSelections, selections } = useSelection();
  return (
    <div className="bg-cyan-900 p-1 flex flex-col justify-start ">
      <div
        onClick={() => deleteMessage(id, conversationId as string)}
        className="flex items-center cursor-pointer p-2 rounded hover:bg-cyan-500 gap-3 w-full"
      >
        <Trash className="text-red-400" />
        <span className="">Delete</span>
      </div>
      <div
        onClick={() => copyTextToClipboard(content || "")}
        className="flex items-center cursor-pointer p-2 rounded hover:bg-cyan-500 gap-3 w-full"
      >
        <Copy className="text-white" />
        <span className="">Copy</span>
      </div>
      <div
        onClick={() => setSelections(id)}
        className="flex items-center cursor-pointer p-2 rounded hover:bg-cyan-500yuy gap-3 w-full"
      >
        <Check
          className={`${
            selections?.includes(id) ? "text-blue-600" : "text-white"
          } `}
        />
        <span className="">Select</span>
      </div>
    </div>
  );
};

export default MessagePopOverContent;
