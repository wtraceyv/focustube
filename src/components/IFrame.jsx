import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import './../App.css';

function vidSrcTemplate(id) {
  var prefix = "https://www.youtube.com/embed/";
  var suffix = "?autoplay=0";
  return prefix + id + suffix;
}

var ytplayer;

const IFrame = (props) => {
  // YouTube API Ready callback routed here, so by this time 
  // YT.Player should exist and we can fill the div with the actual IFrame.
  function ytPlayerInit() {
    if (window.YT && window.YT.Player) {
      ytplayer = new window.YT.Player('player-space', {
        height: '390',
        width: '640',
        videoId: props.curVid.videoId,
      });
    }
  }

  // For switching videos when IFrame is already loaded
  useEffect(() => {
    if (!props.hotLoadNextVideo) {
      ytPlayerInit();
      props.setHotLoadNextVideo();
    }
    else {
      ytplayer.loadVideoByUrl(vidSrcTemplate(props.curVid.videoId), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.curVid.videoId])

  // Insert the link as a script tag to load the iframe API and 
  // reroute its ready callback so React can still handle it
  useEffect(() => {
    if (!window.YT) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubePlayerAPIReady = ytPlayerInit;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Row>
        <div id='iframe-container'>
          <div className='iframe-area'>
            <div id="player-space"></div>
          </div>
          <div id='iframe-info'>
            <h4>{props.curVid.title} - <a target="_blank" rel="noopener noreferrer" href={"https://youtube.com/channels/" + props.curVid.channelId}>{props.curVid.channelTitle}</a> </h4>
            <hr />
            <p>{props.curVid.description}</p>
          </div>
        </div>
      </Row>
    </Container>
  );

};

export default IFrame;