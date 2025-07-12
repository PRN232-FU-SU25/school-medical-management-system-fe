import React, { useCallback } from 'react';
import { Input } from '../ui/input';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { Icons } from '../ui/icons';

export default function TableSearchInput({
  placeholder
}: {
  placeholder?: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = React.useState(country);
  // debounce the search input
  const [debouncedValue] = useDebounce(searchTerm, 1000);
  const handleSettingSearchParams = useCallback((newSearchValue: string) => {
    // Update the URL with the new search value
    if (
      newSearchValue === '' ||
      newSearchValue === undefined ||
      !newSearchValue
    ) {
      searchParams.delete('search');
      setSearchParams(searchParams);
      return;
    }
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: '1', // Spread the existing search params
      search: newSearchValue // Update the search value
    });
  }, []);

  React.useEffect(() => {
    handleSettingSearchParams(debouncedValue);
  }, [debouncedValue, handleSettingSearchParams]);
  return (
    <div className="relative w-full md:max-w-sm">
      <Input
        className="h-10 bg-secondary pl-9 text-sm font-normal text-gray-800 placeholder:font-light placeholder:text-gray-300"
        placeholder={placeholder || `Search country...`}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Icons.search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-800" />
    </div>
  );
}
