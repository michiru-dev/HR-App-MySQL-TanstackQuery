import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Layout from '../../common/UI/Layout'
import LoadingSpinner from '../../common/UI/LoadingSpinner'
import { useQueryOptionsData } from '../../../apiHooks/useQueryOptionsData'
import { queryKeys } from '../../../const/queryKeys'
import { OptionBase } from '../../../redux/slicers/type'
import { ShowSettingList } from './ShowSettingList'

function Setting() {
  const { contract, departments, positions, degree } = queryKeys.options

  const { data: contractData, isLoading: isContractLoading } =
    useQueryOptionsData<OptionBase[]>(contract)

  const { data: depatmentstData, isLoading: isDepartmentsLoading } =
    useQueryOptionsData<OptionBase[]>(departments)

  const { data: degreetData, isLoading: isDegreeLoading } =
    useQueryOptionsData<OptionBase[]>(degree)

  const { data: positonsData, isLoading: isPositonsLoading } =
    useQueryOptionsData<OptionBase[]>(positions)

  return (
    <>
      {isContractLoading ||
        isDepartmentsLoading ||
        isPositonsLoading ||
        (isDegreeLoading && <LoadingSpinner />)}
      <Layout>
        <div className="settingBox">
          <Tabs>
            <TabList>
              <Tab>契約形態</Tab>
              <Tab>部署</Tab>
              <Tab>等級</Tab>
              <Tab>役職</Tab>
            </TabList>

            <TabPanel>
              <ShowSettingList
                settingType={contractData}
                collectionName={'contract'}
              />
            </TabPanel>
            <TabPanel>
              <ShowSettingList
                settingType={depatmentstData}
                collectionName={'departments'}
              />
            </TabPanel>
            <TabPanel>
              <ShowSettingList
                settingType={degreetData}
                collectionName={'degree'}
              />
            </TabPanel>
            <TabPanel>
              <ShowSettingList
                settingType={positonsData}
                collectionName={'positions'}
              />
            </TabPanel>
          </Tabs>
        </div>
      </Layout>
    </>
  )
}

export default Setting
