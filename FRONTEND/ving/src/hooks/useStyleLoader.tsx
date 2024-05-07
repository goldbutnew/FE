import { useEffect, useState } from 'react';

const useStyleLoader = (url) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.onload = () => setIsLoaded(true);

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [url]);

  return isLoaded;
};

export default useStyleLoader;
