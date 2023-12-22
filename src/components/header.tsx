import { NavLink, Link } from "react-router-dom";
import netflixLogo from "../Assets/Netflix_Logo_RGB.png";

const Header = () => {
  const isActiveLink = ({ isActive }: { isActive: Boolean }) => {
    return isActive ? "font-semibold text-white" : undefined;
  };

  return (
    <header className=" border-b-2 py-2">
      <nav className=" g-4 grid  grid-cols-[200px_auto_200px] items-center">
        <section className="h-12">
          <Link to="/browse">
            <img
              className="h-full w-full object-contain"
              src={netflixLogo}
              alt=""
            />
          </Link>
        </section>

        <section className="text-sm text-gray-300">
          <ul className="flex gap-4 font-thin">
            <li>
              <NavLink className={isActiveLink} to="/browse">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/tv-shows">
                Tv Shows
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/movies">
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/latest">
                New & Popular
              </NavLink>
            </li>
          </ul>
        </section>
        <section>search icon userInfo</section>
      </nav>
    </header>
  );
};

export default Header;
