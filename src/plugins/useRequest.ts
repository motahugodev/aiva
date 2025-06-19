import useSWR, { type SWRConfiguration, type SWRResponse } from 'swr';
import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'isLoading'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
  fallbackData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { fallbackData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request,

    () => axios.request<Data>(request!),
    {
      ...config,
      fallbackData:
        fallbackData &&
        ({
          status: 200,
          statusText: 'InitialData',

          config: request!,
          headers: {},
          data: fallbackData,
        } as AxiosResponse<Data>),
    },
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    isLoading,
    mutate,
  };
}
