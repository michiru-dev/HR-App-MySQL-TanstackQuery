import { ShowOptions } from '../ShowOptions'
import { useQueryOptionsData } from '../../../../apiHooks/useQueryOptionsData'
import { queryKeys } from '../../../../const/queryKeys'
import { EmployeeWithoutId, OptionBase } from '../../../../types/type'

export function PositionOptions({
  onChange,
  value,
}: {
  onChange: React.Dispatch<React.SetStateAction<EmployeeWithoutId>>
  value: string
}) {
  const { positions } = queryKeys.options
  const { data: positionsData } = useQueryOptionsData<OptionBase[]>(positions)
  return (
    <ShowOptions
      labelName={'役　　職'}
      id={'position_id'}
      optionItem={positionsData}
      onChange={onChange}
      value={value}
    />
  )
}
