import SearchBar from "../../UI/SearchBar/SearchBar";

const MovieSearch = () => {
  const searchHandler = (e) => {
    e.preventDefault();
  };

  const placeholderText = "Search movie title";

  return <SearchBar onSearch={searchHandler} placeholder={placeholderText} />;
};

export default MovieSearch;
