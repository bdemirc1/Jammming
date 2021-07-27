
import './App.css';
import { Playlist } from '../Playlist/Playlist.js'
import { SearchBar } from '../SearchBar/SearchBar.js'
import { SearchResults } from '../SearchResults/SearchResults.js'
import  { Spotify }  from '../../util/Spotify.js'

import React from 'react';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { searchResults: [], 
                  playlistName: "My Playlist", 
                  playlistTracks: []
                };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  addTrack(track){
    var tracks = this.state.playlistTracks;
    if(tracks.find(saved => saved.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks : tracks });
  }

  removeTrack(track){
    var tracks = this.state.playlistTracks;
    const filtered = tracks.filter(saved => saved.id !== track.id);
    this.setState({ playlistTracks : filtered});
  }

  updatePlaylistName(newName){
    this.setState({ playlistName: newName});
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=> {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }
  
  search(term){
    Spotify.search(term).then(
      results => this.setState({searchResults: results}));
    
  }

  render(){
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist"></div>
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlistName = { this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
      </div>
    </div>
    );
  }
}
