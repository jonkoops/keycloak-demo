import type { DependencyList } from "react";
import { useEffect } from "react";

export type PromiseFactoryFn<T> = () => Promise<T>;
export type PromiseResolvedFn<T> = (value: T) => void;

export function usePromise<T>(
  factory: PromiseFactoryFn<T>,
  callback: PromiseResolvedFn<T>,
  deps: DependencyList = [],
) {
  useEffect(() => {
    async function handlePromise() {
      callback(await factory())
    }

    handlePromise();
  }, deps);
}