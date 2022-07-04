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

  function searchJustPerformed(data, nextPageToken) {
    setShowVideo(false);
    setSomethingToShow(true);
    setSearchData(data);
    setNextPageToken(nextPageToken);
  }

  function videoJustStarted() {
    setShowVideo(true);
    setSomethingToShow(true);
  }

  return (
    <div className="App">
      <FocusHeader />
      <Search onSearchSubmit={searchJustPerformed} />
      <MainContent
        somethingToShow={somethingToShow}
        showVideo={showVideo}
        searchData={searchData} 
        nextPageToken={nextPageToken} 
      />
      <Footer />
    </div>
  );
}

export default App;
