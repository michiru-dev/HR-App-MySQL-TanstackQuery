import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { getTokenInfo } from '../utils'
import { OptionBase } from '../redux/slicers/type'

export function useQueryOptionsData<T extends OptionBase[]>(
  queryKeyString: string,
  options?: UseQueryOptions<unknown, unknown, undefined | T>
) {
  const queryKey = [queryKeyString]
  const queryFn = async () => {
    const { headers } = getTokenInfo()
    return await axiosInstance
      .get(`/${queryKeyString}`, { headers })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }
  return useQuery({ queryKey, queryFn, ...options })
}
