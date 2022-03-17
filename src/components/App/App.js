import './App.css'  ;
import  SearchBar  from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist  from '../Playlist/Playlist';
import {useState} from 'react';


function App(props) {
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      trackName: 'How to',
      artist: 'Plasui Plasui',
      albumName: '2019'
    }
  ]);

  const [playListName, setPlayListName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 2,
      trackName: 'Honeypie',
      artist: 'Jo Joh',
      albumName: 'Easy Ehh'
    }
  ]);

  const addTrack = (track) => {
    // check if track id is already added to the playlist  how??? 
    if( playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      // if found track in playListTracks then break this addTask() function
      return
    }
    else{
      // if not found in playlist -> setPlayListTrack 
      setPlaylistTracks(prev =>   ([...prev, track])  )
    }   
  }

  return (
    <div>
      <h1>Ja<span class="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist playListName={playListName} playlistTracks={playlistTracks}  />
        </div>
      </div>
    </div>
  );
}

export default App;
