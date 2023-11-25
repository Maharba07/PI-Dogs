import "./navbar.styles.css";

function Navbar({ handleChange}) {
  return (
    <div className="search-box">
      <form onChange={handleChange}>
        <input className="search-bar" placeholder="Search" type="search" />
        
      </form>
    </div>
  );
}

export default Navbar;