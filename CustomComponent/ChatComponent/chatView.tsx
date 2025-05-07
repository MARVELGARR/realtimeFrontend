import { createContext, ReactNode, useContext } from "react";


type  ChatViewProp ={
    conversationType: "DIRECT"| "GROUP",
    children: ReactNode
}
const chatViewContext = createContext<ChatViewProp | null>(null)

export function useChatView() {
    const context = useContext(chatViewContext);
    if (!context) {
      throw new Error("useUserSession must be used within a UserSessionProvider");
    }
    return context;
  }

const ChatView = ({conversationType, children}:ChatViewProp) => {
    
    
    return (
        <chatViewContext.Provider value={{conversationType}}>
            {children}
        </chatViewContext.Provider>
    );
}


ChatView.Header = function ChatHeader() {
    const {conversationType} = useChatView()
  
    return (
      <div className="chat-header">
        {conversationType === 'GROUP' ? (
          <div className="relative h-12 w-12">
          {participants.slice(0, 3).map((p, i) => (
            <Avatar
              key={p.id}
              className={cn(
                "h-8 w-8 border-2 border-white dark:border-gray-900 absolute",
                i === 0 && "top-0 left-0",
                i === 1 && "top-0 right-0",
                i === 2 && "bottom-0 left-1/4"
              )}
            >
              <AvatarImage src={p.avatar || "/placeholder.svg"} alt={p.name} />
              <AvatarFallback>{p.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        ) : (
          <div className="individual-header">
            <img src={participants[0].avatar} alt={participants[0].name} className="avatar" />
            <span>{participants[0].name}</span>
          </div>
        )}
      </div>
    );
  };


    