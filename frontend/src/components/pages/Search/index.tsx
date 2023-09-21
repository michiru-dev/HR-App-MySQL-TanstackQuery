import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../redux/hooks'
import { editEmployeeData } from '../../../redux/slicers/employeeDataSlice'
import { Button } from '../../common/UI/Button'
import EmployeeInfoList, {
  HandleSaveButtonClick,
} from '../../common/EmployeeInfoList.tsx'
import EmployeeNotFound from './EmployeeNotFound'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDeleteEmployeeData from '../../../apiHooks/useDeleteEmployeeData'
import useQuerySearchedEmployeeData from '../../../apiHooks/useQuerySearchedEmployeeData'

function Search() {
  const [searchInput, setSearchInput] = useState('')
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )

  const dispatch = useAppDispatch()

  //クエリパラメータ取得
  const [searchParams] = useSearchParams()
  const searchedName = searchParams.get('searchedName')

  const { isLoading, data, refetch } = useQuerySearchedEmployeeData(
    searchedName ?? '',
    {
      enabled: false, //レンダリング時の実行をしない
    }
  )

  const { mutateAsync: deleteMutate } = useDeleteEmployeeData()

  //検索インプットの値
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  //クエリパラメーター作成
  const navigate = useNavigate()
  const goToSearchResult = (confirmedSearchInput: string) =>
    navigate({
      pathname: '/home',
      search: `?searchedName=${confirmedSearchInput}`,
    })

  //検索ボタンが押された時
  const handleSearchButtonClick = () => {
    const confirmedSearchInput = searchInput
    goToSearchResult(confirmedSearchInput)
    setSearchInput('')
  }

  //更新がかかった時
  useEffect(() => {
    if (searchedName === null) return
    refetch()
  }, [searchedName, refetch])

  //編集ボタンが押された時
  const handleEditClick = (index: number) => {
    setEditEmployeeIndex(index)
  }

  //保存ボタンが押された時
  const handleSaveButtonClick: HandleSaveButtonClick = async (
    updatedEmployeeData,
    id
  ) => {
    if (typeof id === 'undefined' || searchedName === null) return
    await dispatch(editEmployeeData({ updatedEmployeeData, id }))
    refetch()
    // await dispatch(fetchSearchedEmployee(searchedName)) //編集して上書きしてきたデータを取得
    setEditEmployeeIndex(null)
  }

  //閉じるボタンが押された時
  const handleCloseButton = () => {
    setEditEmployeeIndex(null)
  }

  //削除ボタンが押された時
  const handleDeleteButton = async (docId: string | undefined) => {
    if (typeof docId === 'undefined' || searchedName === null) return
    console.log('1')
    await deleteMutate(docId)
    refetch()
    setEditEmployeeIndex(null)
  }

  return (
    <>
      <div className="searchInputAndButton">
        <input
          value={searchInput}
          type="search"
          onChange={(e) => {
            handleSearchInput(e)
          }}
          placeholder="社員名を入力してください"
          className="searchInput"
        />
        <div className="tooltip">
          漢字またはカタカナで氏名を検索してください
        </div>
        <Button type="button" text={'検索'} onClick={handleSearchButtonClick} />
      </div>
      {searchedName !== null &&
        (isLoading === false && data?.length === 0 ? (
          <EmployeeNotFound />
        ) : (
          <div className="employeeInfoListWrapper">
            <EmployeeInfoList
              employeeData={data ?? []}
              handleEditClick={handleEditClick}
              handleSaveButtonClick={handleSaveButtonClick}
              handleCloseButton={handleCloseButton}
              handleDeleteButton={handleDeleteButton}
              editEmployeeIndex={editEmployeeIndex}
            />
          </div>
        ))}
    </>
  )
}

export { Search }
