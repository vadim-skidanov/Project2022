import { useState, useContext, useEffect } from "react";
import MovieContext from "../../../store/movie-context/movie-context";
import SearchIcon from "./SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [toggleSearchInput, setToggleSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchCtx = useContext(MovieContext);

  const searchBarClasses = toggleSearchInput
    ? `${classes["search-input"]} ${classes["expand"]}`
    : classes["search-input"];

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      searchCtx.setSearchTerm(searchValue);
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [searchCtx, searchValue]);

  const toggleSearchBar = () => {
    setToggleSearchInput((prevState) => !prevState);
  };

  const searchBlurHandler = () => {
    setToggleSearchInput(false);
  };

  const searchInputValueHandler = (e) => {
    setSearchValue(e.target.value);
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
            value={searchValue}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
