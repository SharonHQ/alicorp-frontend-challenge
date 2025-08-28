'use client'
import Header from '@/components/Header';
import { InputChat } from '@/components/InputChat';
import WindowChat from '@/components/WindowChat';
import { MSWInitializer } from '@/components/MSWInitializer';
import { useChat } from '@/hooks/use-chat';

export default function Home() {
  const chatState = useChat()
  
  return (
    <div className=" max-h-screen bg-background">
      <MSWInitializer />
      <Header />
      <div className="flex flex-col items-center mt-16 px-8 sm:px-16 lg:px-64 h-[calc(100vh-4rem)]">  
        <WindowChat chatState={chatState} />
        <InputChat chatState={chatState} />
      </div>
    </div>
  );
}
