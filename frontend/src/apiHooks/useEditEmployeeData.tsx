import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../const/queryKeys'
import { getTokenInfo } from '../utils'
import { axiosInstance } from '../axios'

function useEditEmployeeData() {
  const queryClient = useQueryClient()
  const queryKey = [queryKeys.employee.all]
  const editFunc = async (searchKeyword: string) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .put(`/employees/search?keyword=${searchKeyword}`, { headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }

  return useMutation(editFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}

export default useEditEmployeeData
