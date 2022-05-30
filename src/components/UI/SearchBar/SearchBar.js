import { useState, useContext, useEffect } from "react";
import MovieContext from "../../../store/movie-context/movie-context";
import SearchIcon from "./SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [toggleSearchInput, setToggleSearchInput] = useState(false);
  const movieCtx = useContext(MovieContext);

  const searchBarClasses = toggleSearchInput
    ? `${classes["search-input"]} ${classes["expand"]}`
    : classes["search-input"];

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      movieCtx.setSearchTerm(movieCtx.searchTerm);
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [movieCtx, movieCtx.searchTerm]);

  const toggleSearchBar = () => {
    setToggleSearchInput((prevState) => !prevState);
  };

  const searchBlurHandler = () => {
    if (movieCtx.searchTerm.length === 0) {
      setToggleSearchInput(false);
    }
  };

  const searchInputValueHandler = (e) => {
    movieCtx.setSearchTerm(e.target.value);
  };

  const searchHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={classes.search}>
        <form className={classes["search-form"]} onSubmit={searchHandler}>
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
            value={movieCtx.searchTerm}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
