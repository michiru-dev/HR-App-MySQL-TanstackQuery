import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { convertNumber, getTokenInfo } from '../utils'
import { axiosInstance } from '../axios'
import { queryKeys } from '../const/queryKeys'
import { EmployeeBase } from '../types/type'

function useQuerySearchedEmployeeData(
  searchKeyword: string,
  options?: UseQueryOptions<unknown, unknown, undefined | EmployeeBase[]>
) {
  const queryKey = queryKeys.searchEmployee(searchKeyword)
  //queryFnの場合は基本引数は渡さない！
  const queryFn = async () => {
    const { headers } = getTokenInfo()
    const employeeArr = await axiosInstance
      .get(`/employees/search?keyword=${searchKeyword}`, { headers })
      .then((res) => {
        return convertNumber(res)
      })
      .catch((err) => {
        console.log(err)
        return undefined
      })
    return employeeArr
  }

  return useQuery({ queryKey, queryFn, ...options })
}

export default useQuerySearchedEmployeeData
