import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { getTokenInfo } from '../utils'

export function useDeleteOptions(queryKeyString: string) {
  const queryClient = useQueryClient()
  const deleteFunc = async (id: string) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .delete(`/${queryKeyString}/delete`, { data: { id }, headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }
  return useMutation(deleteFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeyString])
    },
  })
}
