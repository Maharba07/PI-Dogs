import "./navbar.styles.css";

function Navbar({ handleChange }) {
  return (
    <div className="search-box">
      <form>
        <input
          className="search-bar"
          placeholder="Search"
          type="search"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Navbar;
