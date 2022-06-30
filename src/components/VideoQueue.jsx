import './../App.css';
import { Col, Container, Card, Button, Row } from 'react-bootstrap';
import { useState } from 'react';

// Final component for self-managing and sortable video queue.
// The queue management and the cards in the queue with their behavior 
// is all here because the behavior is all coupled together, there is 
// no great reason to separate the components.
function VideoQueue() {
  // State to track an array encapsulating video objects to display. 
  // (main queue renders order based on this state)
  const [renderedQueue, setRenderedQueue] = useState([
    { id: 0, title: "test1", pic: "pic here" },
    { id: 1, title: "test2", pic: "pic here" },
    { id: 2, title: "test3", pic: "pic here" },
  ]);

  // Perform swap on a copied dummy array, set used queue state to result to rerender
  function queueSwap(id, isSwappingUp) {
    // use id to find pos of element to swap, exit if bad id
    var curQueue = renderedQueue.slice();
    var index1 = -1;
    for (let i = 0; i < curQueue.length; i++) {
      if (curQueue[i].id === id) {
        index1 = i;
        break;
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

  // Each Card holds a queued video with some info
  // and ability to request swapping its order in the queue
  const VideoCard = (props) => {
    // Request a swap up or down
    function Swap(goingUp) {
      if (goingUp) {
        queueSwap(props.id, true);
      } else {
        queueSwap(props.id, false);
      }
    }

    return (
      <Row style={{ justifyContent: 'center' }}>
        <Card style={{ width: '18rem' }}>
          <Card.Img />
          {props.pic}
          <Card.Body>
            <Card.Text>
              <Container>
                <Row>
                  <Col sm={10}>
                    <Card.Title>
                      {props.title}
                    </Card.Title>
                  </Col>
                  <Col sm={2}>
                    <Button onClick={() => Swap(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                      </svg>
                    </Button>
                    <Button onClick={() => Swap(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                      </svg>
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    );
  }

  // The whole mapping of the list, this gets rerendered when the array state is updated
  // TODO: Fill with proper info via props from elsewhere (from call to YouTube data API)  
  return (
    <div>
      <h1>Le Queue of Videos</h1>
      <Container>
        {
          renderedQueue.map(card => <VideoCard key={card.id} id={card.id} index={card.id} title={card.title} pic={card.pic} />)
        }
      </Container>
    </div>
  );
}

export default VideoQueue;