
import Header from '@/components/Header';
import { InputChat } from '@/components/InputChat';
import WindowChat from '@/components/WindowChat';

export default function Home() {
  return (
    <div className=" max-h-screen bg-background">
      <Header />
      <div className="flex flex-col items-center mt-16 px-8 sm:px-16 lg:px-64 h-[calc(100vh-4rem)]">  
        <WindowChat />
        <InputChat />
      </div>
    </div>
  );
}
