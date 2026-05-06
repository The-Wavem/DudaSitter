import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star } from 'lucide-react';
import styles from './Testimonials.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials({ testimonials = [] }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>O que os tutores dizem</h2>
        </div>

        <div className={styles.sliderWrap}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={testimonials.length > 1}
            spaceBetween={24}
            className={styles.swiper}
          >
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className={styles.slide}>
                  <article className={styles.card}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, index) => (
                        <Star key={`${testimonial.id}-${index}`} className={styles.starIcon} aria-hidden="true" />
                      ))}
                    </div>

                    <p className={styles.quote}>&ldquo;{testimonial.text}&rdquo;</p>

                    <div className={styles.author}>
                      <p className={styles.name}>{testimonial.name}</p>
                      <p className={styles.pet}>{testimonial.pet}</p>
                    </div>
                  </article>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className={styles.slide}>
                <article className={styles.card}>
                  <p className={styles.emptyState}>Os depoimentos aparecerão aqui quando forem adicionados.</p>
                </article>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}