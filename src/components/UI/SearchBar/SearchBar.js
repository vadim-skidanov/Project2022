import { useState } from "react";
import SearchIcon from "./SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [toggleSearchInput, setToggleSearchInput] = useState(false);

  const searchBarClasses = toggleSearchInput
    ? `${classes["search-input"]} ${classes["expand"]}`
    : classes["search-input"];

  const toggleSearchBar = () => {
    setToggleSearchInput((prevState) => !prevState);
  };

  const searchBlurHandler = () => {
    setToggleSearchInput(false);
  };

  return (
    <>
      <label htmlFor="search">
        <SearchIcon onIconClick={toggleSearchBar} />
      </label>
      <input
        id="search"
        type="search"
        className={searchBarClasses}
        placeholder={props.placeholder}
        onBlur={searchBlurHandler}
      />
    </>
  );
};

export default SearchBar;
