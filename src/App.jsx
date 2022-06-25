import './App.css';
import FocusHeader from './Header';
import MainContent from './MainContent';

function App() {
  return (
    <div className="App">
      <FocusHeader />
      <MainContent />
      <footer>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </footer>
    </div>
  );
}

export default App;
