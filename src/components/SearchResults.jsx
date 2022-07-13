import './../App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Notifications, NotificationsHandler } from "react-notification-components";

// Recieve and list a set of results from YouTube so user can choose to 
// queue them for later. Shown after a search but hidden (by MainContent) 
// when trying to watch a video.
function SearchResults(props) {
  let channelPrefix = "https://www.youtube.com/channel/";

  function SearchResultCard(cardProps) {
    function queueVideoWithNotif() {
      NotificationsHandler.notify(`Video, '${cardProps.title}' queued`);
      props.queueVideo(cardProps);
    }

    return (
      <Container className='search-card'>
        <Row>
          <Col md={6}>
            {/* thumbnail */}
            <img src={cardProps.thumbnailLink} alt='Thumbnail for a video found via search'/>
          </Col>
          <Col md={6}>
            <div className='search-video-info'>
              {/* Right/bottom text for title/desc/channel */}
              <h4>{cardProps.title}</h4>
              <p><a href={channelPrefix + cardProps.channelId} target='_blank' rel='noopener noreferrer'>{cardProps.channelTitle}</a></p>
              <p>{cardProps.description}</p>
              <Button className='btn-info' onClick={() => queueVideoWithNotif()}>Add to Queue</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }


  return (
    <div className='search-results'>
      <Notifications className='notif-custom' />
      {
        props.searchData.map(item => 
          (item.id.kind === "youtube#video") ?
          <SearchResultCard
            videoId={item.id.videoId}
            thumbnailLink={item.snippet.thumbnails.medium.url}
            title={decodeURI(item.snippet.title)}
            channelId={item.snippet.channelId}
            channelTitle={item.snippet.channelTitle}
            description={item.snippet.description}
            key={item.etag}
          /> :
          <div key={item.etag}></div>
        )
      }
    </div>
  );
}

export default SearchResults;