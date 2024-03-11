import React from "react";
import { FiMail, FiPhoneCall, FiMapPin } from "react-icons/fi";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";

function ContactUs() {
    const ContactData = [
        {
            id: 1,
            title: "Gửi email cho chúng tôi",
            info: "Phát triển các ý tưởng phụ trợ một cách tương tác cho các mô hình đa nền tảng.",
            icon: FiMail,
            contact: "duongintech@gmail.com",
        },
        {
            id: 2,
            title: "Liên hệ cho chúng tôi",
            info: "Phát triển các ý tưởng phụ trợ một cách tương tác cho các mô hình đa nền tảng.",
            icon: FiPhoneCall,
            contact: "+84 34.xxxx.100",
        },
        {
            id: 3,
            title: "Vị trí",
            info: "Tầng 18, Center Building, Số 1 Nguyễn Huy Tưởng, Thanh Xuân Trung, Thanh Xuân, Hà Nội",
            icon: FiMapPin,
            contact: "",
        },
    ];

    return (
        <Layout>
            <div className="min-height-screen container mx-auto px-2 my-6">
                <Head title="Liên hệ với chúng tôi" />
                <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
                    {ContactData.map((item) => (
                        <div
                            key={item.id}
                            className="border border-border flex-colo p-10 bg-dry rounded-lg text-center hover:scale-110 transitions"
                        >
                            <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                                <item.icon />
                            </span>
                            <h5 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h5>
                            <p className="mb-0 text-sm text-text leading-7">
                                <a
                                    href={`mailto:${item.contact}`}
                                    className="text-blue-600"
                                >
                                    {item.contact}
                                </a>{" "}
                                {item.info}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default ContactUs;
