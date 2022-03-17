import './Track.css';
// import {useState} from 'react' ;

function Track(props) {
  // const [isRemoval, setIsRemoval] = useState(true);

  const renderAction = () => {
    if(props.isRemoval){
      return '+'
    }
    else {
      return '-'
    }
  }
  // console.log(props.track);
  // console.log(isRemoval);
  const addTrack = () => {
    props.onAdd(props.track)
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.trackName}</h3>
        <p>{props.track.artist} | {props.track.albumName}</p>
      </div>
      <button className="Track-action" onClick={addTrack} >{renderAction()}</button>
    </div>
  );
}

export default Track;
