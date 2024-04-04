import React from 'react';
import RatingStars from './RatingStars';
import styles from './styles/Restaurant.module.scss';

const Restaurant = ({ restaurant }) => {
  return (
    <div className={styles.card}>
      <img src={restaurant.image_url} alt={restaurant.name} className={styles.image} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{restaurant.name}</h2>
        <div className={styles.divider}></div>
        <div className={styles.cardFooter}>
          <RatingStars className={styles.risingStars} rate={restaurant.rating} />
          <span className={styles.priceRange}>{restaurant.price}</span>
          <a href={restaurant.url} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>View</a>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
