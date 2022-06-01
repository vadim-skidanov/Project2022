import { useState } from "react";
import SearchIcon from "./SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [toggleSearchInput, setToggleSearchInput] = useState(false);
  const searchValue = props.value;

  const searchBarClasses = toggleSearchInput
    ? `${classes["search-input"]} ${classes["expand"]}`
    : classes["search-input"];

  // useEffect(() => {
  //   const debounceFn = setTimeout(() => {
  //     movieCtx.setSearchTerm(movieCtx.searchTerm);
  //   }, 500);

  //   return () => clearTimeout(debounceFn);
  // }, [movieCtx, movieCtx.searchTerm]);

  const toggleSearchBar = () => {
    setToggleSearchInput((prevState) => !prevState);
  };

  const searchBlurHandler = () => {
    if (searchValue.length === 0) {
      setToggleSearchInput(false);
    }
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
            onChange={props.onChange}
            value={props.value}
          />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
