"use client";
import { Suspense } from "react";
import { ChatList } from "./_ChatComponents/chat-list";
import { ChatView } from "./_ChatComponents/chat-view";


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {


  return (
    <main className="w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25}>
          <ChatList />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <Suspense fallback={<div>Loading...</div>}>
          
            <ChatView/>
          </Suspense>
        </ResizablePanel>
      </ResizablePanelGroup>

    </main>
  );
}
