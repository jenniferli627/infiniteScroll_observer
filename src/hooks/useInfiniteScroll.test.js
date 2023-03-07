import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import useInfiniteScroll from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
  test("should fetch items on mount", async () => {
    const fetcher = jest.fn().mockResolvedValueOnce(["item1", "item2"]);
    const { result } = renderHook(() => useInfiniteScroll(fetcher));

    expect(result.current.loading).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);

    await act(async () => {
      await fetcher();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual(["item1", "item2"]);

    expect(fetcher).toHaveBeenCalledTimes(2);

    expect(result.current.error).toBe(null);
  });

  test("should fetch items on scroll", async () => {
    const fetcher = jest.fn().mockResolvedValueOnce(["item1", "item2"]);
    const { result } = renderHook(() => useInfiniteScroll(fetcher));

    expect(result.current.loading).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);

    await act(async () => {
      await fetcher();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual(["item1", "item2"]);

    expect(fetcher).toHaveBeenCalledTimes(2);

    expect(result.current.error).toBe(null);
  });

  test("should set hasMore to false when there are no more items", async () => {
    const fetcher = jest.fn().mockResolvedValueOnce(["item1", "item2"]);
    const { result } = renderHook(() => useInfiniteScroll(fetcher));

    expect(result.current.loading).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);

    await act(async () => {
      await fetcher();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual(["item1", "item2"]);

    expect(fetcher).toHaveBeenCalledTimes(2);

    expect(result.current.error).toBe(null);
  });

  test("should set error when fetcher throws an error", async () => {
    const error = new Error("Error");
    const fetcher = jest.fn().mockRejectedValueOnce(error);
    const { result } = renderHook(() => useInfiniteScroll(fetcher));

    expect(result.current.loading).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);

    await act(async () => {
      await fetcher();
    });

    expect(result.current.items).toEqual([]);

    expect(fetcher).toHaveBeenCalledTimes(2);

    expect(result.current.error).toBe(error);
  });

  test("should not fetch items when there are no more items", async () => {
    const fetcher = jest.fn().mockResolvedValueOnce(["item1", "item2"]);
    const { result } = renderHook(() => useInfiniteScroll(fetcher));

    expect(result.current.loading).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);

    await act(async () => {
      await fetcher();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual(["item1", "item2"]);

    expect(fetcher).toHaveBeenCalledTimes(2);

    expect(result.current.error).toBe(null);
  });
});
