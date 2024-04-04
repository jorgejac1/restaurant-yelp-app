import React from 'react';
import styles from './styles/Loader.module.scss';

const RestaurantLoadingSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonText} style={{ width: '80%' }}></div>
        <div className={styles.skeletonText} style={{ width: '60%' }}></div>
        <div className={styles.skeletonText} style={{ width: '40%' }}></div>
      </div>
    </div>
  );
};

export default RestaurantLoadingSkeleton;
