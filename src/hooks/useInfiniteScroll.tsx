import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll<T>(
  fetcher: (page: number) => Promise<T[]>
) {
  // TODO: implement useInfiniteScroll
  const [items, setItems] = useState([] as any);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let lastItemRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetcher(page)
      .then((data) => setItems([...items, ...data]))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    if (lastItemRef.current) {
      let observer = new IntersectionObserver(
        (entry) => {
          if (!loading && entry[0].isIntersecting === true) {
            setPage((pre) => pre + 1);
          }
        },
        { root: null }
      );
      observer.observe(lastItemRef.current);
    }
  }, []);

  return {
    items: items,
    loading: false,
    error: null,
    lastItemRef: lastItemRef
  };
}
