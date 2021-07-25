
import './App.css';
import { Playlist } from '../Playlist/Playlist.js'
import { SearchBar } from '../SearchBar/SearchBar.js'
import { SearchResults } from '../SearchResults/SearchResults.js'
import React from 'react';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchResults: [], 
                  playlistName: "Sample", 
                  playlistTracks: [{name: "Song1", artist: "Artist1", album: "Album1", id: 1},
                                   {name: "Song2", artist: "Artist2", album: "Album2", id: 2}]};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  
  addTrack(track){
    if(this.state.playlistTracks.find(saved => saved.id === track.id)){
      return;
    }
    this.setState({ playlistTracks : this.state.playlistTracks.push(track) });
  }

  removeTrack(track){
    const filtered = this.state.playlistTracks.filter(saved => saved.id === track.id);
    this.state({ playlistTracks : filtered});
  }

  updatePlaylistName(newName){
    this.setState({ playlistName: newName});
  }
  
  render(){
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar/>
        <div className="App-playlist"></div>
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlistName = { this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
      </div>
    </div>
    );
  }
}
