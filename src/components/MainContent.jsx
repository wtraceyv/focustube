import './../App.css';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IFrame from './IFrame';
import VideoQueue from './VideoQueue';
import SearchResults from './SearchResults';

function MainContent(props) {

  function searchJustLaunched() {
    // use state from search -> app -> here
    // hide iframe, show search results
  } 

  function videoJustStarted() {
    // user chose to start watching a video, unhide iframe
  }

  return (
    <div>
      <Container style={{maxWidth: 1800}}>
        <Row>
          <Col sm={8} className="border-check">
            <h1>Le Content</h1>
            {props.somethingToShow ? (props.showVideo ? <IFrame /> : <SearchResults />) : <p>make a search to begin</p>}
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