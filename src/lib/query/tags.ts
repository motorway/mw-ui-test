import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../req';
import { QUERY_KEYS } from './keys';

export const fetchTags = async (tag?: string) => {
  const url = tag ? `tags?tag=${tag}` : 'tags';
  return await fetcher.get(url).json<Array<string>>();
};

export const useGetTags = (options?: { tag?: string }) => {
  const tag = options?.tag ?? undefined;

  return useQuery({
    queryKey: [QUERY_KEYS.tags, { tag }],
    queryFn: async () => await fetchTags(tag),
    select: (data) => data.map((tag) => ({ tag })),
    enabled: !!tag,
  });
};
