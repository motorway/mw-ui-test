import React from 'react';

import SearchIcon from '../../assets/icons/search.svg?react';
import { useSearchHandler } from '../../context/SearchContext';
import { useGetCars } from '../../lib/query/cars';
import { Car } from '../../types/cars';

import styles from './Task2.module.scss';

// Please refer to task 2. Realtime search results of readme.md
const Task2: React.FC = () => {
  const { searchTerm } = useSearchHandler();
  const { data: cars, error, status, isLoading } = useGetCars({ tag: searchTerm });

  return (
    <div className={styles.task2}>
      <RenderedCarList status={status} cars={cars} error={error} isLoading={isLoading} title={searchTerm} />
    </div>
  );
};

export default Task2;

interface RenderedCarListProps {
  status: string;
  isLoading: boolean;
  error: Error | null;
  cars: Car[];
  title: string;
}

function RenderedCarList(props: RenderedCarListProps) {
  const { status, isLoading, error, cars, title } = props;

  if (status === 'pending') {
    return isLoading ? <Loader /> : <DefaultState />;
  }

  if (status === 'error') return <ErrorState error={error} />;

  if (status === 'success') {
    if (Array.isArray(cars) && cars.length === 0) return <EmptyState />;

    return (
      <>
        <h2 className={styles.title}>{title}</h2>
        <CarList cars={cars} />
      </>
    );
  }
}

function CarList(props: { cars: Car[] }) {
  return (
    <div className={styles.content}>
      {props.cars.map((car) => (
        <img key={car.id} src={`${car.url}.webp`} alt={car.alt_description} loading="lazy" />
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
      <h2 className={styles.title}>Error: {props.error.message}</h2>
    </div>
  );
}
