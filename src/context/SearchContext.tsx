import * as React from 'react';
import invariant from 'tiny-invariant';

interface SearchContextInterface {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = React.createContext({} as SearchContextInterface);

function SearchProvider(props: React.PropsWithChildren<{}>) {
  const { Provider } = SearchContext;
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);

  return <Provider value={{ searchTerm, setSearchTerm }} {...props} />;
}

function useSearchHandler() {
  const context = React.useContext(SearchContext);

  invariant(context, 'useSearchHandler must be used within a SearchProvider');

  return context;
}

export { SearchProvider, useSearchHandler };
