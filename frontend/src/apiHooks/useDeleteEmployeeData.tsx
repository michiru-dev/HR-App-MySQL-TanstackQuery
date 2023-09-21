import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axios'
import { getTokenInfo } from '../utils'

type DeleteEmployeeDataOptions = UseMutationOptions<void, unknown, string>

function useDeleteEmployeeData(options?: DeleteEmployeeDataOptions) {
  const deleteFunc = async (id: string) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .delete(`/employees/delete`, { data: { id }, headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }

  return useMutation(deleteFunc, options)
}

export default useDeleteEmployeeData
