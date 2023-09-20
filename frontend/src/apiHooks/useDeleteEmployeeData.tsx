import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../const/queryKeys'
import { axiosInstance } from '../axios'
import { getTokenInfo } from '../utils'

function useDeleteEmployeeData() {
  const queryClient = useQueryClient()
  const queryKey = [queryKeys.employee.all]
  const deleteFunc = async (id: string) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .delete(`/employees/delete`, { data: { id }, headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }

  return useMutation(deleteFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}

export default useDeleteEmployeeData