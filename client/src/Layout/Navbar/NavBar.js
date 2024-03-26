import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GiHeartWings } from "react-icons/gi";
import { CgUser } from "react-icons/cg";
import { useSelector } from "react-redux";

function NavBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
    const hover = "hover:text-subMain transitions text-white";
    const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

    // Search
    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/movies/${search}`);
            setSearch(search);
        } else {
            navigate(`/movies`);
        }
    };

    return (
        <>
            <div className="bg-main shadow-md sticky top-0 z-20">
                <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
                    {/* Logo */}
                    <div className="col-span-1 lg:block hidden">
                        <Link to="/">
                            <img
                                src="/images/logo.png"
                                alt="logo"
                                className="w-full h-12 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Search Form */}
                    <div className="col-span-3">
                        <form
                            onSubmit={handleSearch}
                            className="w-full text-sm bg-dryGray rounded flex-btn gap-4"
                        >
                            <button
                                type="submit"
                                className="bg-subMain w-12 flex-colo h-12 rounded-l text-white"
                            >
                                <FaSearch className="hover:scale-125 transitions" />
                            </button>
                            <input
                                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
                                placeholder="Tìm kiếm phim của bạn tại đây...!"
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Menus */}
                    <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
                        <NavLink to="/movies" className={Hover}>
                            Phim
                        </NavLink>
                        <NavLink to="/about-us" className={Hover}>
                            Về chúng tôi
                        </NavLink>
                        <NavLink to="/contact-us" className={Hover}>
                            Liên hệ với chúng tôi
                        </NavLink>
                        <NavLink
                            to={
                                userInfo?.isAdmin
                                    ? "/dashboard"
                                    : userInfo
                                    ? "/profile"
                                    : "/login"
                            }
                            className={Hover}
                        >
                            {userInfo ? (
                                <img
                                    src={
                                        userInfo?.image
                                            ? userInfo?.image
                                            : "/images/user.png"
                                    }
                                    alt={userInfo?.fullName}
                                    className="w-10 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <CgUser className="w-8 h-8" />
                            )}
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={`${Hover} relative`}
                        >
                            <GiHeartWings className="w-9 h-9" />
                            <div className="w-4 h-4 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-3 -right-1">
                                {likedMovies?.length || 0}
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
