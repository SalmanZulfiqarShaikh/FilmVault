// components/Slider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Slider = ({ items, renderItem, uniqueKey }) => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${uniqueKey}-next`,
          prevEl: `.${uniqueKey}-prev`,
        }}
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <div
        className={`${uniqueKey}-prev swiper-button-prev !text-yellow-400 !w-10 !h-10 !-left-9 after:!text-3xl after:!font-bold`}
      ></div>
      <div
        className={`${uniqueKey}-next swiper-button-next !text-yellow-400 !w-10 !h-10 !-right-9 after:!text-3xl after:!font-bold`}
      ></div>
    </div>
  );
};

export default Slider;
