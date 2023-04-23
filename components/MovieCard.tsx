import React, { useCallback } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  );

  const hoverAnimation = {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  };

  const normalAnimation = {
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className="group bg-zinc-900 col-span relative h-[12vw] transition duration-300 hover:bg-gray-800"
      initial={{ zIndex: 1 }}
      whileHover={{ zIndex: 2 }}
    >
      <motion.img
        src={data.thumbnailUrl}
        alt="Movie"
        draggable={false}
        className="
          cursor-pointer
          object-cover
          shadow-xl
          rounded-md
          w-full
          h-[12vw]
        "
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="
          opacity-0
          absolute
          top-0
          z-10
          invisible
          sm:visible
          w-full
        "
        initial={{ opacity: 0, scale: 1, translateY: 0 }}
        whileHover={{ opacity: 1, scale: 1.25, translateY: "-6vw" }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="
            cursor-pointer
            object-cover
            shadow-xl
            rounded-t-md
            w-full
            h-[12vw]
          "
        />
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b-md
            "
        >
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="cursor-pointer w-5 h-5 lg:w-9 lg:h-9 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <FaPlay className="text-black w-2 lg:w-5" />
            </div>
            <FavoriteButton movieId={data?.id} />

            <div
              onClick={() => openModal(data?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-9 lg:h-9 bg-[#232323]  border-[#8a8a8a] border-2 rounded-full flex justify-center items-center transition hover:border-white"
            >
              <BsChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4 md:text-base  flex gap-2 items-center">
            {Math.min(Math.floor(Math.random() * 96) + 40, 96)}% Recommended
          </p>
          <p className="text-white text-[10px] lg:text-sm">
            {data.duration.slice(0, 2)} min
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center"></div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;
