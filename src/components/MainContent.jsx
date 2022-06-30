import './../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import IFrame from './IFrame';
import VideoQueue from './VideoQueue';

function MainContent() {
  return (
    <div>
      <Container style={{maxWidth: 1800}}>
        <Row>
          <Col sm={8} className="border-check">
            <IFrame />
          </Col>
          <Col sm={4} className="border-check">
            <VideoQueue />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;