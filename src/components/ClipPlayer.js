import React, { useState, useRef, useEffect } from "react";
import { PlayCircle, PauseCircle } from "react-ionicons";

const ClipPlayer = ({ src, startTimestamp }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (startTimestamp) {
      audioRef.current.currentTime = startTimestamp / 1000;
    }
  }, [startTimestamp]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progressPercentage = (currentTime / duration) * 100 || 0;
    setProgress(progressPercentage);
  };

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="flex flex-row items-center">
      <audio ref={audioRef} src={src} />
      <button onClick={togglePlay}>
        {isPlaying ? (
          <PauseCircle color={"gray"} height={"40px"} width={"40px"} />
        ) : (
          <PlayCircle color={"gray"} height={"40px"} width={"40px"} />
        )}
      </button>
      <div className="w-full h-4 bg-gray-200 rounded-full">
        <div
          className={`h-full bg-blue-500 rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ClipPlayer;
