import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { getTokenInfo } from '../utils'
import { queryKeys } from '../const/queryKeys'
import { EmployeeWithoutId } from '../types/type'

function useAddEmployeeData() {
  const queryClient = useQueryClient()
  const queryKey = queryKeys.employee.all
  const updateFunc = async (registerInfo: EmployeeWithoutId) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .post(`/employees/post`, registerInfo, { headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }

  return useMutation(updateFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })
}

export default useAddEmployeeData
