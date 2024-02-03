import React from 'react';

import { SearchIcon } from '../assets/icons/search-icon';
import { useSearchHandler } from '../../context/SearchContext';
import { useGetCars } from '../../lib/query/cars';
import { Car } from '../../types/cars';

import styles from './Task2.module.scss';

// Please refer to task 2. Realtime search results of readme.md
const Task2: React.FC = () => {
  const { searchTerm } = useSearchHandler();
  const { isLoading, data: cars, error, status } = useGetCars({ tag: searchTerm });

  return (
    <div className={styles.task2}>
      {isLoading ? <Loader /> : null}
      {status === 'pending' ? <DefaultState /> : null}
      {status === 'success' && cars.length === 0 ? <EmptyState /> : null}
      {status === 'error' ? <ErrorState error={error} /> : null}

      {status === 'success' && Array.isArray(cars) && cars.length > 0 && (
        <>
          <h2 className={styles.title}>{searchTerm}</h2>
          <CarList cars={cars} />
        </>
      )}
    </div>
  );
};

export default Task2;

function CarList(props: { cars: Car[] }) {
  return (
    <div className={styles.content}>
      {props.cars.map((car) => (
        <img key={car.id} src={`${car.url}.webp`} alt={car.alt_description} />
      ))}
    </div>
  );
}

function DefaultState() {
  return (
    <div className={styles.defaultState}>
      <SearchIcon />
      <h2 className={styles.title}>
        Use the search to <br /> find vehicles
      </h2>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.defaultState}>
      <h2 className={styles.title}>No cars found</h2>
    </div>
  );
}

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}

function ErrorState(props: { error: Error }) {
  return (
    <div className={styles.defaultState}>
      <h2 className={styles.title}>Error: ${props.error.message}</h2>
    </div>
  );
}
