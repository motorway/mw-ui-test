import React from 'react';
import Turnstone from 'turnstone';
import { QueryClient } from '@tanstack/react-query';

import { fetchTags } from '../../lib/query/tags';
import { QUERY_KEYS } from '../../lib/query/keys';
import { fetchCars } from '../../lib/query/cars';
import { useSearchHandler } from '../../context/SearchContext';

import styles from './Task2.module.scss';

const maxItems = 10;

const listbox = {
  data: async (query: string) => await fetchTags(query),
  searchType: 'startswith',
};

// Please refer to task 1. Realtime search of readme.md
const Task1: React.FC = () => {
  const { setSearchTerm } = useSearchHandler();

  const prefetchCars = async (tag: string) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.cars, { tag }],
      queryFn: async () => await fetchCars(tag),
    });
  };

  const handleOnSearch = async (q: string) => await prefetchCars(q);
  const handleOnSelect = (item: string) => setSearchTerm(item);

  return (
    <div className="Task1">
      <div style={{ width: 400 }}>
        <Turnstone
          name="search"
          listbox={listbox}
          maxItems={maxItems}
          onChange={handleOnSearch}
          onSelect={handleOnSelect}
          noItemsMessage="no items found"
          placeholder="Search for vehicles"
          styles={styles}
          matchText
          typeahead
          autoFocus
          listboxIsImmutable
        />
      </div>
    </div>
  );
};

export default Task1;
