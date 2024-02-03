import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../req';
import { QUERY_KEYS } from './keys';
import { Car } from '../../types/cars';

export const fetchCars = async (tag?: string) => {
  const url = tag ? `cars?tag=${tag}` : 'cars';
  return await fetcher.get(url).json<Array<Car>>();
};

export const useGetCars = (options?: { tag?: string }) => {
  const tag = options?.tag ?? undefined;

  return useQuery({
    queryKey: [QUERY_KEYS.cars, { tag }],
    queryFn: async () => await fetchCars(tag),
    enabled: !!tag,
  });
};
