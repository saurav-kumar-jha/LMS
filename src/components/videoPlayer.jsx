import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; 

const VideoPlayer = ({ videoUrl, onProgress, onComplete }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        fluid: true, 
        preload: "auto",
        playbackRates: [0.5, 1, 1.5,1.75, 2],
        controlBar: {
          volumePanel: { inline: false },
        },
      });

      // Load video
      playerRef.current.src({ src: videoUrl, type: "video/mp4" });

      // Track progress
      playerRef.current.on("timeupdate", () => {
        const current = playerRef.current.currentTime();
        const duration = playerRef.current.duration();
        if (duration > 0) {
          const percent = (current / duration) * 100;
          if (percent >= 80 && onComplete) {
            onComplete();
          }
          if (onProgress) {
            onProgress(current, duration, percent);
          }
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoUrl, onProgress, onComplete]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered rounded-lg"
        controls
        
      />
    </div>
  );
};

export default VideoPlayer;
