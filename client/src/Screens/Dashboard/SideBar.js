import React from "react";
import Layout from "../../Layout/Layout";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import { RiLockPasswordLine, RiMovie2Fill } from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function SideBar({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);

    // Logout function
    const logoutHandler = () => {
        const confirmed = window.confirm("Bạn có muốn đăng xuất không?");
        if (confirmed) {
            dispatch(logoutAction());
            navigate("/login");
            toast.success("Đăng xuất thành công");
        }
    };

    const SideLinks = userInfo?.isAdmin
        ? [
              {
                  name: "Bảng điều khiển",
                  link: "/dashboard",
                  icon: BsFillGridFill,
              },
              {
                  name: "Danh sách phim",
                  link: "/movieslist",
                  icon: FaListAlt,
              },
              {
                  name: "Thêm phim",
                  link: "/addmovie",
                  icon: RiMovie2Fill,
              },
              {
                  name: "Thể loại",
                  link: "/categories",
                  icon: HiViewGridAdd,
              },
              {
                  name: "Tài khoản người dùng",
                  link: "/users",
                  icon: FaUsers,
              },
              {
                  name: "Hồ sơ",
                  link: "/profile",
                  icon: FiSettings,
              },
              {
                  name: "Phim yêu thích",
                  link: "/favorites",
                  icon: FaHeart,
              },
              {
                  name: "Đổi mật khẩu",
                  link: "/password",
                  icon: RiLockPasswordLine,
              },
          ]
        : userInfo
        ? [
              {
                  name: "Hồ sơ",
                  link: "/profile",
                  icon: FiSettings,
              },
              {
                  name: "Phim yêu thích",
                  link: "/favorites",
                  icon: FaHeart,
              },
              {
                  name: "Đổi mật khẩu",
                  link: "/password",
                  icon: RiLockPasswordLine,
              },
          ]
        : [];
    const active = "bg-dryGray text-subMain";
    const hover = "hover:text-white hover:bg-main";
    const inActive =
        "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
    const Hover = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
                        {
                            //SideBar Links
                            SideLinks.map((link, index) => (
                                <NavLink
                                    to={link.link}
                                    key={index}
                                    className={Hover}
                                >
                                    <link.icon />
                                    <p>{link.name}</p>
                                </NavLink>
                            ))
                        }
                        <button
                            onClick={logoutHandler}
                            className={`${inActive} ${hover} w-full`}
                        >
                            <IoIosLogOut /> Đăng xuất
                        </button>
                    </div>
                    <div
                        className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="10"
                        data-aos-offset="200"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SideBar;
