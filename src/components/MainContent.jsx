import './../App.css';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import IFrame from './IFrame';
import VideoQueue from './VideoQueue';
import SearchResults from './SearchResults';

function MainContent(props) {

  function videoJustStarted() {
    // user chose to start watching a video, unhide iframe
  }

  return (
    <div>
      <Container style={{maxWidth: 1800}}>
        <Row>
          <Col sm={7} className="border-check">
            <h1>Le Content</h1>
            {props.somethingToShow ? (props.showVideo ? <IFrame /> : <SearchResults searchData={props.searchData} />) : <p>make a search to begin</p>}
          </Col>
          <Col sm={5} className="border-check">
            <VideoQueue />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainContent;