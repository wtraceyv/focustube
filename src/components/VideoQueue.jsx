import './../App.css';
import { Container, Card, Button } from 'react-bootstrap';

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
          <Card.Img variant="top" src={cardProps.data.thumbnailLink} />
          <Card.Body>
            <Card.Title>{cardProps.data.title}</Card.Title>
            <Card.Text>
              <Button onClick={() => Swap(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                </svg>
              </Button>
              <Button onClick={() => Swap(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                </svg>
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  // The whole mapping of the list, this gets rerendered when the array state is updated
  return (
    <div className='video-queue'>
      <h1>Le Queue of Videos</h1>
      <Container className='search-results'>
        <Button className='btn btn-danger' onClick={() => props.clearQueue()}>Clear Queue</Button>
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