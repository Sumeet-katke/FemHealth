// Features.jsx

import React from "react";
import FeatureCard from "./FeatureCard";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1745305465333.json";
import styles from "../CSS/Features.module.css";

// Framer Motion
import { motion } from "framer-motion";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const features = [
  {
    title: "Predict",
    description:
      "Worried about PCOS? Facing similar effects and symptoms? Take our PCOS Prediction test and clarify your doubts",
    features: ["AI prediction", "95%+ accuracy", "Data secure", "Doctor reviewed"],
  },
  {
    title: "Detect",
    description:
      "Upload test scans for deeper insights. Our AI detection helps analyze ovaries effectively.",
    features: ["Scan analysis", "Fast detection", "Reports", "Clinically tuned"],
  },
  {
    title: "Support",
    description:
      "Post PCOS mental health and hormonal balance tracking with our support tools.",
    features: ["Mood tracking", "AI assistant", "Period insights", "Therapy guide"],
  },
];

const Features = () => {
  return (
    <section id="features">
      <motion.div
        className={styles.section}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className={styles.heading}>Features</h1>
        <div className={styles.contentWrapper}>
          <motion.div
            className={styles.lottieContainer}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Lottie animationData={animationData} loop={true} />
          </motion.div>

          <motion.div
            className={styles.swiperWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={2}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
              }}
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <FeatureCard
                      title={feature.title}
                      description={feature.description}
                      features={feature.features}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;