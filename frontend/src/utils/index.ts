import { AxiosResponse } from 'axios'
import { EmployeeBase } from '../types/type'

//token設置
export const getTokenInfo = () => {
  const token = localStorage.getItem('token')
  return { token, headers: { Authorization: `Bearer ${token}` } }
}

//日付が"YYYY-MM-DDTHH:mm:ss.sssZ"この形で返ってくるので
//Tで区切ってその配列の一つ目[0]を返す
export const convertNumber = (res: AxiosResponse<EmployeeBase[]>) => {
  return res.data.map((employee: EmployeeBase) => {
    if (employee.hire_date) {
      employee.hire_date = employee.hire_date.split('T')[0]
    }
    if (employee.birthday) {
      employee.birthday = employee.birthday.split('T')[0]
    }
    return employee
  })
}
