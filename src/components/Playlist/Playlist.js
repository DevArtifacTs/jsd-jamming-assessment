import './Playlist.css';
import TrackList from '../TrackList/TrackList'

function Playlist(props) {
  return (
    <div className="Playlist">
      <input value={"New Playlist"}/>
      < TrackList tracks={props.playlistTracks} isRemoval={true} onRemove={props.onRemove} />
      <button className="Playlist-save"  >SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
