import { ShowOptions } from '../ShowOptions'
import { EmployeeWithoutId, OptionBase } from '../../../../redux/slicers/type'
import { queryKeys } from '../../../../const/queryKeys'
import { useQueryOptionsData } from '../../../../apiHooks/useQueryOptionsData'

export function DepartmentOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutId>>
  value: string
}) {
  const { departments } = queryKeys.options
  const { data: departmentsData } =
    useQueryOptionsData<OptionBase[]>(departments)
  return (
    <ShowOptions
      labelName={'部　　署'}
      id={'department_id'}
      optionItem={departmentsData}
      onChange={onChange}
      value={value}
    />
  )
}
