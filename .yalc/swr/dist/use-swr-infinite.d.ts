import { keyType, fetcherFn, ConfigInterface, responseInterface } from './types';
declare type KeyLoader<Data = any> = (index: number, previousPageData: Data | null) => keyType;
declare type SWRInfiniteConfigInterface<Data = any, Error = any> = ConfigInterface<Data[], Error, fetcherFn<Data[]>> & {
    initialSize?: number;
    revalidateAll?: boolean;
    persistSize?: boolean;
};
declare type SWRInfiniteResponseInterface<Data = any, Error = any> = responseInterface<Data[], Error> & {
    size?: number;
    setSize?: (size: number | ((size: number) => number)) => Promise<Data[] | undefined>;
};
declare function useSWRInfinite<Data = any, Error = any>(getKey: KeyLoader<Data>): SWRInfiniteResponseInterface<Data, Error>;
declare function useSWRInfinite<Data = any, Error = any>(getKey: KeyLoader<Data>, config?: SWRInfiniteConfigInterface<Data, Error>): SWRInfiniteResponseInterface<Data, Error>;
declare function useSWRInfinite<Data = any, Error = any>(getKey: KeyLoader<Data>, fn?: fetcherFn<Data>, config?: SWRInfiniteConfigInterface<Data, Error>): SWRInfiniteResponseInterface<Data, Error>;
export { useSWRInfinite, SWRInfiniteConfigInterface, SWRInfiniteResponseInterface };
