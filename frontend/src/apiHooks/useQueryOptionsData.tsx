import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { getTokenInfo } from '../utils'
import { OptionBase } from '../types/type'

export function useQueryOptionsData<T extends OptionBase[]>(
  queryKeyString: string[],
  options?: UseQueryOptions<unknown, unknown, undefined | T>
) {
  const queryKey = queryKeyString
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
  //queryKeyは配列か文字列。配列にすると['userData', userId]こんな感じで複数のパラメータが表現可能
  return useQuery({ queryKey, queryFn, ...options })
}
