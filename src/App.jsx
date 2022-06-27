import './App.css';
import Footer from './Footer';
import FocusHeader from './Header';
import MainContent from './MainContent';
import Search from './Search';

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
