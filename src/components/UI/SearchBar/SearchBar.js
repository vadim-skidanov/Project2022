const SearchBar = (props) => {
  return (
    <input
      type="search"
      className={props.className}
      placeholder={props.placeholder}
    />
  );
};

export default SearchBar;
