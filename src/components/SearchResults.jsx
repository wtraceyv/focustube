import './../App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Recieve and list a set of results from YouTube so user can choose to 
// queue them for later. Shown after a search but hidden (by MainContent) 
// when trying to watch a video.
function SearchResults(props) {

  let channelPrefix = "https://www.youtube.com/channel/";
  function SearchResultCard(cardProps) {
    return (
      <Container className='search-card'>
        <Row>
          <Col md={6}>
            {/* thumbnail */}
            <img src={cardProps.thumbnailLink} />
          </Col>
          <Col md={6}>
            <div className='search-video-info'>
              {/* Right/bottom text for title/desc/channel */}
              <h4>{cardProps.title}</h4>
              <p><a href={cardProps.channelPrefix + cardProps.channelId}>{cardProps.channelTitle}</a></p>
              <p>{cardProps.description} ...</p>
              <Button className='btn-info'>Add to Queue</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }


  return (
    <div className='search-results'>
      {
        props.searchData.map(item => 
          (item.id.kind == "youtube#video") ?
          <SearchResultCard
            thumbnailLink={item.snippet.thumbnails.medium.url}
            title={decodeURI(item.snippet.title)}
            channelId={item.snippet.channelId}
            channelTitle={item.snippet.channelTitle}
            description={item.snippet.description.split('.')[0]}
          /> :
          <></>
        )
      }
    </div>
  );
}

export default SearchResults;