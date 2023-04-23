import React, { useCallback, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GoMute, GoUnmute } from "react-icons/go";

// import PlayButton from "@/components/PlayButton";
import useBillboard from "@/hooks/useBillboard";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard: React.FC = () => {
  const { openModal } = useInfoModal();
  const { data } = useBillboard();
  const [isMuted, setIsMuted] = useState(true);
  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted={isMuted}
        loop
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[12px] md:text-lg mt-3 md:mt-8 w-[60%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <AiOutlineInfoCircle size={25} className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
      <div
        className="cursor-pointer absolute  bottom-[15%] md:bottom-[30%] right-10 h-8 w-8 md:h-10 md:w-10 rounded-full  bg-white
        text-white
          bg-opacity-30  flex items-center justify-center transition hover:bg-opacity-20"
        onClick={toggleMute}
      >
        {isMuted ? (
          <GoMute className="text-white" size={20} />
        ) : (
          <GoUnmute className="text-white" size={20} />
        )}
      </div>
    </div>
  );
};
export default Billboard;
