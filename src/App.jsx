import './App.css';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Footer from './components/Footer';
import FocusHeader from './components/Header';
import MainContent from './components/MainContent';
import MainContentMobile from './components/MainContentMobile';
import Search from './components/Search';
import MobileQueueButton from './components/MobileQueueButton';

function App() {

  /* Search functions and related states */

  const [somethingToShow, setSomethingToShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [lastQuery, setLastQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [showPrevPageButton, setShowPrevPageButton] = useState(false);
  const [prevPageToken, setPrevPageToken] = useState("");
  const [hotLoadNextVideo, setHotLoadNextVideo] = useState(false);
  const [error, setError] = useState(null);

  function finishSearchCallback(data) {
    // Settings for hiding IFrame and sending search data down for showing
    setSearchData(data.items);
    setNextPageToken(data.nextPageToken);
    if (data.prevPageToken) {
      setPrevPageToken(data.prevPageToken);
      setShowPrevPageButton(true);
    } else {
      setShowPrevPageButton(false);
    }

    setShowVideo(false);
    setSomethingToShow(true);
    setHotLoadNextVideo(false);
  }

  function apiSearch(query, wantsNextPage, wantsPrevPage) {
    setLastQuery(query);
    const apiUrl = "https://www.googleapis.com/youtube/v3/search?";
    const params = "key=AIzaSyCJC86RBvFG5yBXsgu2P2GFYF-tktb8yzs&part=snippet&maxResults=30&q="
    var fullUrl = encodeURI(apiUrl + params + query);

    if (wantsNextPage) {
      fullUrl += "&pageToken=" + nextPageToken;
    }
    else if (wantsPrevPage) {
      fullUrl += "&pageToken=" + prevPageToken;
    }

    // TODO: uncomment these 3 lines and comment out whole fetch to test without using api quota 

    // console.log(fullUrl);
    // let dummyData = require('./dummy.json');
    // finishSearchCallback(dummyData);

    fetch(fullUrl)
    .then((result) => {
      return result.json(); // this returns a Promise
    })
    .then((data) => { // need this step to grab the Object I want ^
      console.log(data);
      finishSearchCallback(data);
    },
    (error) => { // don't forget an error handle
      setError(error);
      console.log(error);
    });
  }

  function newSearch(query) {
    setShowVideo(false);
    setMobileShowContentNotQueue(true);
    apiSearch(query, false, false);
  }

  function getNextPage() {
    apiSearch(lastQuery, true, false);
  }

  function getPrevPage() {
    apiSearch(lastQuery, false, true);
  }

  function videoJustStarted() {
    setShowVideo(true);
    setSomethingToShow(true);
  }

  function doHotLoadNextVideo() {
    setHotLoadNextVideo(true);
  }

  // for mobile only
  const [mobileShowContentNotQueue, setMobileShowContentNotQueue] = useState(true);
  function mobileSwitchContent() {
    setMobileShowContentNotQueue(!mobileShowContentNotQueue);
  }

  return (
    <div className="App">
      {
        (error) ?
          <div>error</div> :
          <></>
      }
      <FocusHeader />
      <Search onSearchSubmit={newSearch} />
      {
        (isMobile) ?
          <div>
            {/* on mobile, add button for switching between search/video and queue views */}
            <MainContentMobile
              searchData={searchData}
              hotLoadNextVideo={hotLoadNextVideo}
              setHotLoadNextVideo={doHotLoadNextVideo}
              somethingToShow={somethingToShow}
              showVideo={showVideo}
              videoJustStarted={videoJustStarted}
              getNextPage={getNextPage}
              showPrevPageButton={showPrevPageButton}
              getPrevPage={getPrevPage}
              mobileShowContentNotQueue={mobileShowContentNotQueue}
            />
            <MobileQueueButton mobileShowContentNotQueue={mobileShowContentNotQueue} mobileSwitchContent={mobileSwitchContent} />
          </div>
          :
          <MainContent
            searchData={searchData}
            hotLoadNextVideo={hotLoadNextVideo}
            setHotLoadNextVideo={doHotLoadNextVideo}
            somethingToShow={somethingToShow}
            showVideo={showVideo}
            videoJustStarted={videoJustStarted}
            getNextPage={getNextPage}
            showPrevPageButton={showPrevPageButton}
            getPrevPage={getPrevPage}
          />
      }
      <Footer />
    </div>
  );
}

export default App;
