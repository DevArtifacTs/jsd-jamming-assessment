import './TrackList.css';
import Track from '../Track/Track';

function TrackList(props){
    return (
        <div className="TrackList">
            <ul>
                {props.tracks.map((track)=>{
                    return (
                        <li>
                        <Track track={track} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval} />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default TrackList ;