import React from "react";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";

function AboutUs() {
    return (
        <Layout>
            <div className="min-height-screen container mx-auto px-2 my-6">
                <Head title="Về chúng tôi" />
                <div className="xl:py-20 py-10 px-4">
                    <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
                        <div>
                            <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                                Chào mừng đến với NetflixO của chúng tôi.
                            </h3>
                            <div className="mt-3 text-sm leading-8 text-text text-justify">
                                <p>
                                    Chào mừng đến với NetflixO - nơi hội tụ cho
                                    hàng ngàn thứ đa dạng và phong phú hoạt động
                                    giải trí! Trải nghiệm sự đa dạng của thế
                                    giới điện ảnh và truyền hình ngay trong tầm
                                    tay của bạn. Với Netflixo, bạn sẽ khám phá
                                    những bộ phim đa dạng nhất, loạt phim và
                                    chương trình truyền hình từ khắp nơi trên
                                    thế giới. Thư giãn và đắm mình trong không
                                    gian không giới hạn Thế giới giải trí mọi
                                    lúc, mọi nơi. Hãy yên tâm, Netflixo sẽ ​​là
                                    sự lựa chọn hoàn hảo đồng hành cho những
                                    giây phút giải trí của bạn!
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div className="p-8 bg-dry rounded-lg hover:scale-110 transitions">
                                    <span className="text-3xl block font-extrabold">
                                        50K +
                                    </span>
                                    <h4 className="text-lg font-semibold my-2">
                                        Phim phát hành
                                    </h4>
                                    <p className="mb-0 text-text leading-7 text-sm">
                                        Khám phá những viên ngọc điện ảnh trong
                                        bộ sưu tập của chúng tôi danh sách phim
                                        – một lối thoát ngắn ngủi đang chờ đợi.
                                    </p>
                                </div>
                                <div className="p-8 bg-dry rounded-lg hover:scale-110 transitions">
                                    <span className="text-3xl block font-extrabold">
                                        85K +
                                    </span>
                                    <h4 className="text-lg font-semibold my-2">
                                        Người dùng yêu thích
                                    </h4>
                                    <p className="mb-0 text-text leading-7 text-sm">
                                        Kính gửi những người dùng đáng yêu, cảm
                                        ơn bạn đã đồng hành một phần của cộng
                                        đồng của chúng tôi.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <img
                                src="/images/about2.jpg"
                                alt="aboutus"
                                className="w-full xl:block hidden h-header rounded-lg object-cover hover:scale-110 transitions"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AboutUs;
