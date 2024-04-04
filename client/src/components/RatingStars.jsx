import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './styles/RisingStars.module.scss'

const MAX_STARS = 5;

const RatingStars = ({ rate }) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  const emptyStars = MAX_STARS - Math.ceil(rate);

  return (
    <div className={styles.risingStars}>
      {Array.from({ length: fullStars }, (_, i) => <FaStar key={`full-${i}`} color="#ffd700" />)}
      {hasHalfStar && <FaStarHalfAlt key="half" color="#ffd700" />}
      {Array.from({ length: emptyStars }, (_, i) => <FaRegStar key={`empty-${i}`} color="#ffd700" />)}
    </div>
  );
};

export default RatingStars;
