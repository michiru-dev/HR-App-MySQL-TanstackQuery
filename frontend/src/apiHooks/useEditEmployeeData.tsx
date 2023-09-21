import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { getTokenInfo } from '../utils'
import { axiosInstance } from '../axios'
import { EmployeeBase } from '../types/type'
type EditEmployeeParams = {
  updatedEmployeeData: EmployeeBase
  id: string
}

type EditEmployeeDataOptions = UseMutationOptions<
  void,
  unknown,
  EditEmployeeParams
>

function useEditEmployeeData(options?: EditEmployeeDataOptions) {
  //mutateFunc(editFunc)の引数は一つ！
  const editFunc = async ({ updatedEmployeeData, id }: EditEmployeeParams) => {
    const { headers } = getTokenInfo()
    await axiosInstance
      .put(`/employees/put`, { updatedEmployeeData, id }, { headers })
      .catch((err) => {
        console.log(err)
        return undefined
      })
  }

  return useMutation(editFunc, options)
}

export default useEditEmployeeData
