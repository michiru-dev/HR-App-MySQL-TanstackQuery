import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { EmployeeBase } from '../redux/slicers/type'
import { queryKeys } from '../const/queryKeys'
import { getTokenInfo } from '../utils'
import { axiosInstance } from '../axios'
import { convertNumber } from '../redux/slicers/employeeDataSlice'

export const useQueryEmployeeData = (
  options?: UseQueryOptions<unknown, unknown, undefined | EmployeeBase[]>
) => {
  const queryKey = [queryKeys.employee.all]
  const queryFn = async () => {
    const { headers } = getTokenInfo()
    const employeeArr = await axiosInstance
      .get('/employees', { headers })
      .then((res) => {
        return convertNumber(res)
      })
      .catch((err) => {
        console.log(err)
        return undefined
      })
    return employeeArr
  }

  return {
    ...useQuery({ queryKey, queryFn, ...options }),
    queryKey,
  }
}
