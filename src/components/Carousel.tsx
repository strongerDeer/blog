import { useEffect, useState } from 'react';

import styles from './Carousel.module.scss';
export default function Carousel() {
  const [activeImage, setActiveImage] = useState(0);
  const carouselList = [
    {
      image:
        'https://images.unsplash.com/photo-1638757937028-eabad8286d45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1513907562750-05ecfdd6a5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1589918786474-f12f19c101c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    },
  ];

  const changePage = (e: any) => {
    setActiveImage(Number(e.target.value));
  };
  const nextPage = () => {
    if (activeImage < carouselList.length - 1) {
      setActiveImage((prev) => prev + 1);
    } else {
      setActiveImage(0);
    }
  };
  const prevPage = () => {
    if (activeImage > 0) {
      setActiveImage((prev) => prev - 1);
    } else {
      setActiveImage(carouselList.length - 1);
    }
  };
  return (
    <section className={styles.carousel}>
      <div className={styles['carousel__img']}>
        <img src={carouselList[activeImage].image} alt="" />
      </div>
      <ul className={styles['carousel__list']}>
        {carouselList.map((list, index) => (
          <li key={index}>
            <img src={list.image} alt="" />
          </li>
        ))}
      </ul>

      <ul className={styles['carousel__navigation']}>
        {carouselList.map((_, index) => (
          <li key={index}>
            <button
              type="button"
              className={
                activeImage === index
                  ? styles['carousel__navigation--active']
                  : ''
              }
              value={index}
              onClick={changePage}>
              <span className="a11y-hidden">{`page${index + 1}`}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={styles['carousel__control']}>
        <button type="button" onClick={prevPage}>
          Prev
        </button>
        <button type="button" onClick={nextPage}>
          Next
        </button>
      </div>
    </section>
  );
}
