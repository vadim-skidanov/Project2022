import { useState } from "react";
import SearchIcon from "./SearchIcon/SearchIcon";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const searchBarClasses = toggleSearchBar
    ? `${classes["search-input"]} ${classes["expand"]}`
    : classes["search-input"];

  const onSearchLogoClick = () => {
    setToggleSearchBar((prevState) => !prevState);
  };

  return (
    <>
      <label htmlFor="search">
        <SearchIcon onIconClick={onSearchLogoClick} />
      </label>
      <input
        id="search"
        type="search"
        className={searchBarClasses}
        placeholder={props.placeholder}
      />
    </>
  );
};

export default SearchBar;
