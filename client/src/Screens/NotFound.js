import React from 'react'
import {Link} from "react-router-dom";
import {ImHome} from "react-icons/im";

function NotFound() {
    return (
        <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
            <img
                src="/images/404.svg"
                alt="notfound"
                className="w-full h-96 object-contain"
            />
            <h1 className="lg:text-4xl font-bold">Không tìm thấy trang</h1>
            <p className="font-medium text-border italic leading-6 ml-3">
                Trang bạn đang tìm kiếm không tồn tại. Bạn có thể có gõ nhầm URL
            </p>
            <Link
                to="/"
                className="bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main px-6 rounded-md"
            >
                <ImHome />
                Quay lại
            </Link>
        </div>
    );
}

export default NotFound
