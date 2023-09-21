import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getTokenInfo } from '../utils'
import { axiosInstance } from '../axios'

export function useEditOptions(queryKeyString: string, newName: string) {
  const queryClient = useQueryClient()
  const editFunc = async (id: string) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .put(`/${queryKeyString}/put`, { id, newName }, { headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }
  return useMutation(editFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeyString])
    },
  })
}
