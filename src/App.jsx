import './App.css';
import { useState } from 'react';
import Footer from './components/Footer';
import FocusHeader from './components/Header';
import MainContent from './components/MainContent';
import Search from './components/Search';

function App() {
  const [somethingToShow, setSomethingToShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const [searchData, setSearchData] = useState(null);
  const [lastQuery, setLastQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [prevPageToken, setPrevPageToken] = useState("");
  const [hotLoadNextVideo, setHotLoadNextVideo] = useState(false);

  // const [error, setError] = useState(null);

  function finishSearchCallback(data) {
    // Settings for hiding IFrame and sending search data down for showing
    setSearchData(data.items);
    setNextPageToken(data.nextPageToken);
    setPrevPageToken(data.prevPageToken);

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

    // TODO: remove dummy data when done
    console.log(fullUrl);
    let dummyData = require('./dummy.json');
    finishSearchCallback(dummyData);

    // fetch(fullUrl)
    // .then((result) => {
    //   return result.json(); // this returns a Promise
    // })
    // .then((data) => { // need this step to grab the Object I want ^
    //   console.log(data);
    //   finishSearchCallback(data);
    // },
    // (error) => { // don't forget an error handle
    //   setError(error);
    //   console.log(error);
    // });
  }

  function newSearch(query) {
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

  return (
    <div className="App">
      <FocusHeader />
      <Search onSearchSubmit={newSearch} />
      <MainContent
        searchData={searchData} 
        hotLoadNextVideo={hotLoadNextVideo}
        setHotLoadNextVideo={doHotLoadNextVideo}
        somethingToShow={somethingToShow}
        showVideo={showVideo}
        videoJustStarted={videoJustStarted}
        getNextPage={getNextPage}
        getPrevPage={getPrevPage}
      />
      <Footer />
    </div>
  );
}

export default App;
