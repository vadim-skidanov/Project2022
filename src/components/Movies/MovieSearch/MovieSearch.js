import { useState } from "react";
import SearchIcon from "../../../assets/SearchIcon/SearchIcon";
import SearchBar from "../../UI/SearchBar/SearchBar";
import classes from "./MovieSearch.module.css";

const MovieSearch = () => {
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const onSearchLogoClick = () => {
    setToggleSearchBar((prevState) => !prevState);
  };

  const searchBarClasses = toggleSearchBar
    ? `${classes["search-input"]} ${classes["expand"]}`
    : classes["search-input"];

  const onSearch = (e) => {
    e.preventDefault();
  };

  const placeholderText = "Search movie title";

  return (
    <div className={classes.search}>
      <SearchIcon onIconClick={onSearchLogoClick} />
      <form onSubmit={onSearch}>
        <SearchBar className={searchBarClasses} placeholder={placeholderText} />
      </form>
    </div>
  );
};

export default MovieSearch;
