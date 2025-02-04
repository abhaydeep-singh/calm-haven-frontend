import React from 'react';
import PropTypes from 'prop-types';

function YtFrame({ link }) {
  // Extract the video ID from the YouTube link
  const videoId = link.split('v=')[1]?.split('&')[0];

  if (!videoId) {
    return <div>Invalid YouTube link</div>;
  }
// width="560"  height="315"
  return (
    <div className="video-container flex justify-center ">
      <iframe 
        width="300"
        height="215"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

YtFrame.propTypes = {
  link: PropTypes.string.isRequired,
};

export default YtFrame;
