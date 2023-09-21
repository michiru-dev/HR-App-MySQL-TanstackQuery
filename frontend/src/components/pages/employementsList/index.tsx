import { useState } from 'react'
import EmployeeInfoList, {
  HandleSaveButtonClick,
} from '../../common/EmployeeInfoList.tsx'
import Layout from '../../common/UI/Layout'
import LoadingSpinner from '../../common/UI/LoadingSpinner'
import { useQueryEmployeeData } from '../../../apiHooks/useQueryEmployeeData'
import useDeleteEmployeeData from '../../../apiHooks/useDeleteEmployeeData'
import { useQueryClient } from '@tanstack/react-query'
import useEditEmployeeData from '../../../apiHooks/useEditEmployeeData'

function EmployeeList() {
  const queryClient = useQueryClient()
  const [editEmployeeIndex, setEditEmployeeIndex] = useState<number | null>(
    null
  )

  //社員一覧
  const { isLoading, data, queryKey } = useQueryEmployeeData({
    enabled: true,
  })

  //削除
  const { mutate: deleteMutate } = useDeleteEmployeeData({
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  const { mutate: editMutate } = useEditEmployeeData({
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

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
    editMutate({ updatedEmployeeData, id })
    setEditEmployeeIndex(null)
  }

  //閉じるボタンが押された時
  const handleCloseButton = () => {
    setEditEmployeeIndex(null)
  }

  //削除ボタンが押された時
  const handleDeletButton = async (docId: string | undefined) => {
    if (typeof docId === 'undefined') return
    deleteMutate(docId)
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
