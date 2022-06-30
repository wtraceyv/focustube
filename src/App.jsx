import './App.css';
import Footer from './components/Footer';
import FocusHeader from './components/Header';
import MainContent from './components/MainContent';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <FocusHeader />
      <Search />
      <MainContent />
      <Footer /> 
    </div>
  );
}

export default App;
