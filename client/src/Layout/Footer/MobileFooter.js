import React, { useContext } from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { RiHeartsFill } from "react-icons/ri";
import { FiUserCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { CgMenuBoxed } from "react-icons/cg";
import { SidebarContext } from "../../Context/DrawerContext";
import MenuDrawer from "../../Components/Drawer/MenuDrawer";
import { useSelector } from "react-redux";

function MobileFooter() {
    const { mobileDrawer, toggleDrawer } = useContext(SidebarContext);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
    const { userInfo } = useSelector((state) => state.userLogin);
    const active = "bg-white text-main";
    const inActive =
        "transitions text-2xl flex-colo hover:bg-white hover:text-main rounded-md px-4 py-3";
    const Hover = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : inActive;

    return (
        <>
            <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
                {/* Drawer */}
                <MenuDrawer
                    drawerOpen={mobileDrawer}
                    toggleDrawer={toggleDrawer}
                />
            </div>
            <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
                <div className="bg-dry rounded-md flex-btn w-full p-1">
                    <NavLink to="/movies" className={Hover}>
                        <BsCollectionPlay />
                    </NavLink>
                    <NavLink to="/favorites" className={Hover}>
                        <div className="relative">
                            <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                                {likedMovies?.length > 0
                                    ? likedMovies?.length
                                    : 0}
                            </div>
                            <RiHeartsFill className="w-7 h-7" />
                        </div>
                    </NavLink>

                    <NavLink
                        to={
                            userInfo
                                ? userInfo.isAdmin
                                    ? "/dashboard"
                                    : "/profile"
                                : "/login"
                        }
                        className={Hover}
                    >
                        <FiUserCheck />
                    </NavLink>
                    <button onClick={toggleDrawer} className={inActive}>
                        <CgMenuBoxed />
                    </button>
                </div>
            </footer>
        </>
    );
}

export default MobileFooter;
