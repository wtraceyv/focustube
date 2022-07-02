import './App.css';
import { useState } from 'react';
import Footer from './components/Footer';
import FocusHeader from './components/Header';
import MainContent from './components/MainContent';
import Search from './components/Search';

function App() {
  const [somethingToShow, setSomethingToShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  function searchJustPerformed() {
    setShowVideo(false);
    setSomethingToShow(true);
  }

  function videoJustStarted() {
    setShowVideo(true);
    setSomethingToShow(true);
  }

  return (
    <div className="App">
      <FocusHeader />
      <Search onSearchSubmit={searchJustPerformed}/>
      <MainContent somethingToShow={somethingToShow} showVideo={showVideo} />
      <Footer /> 
    </div>
  );
}

export default App;
