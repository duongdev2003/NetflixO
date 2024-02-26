import React from "react";
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";
import MobileFooter from "./Footer/MobileFooter";

function Layout({children}) {
    return (
        <>
            <div className="bg-main text-white">
                <NavBar/>
                {children}
                <Footer/>
                {/* Mobile Footer */}
                <MobileFooter/>
            </div>
        </>
    )
}

export default Layout;