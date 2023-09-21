import { useQueryClient, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { getTokenInfo } from '../utils'

export function useAddOptions(queryKeyString: string) {
  const queryClient = useQueryClient()
  const updateFunc = async (newItem: string) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .post(`/${queryKeyString}/post`, { newItem }, { headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }
  return useMutation(updateFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeyString])
    },
  })
}
