import './../App.css';
import { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import IFrame from './IFrame';
import VideoQueue from './VideoQueue';
import SearchResults from './SearchResults';

function MainContent(props) {
  const [renderedQueue, setRenderedQueue] = useState([]);
  const [newQueueId, setNewQueueId] = useState(0);
  const [curIFrameVid, setCurIFrameVid] = useState(null);

  // Perform swap on a copied dummy array, set used queue state to result to rerender
  function queueSwap(queueId, isSwappingUp) {
    var curQueue = renderedQueue.slice();
    var index1 = -1;
    // Find where this video currently is in the queue
    for (let i = 0; i < renderedQueue.length; i++) {
      if (queueId === renderedQueue[i].queueId) {
        index1 = i;
      }
    }
    // ignore request if it doesn't make sense (not accomodating wrap arounds right now)
    var index2 = (isSwappingUp) ? (index1 - 1) : (index1 + 1);
    if (index1 < 0 || index1 > curQueue.length || index2 < 0 || index2 > curQueue.length) {
      return;
    }
    // perform swap
    if (curQueue[index1] && curQueue[index2]) {
      var temp = curQueue[index1];
      curQueue[index1] = curQueue[index2];
      curQueue[index2] = temp;
    }
    setRenderedQueue(curQueue);
  }

  function queueVideo(newVideoProps) {
    var newQueue = renderedQueue.slice();
    var propsAppended = structuredClone(newVideoProps);
    propsAppended.queueId = newQueueId; // add index info for later
    newQueue.push(propsAppended);
    setNewQueueId(newQueueId + 1);
    setRenderedQueue(newQueue);
  }

  function removeFromQueue(queueId) {
    for (let i = 0; i < renderedQueue.length; i++) {
      if (queueId === renderedQueue[i].queueId) {
        var temp = renderedQueue.slice();
        temp.splice(i, 1);
        setRenderedQueue(temp);
      }
    }
  }

  function clearQueue() {
    setRenderedQueue([]);
  }

  function videoJustStarted(videoProps) {
    // remove from queue
    removeFromQueue(videoProps.queueId);
    // unhide iframe and load with the thing
    setCurIFrameVid(videoProps);
    props.videoJustStarted();
  }

  return (
    <div>
      <Container style={{ maxWidth: 1800 }}>
        <Row>
          <Col sm={7} className="border-check">
            <h1>Search</h1>
            {/* Show search results or video */}
            {props.somethingToShow ?
              (props.showVideo ?
                <IFrame curVid={curIFrameVid} hotLoadNextVideo={props.hotLoadNextVideo} setHotLoadNextVideo={props.setHotLoadNextVideo} /> :
                <SearchResults queueVideo={queueVideo} searchData={props.searchData} />)
              : <p>make a search to begin</p>}
            {/* Show next page only when search results are showing */}
            {
              (props.somethingToShow && !props.showVideo) ?
                <div className='page-turn-buttons'>
                  {
                    (props.showPrevPageButton) ?
                      <Button className='btn btn-info' onClick={() => props.getPrevPage()}>Previous Page</Button> :
                      <></>
                  }
                  <Button className='btn btn-info' onClick={() => props.getNextPage()}>Next Page</Button>
                </div>
                : <></>
            }
          </Col>
          <Col sm={5} className="border-check">
            <VideoQueue renderedQueue={renderedQueue} queueSwap={queueSwap} removeFromQueue={removeFromQueue} clearQueue={clearQueue} playVideo={videoJustStarted} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;