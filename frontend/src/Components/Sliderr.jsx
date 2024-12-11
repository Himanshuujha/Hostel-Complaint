import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliderr({ slideData }) {
    let sliderRef = useRef(null);

    const settings = {
        dots: true,
        lazyLoad: false,
        infinite: true,
        speed: 500,
        initialSlide: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        centerMode: true,
        centerPadding: '120px', 
    };

    return (
        <section className="relative bg-primaryBlack mx-auto w-1/2 px-4 sm:px-10 py-8 md:pb-10 md:pt-10">
            <div className="homeSlider absolute left-0 w-[38%] ">
                <Slider
                    ref={slider => {
                        sliderRef = slider;
                    }}
                    {...settings}>
                    {slideData.map((item, index) => {
                        return (
                            <div key={index} className="slide w-full my-10">
                                <div className="bg-[#182736] flex flex-col justify-center gap-2 items-start w-full p-4 rounded-lg shadow-lg">
                                    <div className="text-white flex flex-col gap-2 ">
                                    <div className="flex gap-2 items-center ">
                                            <img src={item.img} alt={item.founder} className="h-8 w-8 rounded-full" />
                                            <div className="flex flex-col ">
                                                <p className=" font-bold text-[10px]">
                                                    {item.name}
                                                </p>
                                                <p className="text-[8px] text-primaryGreen">
                                                    {item.founder}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className="italic text-white text-[8px] font-normal leading-tight">
                                                &quot;{item.para}&quot;
                                            </p>
                                        </div>
                                       <div className="flex justify-end"> <img src='/img/star.png' alt='star' className=" h-2 w-10" /></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </section>
    );
}
