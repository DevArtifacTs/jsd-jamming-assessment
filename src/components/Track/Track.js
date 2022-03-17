import './Track.css';
// import {useState} from 'react' ;

function Track(props) {
 
  // console.log(props.track);
  // console.log(isRemoval);
  const addTrack = () => {
    props.onAdd(props.track);
  }
  const removeTrack = () => {
    props.onRemove(props.track);
  }

  const renderAction = () => {
    if(props.isRemoval){
      return <button className="Track-action" onClick={removeTrack} >-</button>
    }
    else {
      return <button className="Track-action" onClick={addTrack} >+</button>
    }
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.trackName}</h3>
        <p>{props.track.artist} | {props.track.albumName}</p>
      </div>
      {/* <button className="Track-action" onClick={addTrack} >{renderAction()}</button> */}
      {renderAction()}
    </div>
  );
}

export default Track;
