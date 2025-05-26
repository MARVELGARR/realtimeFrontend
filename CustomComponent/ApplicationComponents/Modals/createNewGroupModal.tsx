import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/store/useModalStore";
import AddFriendToGroup from "../createNewGroupComponent/addFriendsToGroup";
import { Button } from "@/components/ui/button";
import { useAddGroupMembersSelection } from "@/store/addGroupMembersSelection";
import useUrlState from "@/hooks/UtilityHooks/useUrlState";
import { useEffect, useState } from "react";
import AddGroupDetails from "../createNewGroupComponent/groupDetails";

const CreateNewGroupModal = () => {


    const {isOpen, onClose, fileFor, type} = useModal()
    const [urlState, setUrlState] = useUrlState()



    const isModalOpen = isOpen && (type === "create-new-group"  ) || fileFor === "group-profile-pic"

    const {selections, clearSelections} = useAddGroupMembersSelection()
    const conditions = !selections || selections.length === 0;
    const [newGroupstage, setNewGroupstage] = useState(1)


    useEffect(()=>{
      if(newGroupstage){
        
        setUrlState({ createGroup: newGroupstage.toString() })
      }
      else{
        setUrlState({ createGroup: undefined })

      }
    },[isModalOpen,newGroupstage])
    
    const handleClose = () =>{
       setUrlState({ createGroup: undefined })
       clearSelections()
      onClose(null)
    }

    const render = (state?: number) =>{
      switch (state) {
        case 1:
          return <AddFriendToGroup/>
        case 2:
          return <AddGroupDetails/>
      
        default:
          break;
      }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" w-[25rem] h-[30rem] p-0 rounded ">
       
       <div className="mt-[2.5rem] px-2">

        {render(newGroupstage)}
        
       </div>
       <div className=" px-2 flex items-center w-full justify-between">
          <Button disabled={newGroupstage < 2} onClick={() => setNewGroupstage(prev => prev - 1)} className=" rounded bg-cyan-900 hover:bg-cyan-500 cursor-pointer">Previous</Button>
          {newGroupstage < 2 && (<Button onClick={() => setNewGroupstage(prev => prev + 1)} className="rounded bg-cyan-900 hover:bg-cyan-500 cursor-pointer" disabled={conditions}>Next</Button>)}
       </div>
      </DialogContent>
    </Dialog>
    );
}
 
export default CreateNewGroupModal;