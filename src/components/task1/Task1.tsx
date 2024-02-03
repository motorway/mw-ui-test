import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import { QUERY_KEYS } from '../../lib/query/keys';
import { fetchCars } from '../../lib/query/cars';
import { useGetTags } from '../../lib/query/tags';
import { useSearchHandler } from '../../context/SearchContext';

// Please refer to task 1. Realtime search of readme.md
const Task1: React.FC = () => {
  const { setSearchTerm } = useSearchHandler();
  const [searchQuery, setSearchQuery] = React.useState(undefined);

  const prefetchCars = async (tag: string) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.cars, { tag }],
      queryFn: async () => await fetchCars(tag),
    });
  };

  const { isLoading, data: tagsList, error } = useGetTags({ tag: searchQuery });
  console.log({ isLoading, tagsList, error });

  const handleOnSearch = async (q: string) => {
    setSearchQuery(q);
    prefetchCars(q);
  };

  const handleOnSelect = (item: { tag: string }) => setSearchTerm(item.tag);

  const handleOnClear = () => {
    setSearchQuery(undefined);
    setSearchTerm(undefined);
  };

  return (
    <div className="Task1">
      <div style={{ width: 400 }}>
        <ReactSearchAutocomplete
          autoFocus
          items={tagsList}
          resultStringKeyName="tag"
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          onClear={handleOnClear}
          showNoResults={false}
          fuseOptions={{
            keys: ['tag'],
            shouldSort: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            ignoreLocation: true,
            findAllMatches: true,
            minMatchCharLength: 1,
          }}
        />
      </div>
    </div>
  );
};

export default Task1;
