import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
  },
  {
    name: "XYZ",
    feedback:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
  },
  {
    name: "ABC",
    feedback:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
  },
  {
    name: "PQR",
    feedback:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
  },
  {
    name: "EFG",
    feedback:
      "I have taken medical services from them. They treat so well and they are providing the best medical services.",
  },
];

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="py-[30px] px-5 rounded-3">
              <div className="flex items-center gap-[13px]">
                <img src={patientAvatar} alt="patient avatar" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <HiStar key={i} className="text-yellowColor w-[10px] h-5" />
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {testimonial.feedback}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
