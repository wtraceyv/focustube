import './../App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Recieve and list a set of results from YouTube so user can choose to 
// queue them for later. Shown after a search but hidden (by MainContent) 
// when trying to watch a video.
function SearchResults(props) {

  let channelPrefix = "https://www.youtube.com/channel/";
  function SearchResultCard() {
    return (
      <Container className='search-card'>
        <Row>
          <Col md={6}>
            {/* thumbnail */}
            <img src='https://i.ytimg.com/vi/yAlkmWiYkmI/mqdefault.jpg' />
          </Col>
          <Col md={6}>
            <div className='search-video-info'>
              {/* Right/bottom text for title/desc/channel */}
              <h4>{props.searchData[1].snippet.title}</h4>
              <p><a href={channelPrefix + props.searchData[1].snippet.channelId}>{props.searchData[1].snippet.channelTitle}</a></p>
              <p>{props.searchData[1].snippet.description.split('.')[0]} ...</p>
              <Button className='btn-info'>Add to Queue</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }


  return (
    <div className='search-results'>
      <SearchResultCard />
      <SearchResultCard />
      <SearchResultCard />
      <SearchResultCard />
      <SearchResultCard />
      <SearchResultCard />
    </div>
  );
}

export default SearchResults;