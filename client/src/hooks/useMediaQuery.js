import { useEffect, useState } from 'react';

const useMediaQuery = query => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(window.matchMedia(query).matches);
    };

    matchMedia.addEventListener('change', handleChange);

    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
