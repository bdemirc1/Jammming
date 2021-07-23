import logo from './logo.svg';
import './App.css';
import { Playlist } from '../Playlist/Playlist.js'
import { SearchBar } from '../SearchBar/SearchBar.js'
import { SearchResults } from '../SearchResults/SearchResults.js'

function App() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <div className="App-playlist"></div>
      </div>
    </div>
  );
}

export default App;
