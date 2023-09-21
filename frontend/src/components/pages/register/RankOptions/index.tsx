import { ShowOptions } from '../ShowOptions'
import { queryKeys } from '../../../../const/queryKeys'
import { useQueryOptionsData } from '../../../../apiHooks/useQueryOptionsData'
import { EmployeeWithoutId, OptionBase } from '../../../../types/type'

export function RankOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutId>>
  value: string
}) {
  const { degree } = queryKeys.options
  const { data: degreeData } = useQueryOptionsData<OptionBase[]>(degree)
  return (
    <ShowOptions
      labelName={'等　　級'}
      id={'degree_id'}
      optionItem={degreeData}
      onChange={onChange}
      value={value}
    />
  )
}
