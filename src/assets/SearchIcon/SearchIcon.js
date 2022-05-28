import classes from "./SearchIcon.module.css";

const SearchIcon = (props) => {
  return (
    <svg
      onClick={props.onIconClick}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      id={classes["search-logo"]}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

export default SearchIcon;
