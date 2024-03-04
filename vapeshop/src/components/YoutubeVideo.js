import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const YouTubeVideo = ({ videoId, thumbnailUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      {!isPlaying ? (
        <div
          onClick={handleThumbnailClick}
          style={{
            cursor: 'pointer',
            position: 'relative',
            width: '468px',
            height: '263px',
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: 'cover',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
         
            <FontAwesomeIcon icon={faPlayCircle} className='text-[#623288] text-6xl' />
          </div>
        </div>
      ) : (
        <iframe
          width="468"
          height="263"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Video Placeholder"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default YouTubeVideo;
