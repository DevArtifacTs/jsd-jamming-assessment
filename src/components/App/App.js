import './App.css'  ;
import  SearchBar  from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults'
import Playlist  from '../Playlist/Playlist';
import {useState} from 'react';
import Spotify  from '../../utils/Spotify'


function App(props) {
  const [searchResults, setSearchResults] = useState([]);

  const [playListName, setPlayListName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (tracks) => {
    // check if track id is already added to the playlist  how??? 
    if( playlistTracks.find(savedTrack => savedTrack.id === tracks.id)){
      // if found track in playListTracks then break this addTask() function
      return
    } else {
      // if not found in playlist -> setPlayListTrack 
      setPlaylistTracks(prev =>   ([...prev, tracks])  )
    }   
  }

  const removeTrack = (tracks) => {
    // filter selected track out and return remain track 
    setPlaylistTracks((prev) => {
      return prev.filter((currentTrack) => currentTrack.id  !== tracks.id);
    })
  }

  const updatePlaylistName = ( name ) => {
    setPlayListName( name );
    // console.log(name);
  }

  const savePlayList = ( ) => {
    const trackUris = playlistTracks.map((currentTrack)=> currentTrack.uri)
    Spotify.savePlaylist(playListName, trackUris).then(() => {
      setPlayListName('New Playlist');
      setPlaylistTracks([]);
    })
  }

  // const[tracksUri, setTracksUri] = useState([]);

  const search = (searchTerm) => {
    Spotify.getAccessToken()
    Spotify.search(searchTerm).then((tracks) => {
      setSearchResults(tracks);
      // update tracksUri
      console.log(tracks.map((currentTrack) =>  currentTrack.uri));
      // setTracksUri(  tracks.map((currentTrack)=> currentTrack.uri  ) )
      // alert(trackUri);
    })
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist playListName={playListName} 
        playlistTracks={playlistTracks} 
        onRemove={removeTrack} 
        onNameChange={updatePlaylistName}  
        onSave={savePlayList} />
        </div>
      </div>
    </div>
  );
}

export default App;
