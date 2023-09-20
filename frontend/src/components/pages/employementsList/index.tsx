import { useState } from 'react'
import { editEmployeeData } from '../../../redux/slicers/employeeDataSlice'
import { useAppDispatch } from '../../../redux/hooks'
import EmployeeInfoList, {
  HandleSaveButtonClick,
} from '../../common/EmployeeInfoList.tsx'
import Layout from '../../common/UI/Layout'
import LoadingSpinner from '../../common/UI/LoadingSpinner'
import { useQueryEmployeeData } from '../../../apiHooks/useQueryEmployeeData'
import useDeleteEmployeeData from '../../../apiHooks/useDeleteEmployeeData'

function EmployeeList() {
  const dispatch = useAppDispatch()
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )

  const { isLoading, data, refetch } = useQueryEmployeeData({
    enabled: true,
  })

  const { mutate: deleteMutate } = useDeleteEmployeeData()

  //編集ボタンが押された時
  const handleEditClick = (index: number) => {
    setEditEmployeeIndex(index)
  }

  //保存ボタンが押された時
  const handleSaveButtonClick: HandleSaveButtonClick = async (
    updatedEmployeeData,
    id
  ) => {
    if (typeof id === 'undefined') return
    await dispatch(editEmployeeData({ updatedEmployeeData, id }))
    // await dispatch(fetchEmployeeData()) //編集して上書きしてきたデータを取得
    await refetch()
    setEditEmployeeIndex(null)
  }

  //閉じるボタンが押された時
  const handleCloseButton = () => {
    setEditEmployeeIndex(null)
  }

  //削除ボタンが押された時
  const handleDeletButton = async (docId: string | undefined) => {
    if (typeof docId === 'undefined') return
    // await dispatch(deleteEmployeeData(docId))
    // await dispatch(fetchEmployeeData()) //古いデータを見た目からもなくす
    deleteMutate(docId)
    // await refetch()
    setEditEmployeeIndex(null)
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Layout>
        <div className="employeeListBox">
          {Array.isArray(data) && (
            <EmployeeInfoList
              employeeData={data}
              handleEditClick={handleEditClick}
              handleSaveButtonClick={handleSaveButtonClick}
              handleCloseButton={handleCloseButton}
              handleDeleteButton={handleDeletButton}
              editEmployeeIndex={editEmployeeIndex}
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export default EmployeeList
