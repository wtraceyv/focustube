import './App.css';
import { Container, Card, Button, Row } from 'react-bootstrap';

const VideoCard = () => {
  return (
    <Row style={{ justifyContent: 'center'}}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Video Title here
          </Card.Title>
          <Card.Text>
            A video thumbnail here, theoretically
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
}

function VideoQueue() {
  return (
    <div>
      <h1>Le Queue of Videos</h1>
      <Container>
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </Container>

    </div>
  );
}

export default VideoQueue;