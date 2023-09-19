import { useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { editOption } from '../redux/slicers/optionsSlice'
import { OptionBase } from '../redux/slicers/type'
import { useAddOptions } from '../apiHooks/useAddOptions'
import { useDeleteOptions } from '../apiHooks/useDeleteOptions'

export type collectionNameBase =
  | 'contract'
  | 'departments'
  | 'positions'
  | 'degree'

export type SettingActions = {
  settingType: OptionBase[] | undefined
  collectionName: collectionNameBase
}

//showinputsに繋がるhooks
export const useSettingInputs = ({
  settingType,
  collectionName,
}: SettingActions) => {
  const dispatch = useAppDispatch()
  const [addInput, setAddInput] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editedName, setEditedName] = useState<string>('')
  const { mutate: addMutate, mutateAsync } = useAddOptions(collectionName)
  //非同期にしたい時はmutateAsyncを使う
  const { mutate: deleteMutate } = useDeleteOptions(collectionName)

  //inputの値が変わった時
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddInput(e.target.value)
  }

  //追加を押した時
  const handleAddClick = () => {
    addMutate(addInput)
    setAddInput('')
  }

  //削除を押した時
  const handleDeleteClick = (id: string | undefined) => {
    if (typeof id !== 'undefined') deleteMutate(id)
  }

  //編集クリックされた時
  const handleEditClick = (index: number) => {
    if (typeof settingType === 'undefined') return
    // これらが更新されることによってレンダリングがかかりretrun内のmapが再始動する
    setEditIndex(index)
    setEditedName(settingType[index].name)
  }

  //編集のinputの値が変わった時
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value)
  }

  //保存を押した時
  const handleEditSubmit = (id: string | undefined) => {
    if (typeof id !== 'undefined')
      dispatch(
        editOption({
          id,
          collectionName,
          newName: editedName,
        })
      )
    setEditIndex(null)
  }

  return {
    addInput,
    setAddInput,
    editIndex,
    setEditIndex,
    editedName,
    setEditedName,
    handleAddClick,
    handleDeleteClick,
    handleChangeInput,
    handleEditClick,
    handleEditInputChange,
    handleEditSubmit,
  }
}
