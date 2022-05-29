import SearchBar from "../../UI/SearchBar/SearchBar";
import classes from "./MovieSearch.module.css";

const MovieSearch = () => {
  const onSearch = (e) => {
    e.preventDefault();
  };

  const placeholderText = "Search movie title";

  return (
    <div className={classes.search}>
      <form className={classes["search-form"]} onSubmit={onSearch}>
        <SearchBar placeholder={placeholderText} />
      </form>
    </div>
  );
};

export default MovieSearch;
