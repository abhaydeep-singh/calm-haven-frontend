import React from "react";

import YtFrame from "./YtFrame";

function VideoSection() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {/* For mobile */}
      <div>
        <YtFrame link="https://www.youtube.com/watch?v=inpok4MKVLM"/>
      </div>
      <div>
        <YtFrame link="https://www.youtube.com/watch?v=DulNz2CkoHI"/>
      </div>
      <div>
        <YtFrame link="https://www.youtube.com/watch?v=ZToicYcHIOU"/>
      </div>
      <div>
        <YtFrame link="https://www.youtube.com/watch?v=sfSDQRdIvTc"/>
      </div>
      <div>
        <YtFrame link="https://www.youtube.com/watch?v=VpHz8Mb13_Y"/>
      </div>
      <div>
        <YtFrame link="https://www.youtube.com/watch?v=ssss7V1_eyA"/>
      </div>
      {/* <div>
        <YtFrame link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"/>
      </div> */}
    </div>
  );
}

export default VideoSection;
