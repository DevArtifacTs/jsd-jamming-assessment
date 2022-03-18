import './SearchBar.css';
import{ useState } from 'react'

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const search = ( ) => {
    props.onSearch(searchTerm)
  }
  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <div className="SearchBar">
      <input value={searchTerm} 
      onChange={handleTermChange} 
      placeholder="Enter A Song, Album, or Artist" 
      />
      <button className="SearchButton" onClick={search } >SEARCH</button>
    </div>
  );
}

export default SearchBar;
