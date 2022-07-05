import './../App.css';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IFrame from './IFrame';
import VideoQueue from './VideoQueue';
import SearchResults from './SearchResults';

function MainContent(props) {
  const [renderedQueue, setRenderedQueue] = useState([]);
  const [newQueueId, setNewQueueId] = useState(0);

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

  function videoJustStarted() {
    // user chose to start watching a video, unhide iframe
  }

  return (
    <div>
      <Container style={{ maxWidth: 1800 }}>
        <Row>
          <Col sm={7} className="border-check">
            <h1>Le Content</h1>
            {props.somethingToShow ? (props.showVideo ? <IFrame /> : <SearchResults queueVideo={queueVideo} searchData={props.searchData} />) : <p>make a search to begin</p>}
          </Col>
          <Col sm={5} className="border-check">
            <VideoQueue renderedQueue={renderedQueue} queueSwap={queueSwap} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;