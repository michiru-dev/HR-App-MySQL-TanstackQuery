import { useState } from 'react'
import { useAddOptions } from '../apiHooks/useMutateOptions'
import { useDeleteOptions } from '../apiHooks/useDeleteOptions'
import { useEditOptions } from '../apiHooks/useEditOptions'
import { OptionBase } from '../types/type'

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
  const [addInput, setAddInput] = useState<string>('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editedName, setEditedName] = useState<string>('')

  const { mutate: addMutate, mutateAsync } = useAddOptions(collectionName)
  //非同期にしたい時はmutateAsyncを使う
  //関数の中でfetchをしてるから、デフォルトで非同期じゃないの？と思うが、
  //そのfetchの関数をuseMutationでラップしてるからシンプルな同期処理になってる
  //そのためmutateAsyncを使う
  //ただ、そもそも同期処理ならなぜ非同期にしてasycawaitで同期に戻すの？と思うが
  //シンプルな同期処理は処理を順番に行うだけで、fetchの結果を待つことはしないから
  //asyncawaitで同期ぽくした「同期ぽい関数」はfetchの結果を待ってから処理が進む
  //なのでシンプルな同期処理と非同期処理をasyncawaitで同期ぽくした処理は厳密には別物！
  const { mutate: deleteMutate } = useDeleteOptions(collectionName)
  const { mutate: editMutate } = useEditOptions(collectionName, editedName)

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
    if (typeof id !== 'undefined') editMutate(id)
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
