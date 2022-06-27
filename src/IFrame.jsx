import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './App.css';

function vidSrcTemplate(id) {
  var prefix = "https://www.youtube.com/embed/";
  var suffix = "?autoplay=0";
  return prefix + id + suffix;
}

var ytplayer;
var exampleIDs = ['KedW5IUJrLI', 'a1UZRzbiE8Y', 'gGRz95Ry9ok'];

const IFrame = () => {
  const [curVideoID, setCurVideoID] = useState(0);
  const [curVideoURL, setCurVideoURL] = useState("https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=0");

  function check() {
    if (window.YT && window.YT.Player) {
      console.log("YT is a thing");
      ytplayer = new window.YT.Player('playerSpace', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
      });
    }
  }

  function switchVid() {
    setCurVideoID((curVideoID + 1) % exampleIDs.length);
    setCurVideoURL(vidSrcTemplate(exampleIDs[curVideoID]));
    ytplayer.loadVideoByUrl(curVideoURL, 0);
  }

  useEffect(() => {
    if (!window.YT) {
      console.log("Staring IFrame Player API load..");
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubePlayerAPIReady = check;
    }
    else {
      check();
    }
  }, [])

  return (
    <Container>
      <Row>
        <div className='iframe-area'>
          <div id="playerSpace"></div>
        </div>
      </Row>
      <Row>
        <Button
          onClick={() => switchVid()}
        >
          Change Video
        </Button>
      </Row>
    </Container>
  );

};

export default IFrame;