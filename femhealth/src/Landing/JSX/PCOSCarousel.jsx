// import styles from '../CSS/PCOSCarousel.module.css';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import styles from '../CSS/PCOSCarousel.module.css';
import nurse from '../../assets/nurse.svg';
import symptoms from '../../assets/nurse.svg';
import treatment from '../../assets/nurse.svg';
import faq from '../../assets/nurse.svg';
// import symptoms from '../../assets/symptoms.svg';
// import treatment from '../../assets/treatment.svg';
// import faq from '../../assets/faq.svg';

const SlideCard = ({ title, description, image }) => (
  <div className={styles.bodySection}>
    <div className={styles.bodyContent}>
      <div className={styles.heading}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
    <div className={styles.imagePlaceholder}>
      <img src={image} alt={`${title} illustration`} />
    </div>
  </div>
);

const PCOSCarousel = () => {
  return (
    <section className={styles.carouselSection} id="pcos-carousel">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className={styles.swiperContainer}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <SlideCard
            title="About PCOS"
            description="Polycystic Ovary Syndrome (PCOS) is a hormonal imbalance that affects 1 in 10 women of reproductive age. It’s a condition where the ovaries produce an abnormal amount of androgens (male hormones), which can interfere with ovulation."
            image={nurse}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <SlideCard
            title="Symptoms"
            description="Common symptoms of PCOS include irregular periods, acne, hair growth in unwanted areas, and difficulty getting pregnant due to lack of ovulation."
            image={symptoms}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <SlideCard
            title="Treatments"
            description="Treatment for PCOS can include lifestyle changes, medications like birth control pills to regulate periods, or fertility treatments if pregnancy is desired."
            image={treatment}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <SlideCard
            title="FAQs"
            description="Have questions about PCOS? We’ve got answers to the most common queries about symptoms, diagnosis, treatment, and living with PCOS."
            image={faq}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default PCOSCarousel;