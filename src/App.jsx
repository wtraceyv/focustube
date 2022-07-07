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
  const [nextPageToken, setNextPageToken] = useState("");
  const [hotLoadNextVideo, setHotLoadNextVideo] = useState(false);

  function searchJustPerformed(data, nextPageToken) {
    setShowVideo(false);
    setSomethingToShow(true);
    setSearchData(data);
    setNextPageToken(nextPageToken);
    setHotLoadNextVideo(false);
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
      <Search onSearchSubmit={searchJustPerformed} />
      <MainContent
        hotLoadNextVideo={hotLoadNextVideo}
        setHotLoadNextVideo={doHotLoadNextVideo}
        somethingToShow={somethingToShow}
        showVideo={showVideo}
        videoJustStarted={videoJustStarted}
        searchData={searchData} 
        nextPageToken={nextPageToken} 
      />
      <Footer />
    </div>
  );
}

export default App;
