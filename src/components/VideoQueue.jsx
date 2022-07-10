import './../App.css';
import { Container, Card, Button } from 'react-bootstrap';
import { Notifications, NotificationsHandler } from "react-notification-components";

// Final component for self-managing and sortable video queue.
// The queue management and the cards in the queue with their behavior 
// is all here because the behavior is all coupled together, there is 
// no great reason to separate the components.
function VideoQueue(props) {
  // Each Card holds a queued video with some info
  // and ability to request swapping its order in the queue
  const VideoCard = (cardProps) => {
    // Request a swap up or down
    function Swap(goingUp) {
      if (goingUp) {
        props.queueSwap(cardProps.data.queueId, true);
      } else {
        props.queueSwap(cardProps.data.queueId, false);
      }
    }

    return (
      <div className='queue-card'>
        <Card style={{ width: '18rem' }}>
          <div className='queued-video-img'>
            <Card.Img variant="top" src={cardProps.data.thumbnailLink} />
          </div>
          <Card.Body>
            <Card.Title>{cardProps.data.title}</Card.Title>
            <Card.Text>
              <div className='inline'>
                <Button onClick={() => props.playVideo(cardProps.data)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                  </svg>
                </Button>
                <Button onClick={() => Swap(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                  </svg>
                </Button>
                <Button onClick={() => Swap(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                  </svg>
                </Button>
                <Button onClick={() => props.removeFromQueue(cardProps.data.queueId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </Button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  function clearQueueWithNotif() {
    NotificationsHandler.notify(`Cleared Video Queue`);
    props.clearQueue();
  }

  // The whole mapping of the list, this gets rerendered when the array state is updated
  return (
    <div className='video-queue'>
      <Notifications />
      <h1>Queue</h1>
      <Container className='search-results'>
        <Button className='btn btn-danger' onClick={() => clearQueueWithNotif()}>Clear Queue</Button>
        {
          props.renderedQueue.length > 0 ?
            props.renderedQueue.map(card => <VideoCard data={card} key={card.queueId} />)
            : <p>Make a search to queue some videos here</p>
        }
      </Container>
    </div>
  );
}

export default VideoQueue;