import Nav from "./Nav";
import Top from "./Top";

function Navbar() {
  return (
    <nav className="w-full">
      <div className="fixed z-50 bg-white w-full">
        <Top />
        <Nav />
      </div>
    </nav>
  );
}

export default Navbar;