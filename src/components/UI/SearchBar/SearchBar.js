import { useState, useContext } from "react";
import MovieContext from "../../../store/movie-context/movie-context";
import SearchIcon from "./SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [toggleSearchInput, setToggleSearchInput] = useState(false);
  const searchCtx = useContext(MovieContext);
  console.log(searchCtx.searchTerm);
  const searchBarClasses = toggleSearchInput
    ? `${classes["search-input"]} ${classes["expand"]}`
    : classes["search-input"];

  const toggleSearchBar = () => {
    setToggleSearchInput((prevState) => !prevState);
  };

  const searchBlurHandler = () => {
    setToggleSearchInput(false);
  };

  const searchInputValueHandler = (e) => {
    searchCtx.setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className={classes.search}>
        <form className={classes["search-form"]} onSubmit={props.onSearch}>
          <label htmlFor="search">
            <SearchIcon onIconClick={toggleSearchBar} />
          </label>
          <input
            id="search"
            type="search"
            className={searchBarClasses}
            placeholder={props.placeholder}
            onBlur={searchBlurHandler}
            onChange={searchInputValueHandler}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
