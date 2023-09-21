import { EmployeeInfoRegister } from '../../common/EmployeeInforRegister'
import Layout from '../../common/UI/Layout'
import useAddEmployeeData from '../../../apiHooks/useAddEmployeeData'
import { EmployeeWithoutId } from '../../../types/type'

function Register() {
  const { mutate } = useAddEmployeeData()

  const handleRegister = (registerInfo: EmployeeWithoutId) => {
    alert('登録されました')
    mutate(registerInfo)
  }

  return (
    <Layout>
      <div className="registerBox">
        <EmployeeInfoRegister
          buttonText="登録"
          handleButtonClick={handleRegister}
          isClearInput={true}
        />
      </div>
    </Layout>
  )
}

export default Register
