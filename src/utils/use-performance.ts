// 通用防抖 Hook
import { useState, useEffect, useRef, useCallback } from 'react';

export function useDebouncedValue<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay = 200,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

// rAF 节流：每帧最多执行一次
export function useRafThrottledCallback<T extends (...args: any[]) => any>(callback: T) {
  const rafRef = useRef<number | null>(null);
  const pendingArgsRef = useRef<Parameters<T> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      pendingArgsRef.current = args;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        if (pendingArgsRef.current) {
          callback(...pendingArgsRef.current);
        }
        rafRef.current = null;
      });
    },
    [callback],
  );
}
