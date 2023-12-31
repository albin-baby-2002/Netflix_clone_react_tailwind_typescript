import { NavLink, Link } from "react-router-dom";
import netflixLogo from "../Assets/Netflix_Logo_RGB.png";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const Header = () => {
  const isActiveLink = ({ isActive }: { isActive: Boolean }) => {
    return isActive ? "font-semibold text-white" : undefined;
  };

  return (
    <header className=" relative z-10  bg-black/30 py-1">
      <nav className=" g-4 grid  grid-cols-[200px_auto_200px] items-center">
        <section className="h-12">
          <Link to="/">
            <img
              className="h-full w-full object-contain"
              src={netflixLogo}
              alt=""
            />
          </Link>
        </section>

        <section className="text-sm text-gray-300">
          <ul className="flex gap-4  font-normal">
            <li>
              <NavLink className={isActiveLink} to="/">
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
        <section className=" flex justify-center gap-4 align-middle">
          <MagnifyingGlassIcon className=" h-7 cursor-pointer" />
          <img
            className="   h-7 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
        </section>
      </nav>
    </header>
  );
};

export default Header;
