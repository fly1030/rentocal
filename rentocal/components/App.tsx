import Router, { useRouter } from 'next/router';
import { DeleteOutlined, ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Menu, Tooltip } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import HomepageHeader from "components/HomepageHeader";
import PropertySection from "components/PropertySection";
import ReportCreationModal from "components/ReportCreationModal";
import ReportDeletionModal from "components/ReportDeletionModal";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { 
  purchasePriceState, 
  downPercentageState, 
  interestRateState, 
  closingCostState, 
  immediateCostState, 
  vacancyRateState, 
  managementRateState, 
  monthlyReserveState,
  monthlyRentState,
  hoaFeeState,
  monthlyInsuranceState,
  monthlyTaxState,
  capitalExpRateState,
  propertyAddressState,
  bathroomCountState,
  bedroomCountState,
  yearBuiltState,
  uniqueIDState,
} from "recoilAtoms";
import ImportFromURLModal from './ImportFromURLModal';
import { propertiesByCreationTime, sortByCreationTime } from './Utils/Utils';
const {ItemGroup} = Menu;

type Props = {
  propertyEntries: Array<{[key: string]: any}>,
  setNewEntries: () => void,
}

const App = (props: Props) => {
  const setPurchasePrice = useSetRecoilState(purchasePriceState);
  const setDownPercentage = useSetRecoilState(downPercentageState);
  const setInterestRate = useSetRecoilState(interestRateState);
  const setClosingCost = useSetRecoilState(closingCostState);
  const setImmediateCost = useSetRecoilState(immediateCostState);
  const setVacancyRate = useSetRecoilState(vacancyRateState);
  const setManagementRate = useSetRecoilState(managementRateState);
  const setMonthlyReserve = useSetRecoilState(monthlyReserveState);
  const setMonthlyRent = useSetRecoilState(monthlyRentState);
  const setMonthlyTax = useSetRecoilState(monthlyTaxState);
  const setMonthlyInsurance = useSetRecoilState(monthlyInsuranceState);
  const setHoaFee = useSetRecoilState(hoaFeeState);
  const setCapitalExpRate = useSetRecoilState(capitalExpRateState);
  const setPropertyAddress = useSetRecoilState(propertyAddressState);
  const setBedroomCount = useSetRecoilState(bedroomCountState);
  const setBathroomCount = useSetRecoilState(bathroomCountState);
  const setYearBuilt = useSetRecoilState(yearBuiltState);
  const setUniqueID = useSetRecoilState(uniqueIDState);

  const {propertyEntries, setNewEntries} = props;
  const {
    query: { id },
  } = useRouter();

  let tempProperty: {[key: string]: any} | null = null;
  if (propertyEntries.length > 0) {
    tempProperty = propertyEntries[0];
  }
  const [selectedProperty, setSelectedProperty] = useState<string>(id ?? (tempProperty != null ? tempProperty.id : ''));
  const [isCreationModalVisible, setIsCreationModalVisible] = useState<boolean>(false);
  const [isDeletionModalVisible, setIsDeletionModalVisible] = useState<boolean>(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProperty == null) {
      return;
    } 
    const selectedPropertyInfo: Array<{[key: string]: any}> = propertyEntries.filter(info => {
      return info.id == selectedProperty;
    });

    if (selectedPropertyInfo.length < 1) {
      window.location.href = window.location.origin;
    }
    const targetProperty = selectedPropertyInfo[0];
    const {
      id,
      bathroom_count,
      bedroom_count,
      price,
      down_percentage,
      management_rate,
      monthly_rent,
      vacancy_rate,
      immediate_cost,
      reserve_rate,
      closing_cost,
      interest_rate,
      hoa_fee,
      monthly_tax,
      monthly_insurance,
      capital_exp_rate,
      year_built,
      unique_id,
    } = targetProperty;
    setPurchasePrice(price);
    setDownPercentage(down_percentage);
    setInterestRate(interest_rate);
    setClosingCost(closing_cost);
    setImmediateCost(immediate_cost);
    setVacancyRate(vacancy_rate);
    setManagementRate(management_rate);
    setMonthlyReserve(reserve_rate);
    setMonthlyRent(monthly_rent);
    setMonthlyTax(monthly_tax);
    setMonthlyInsurance(monthly_insurance);
    setHoaFee(hoa_fee);
    setCapitalExpRate(capital_exp_rate);
    setPropertyAddress(id);
    setBedroomCount(bedroom_count);
    setBathroomCount(bathroom_count);
    setYearBuilt(year_built);
    setUniqueID(unique_id);
  }, [selectedProperty]);

  const sortedPropertyEntries = propertyEntries.slice().sort(sortByCreationTime);
  const propertyEntiresByCreaitonTime = propertiesByCreationTime(sortedPropertyEntries);

  return (
    <Layout style={{height: 1600}}>
        <HomepageHeader />
        <Layout>
            <Sider width={300} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    onSelect={
                      (menu) => {
                        setSelectedProperty(String(menu.key));
                        Router.push({
                          pathname: '/',
                          query: { id: String(menu.key) }
                      })
                      }
                    }
                > 
                  <div style={{display: 'flex'}}>
                    <Button 
                      style={{width: '80%', marginLeft: 8, marginTop: 20}}
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setIsCreationModalVisible(true)}
                    >
                      Create New Report
                    </Button>
                    <Tooltip title="Import from URL">
                      <Button 
                        style={{width: '10%', marginLeft: 8, marginTop: 20}}
                        type="primary"
                        icon={<ImportOutlined />}
                        onClick={() => {
                          setIsImportModalVisible(true);
                        }}
                      />
                    </Tooltip>
                  </div>
                  <Divider />
                  {
                    Object.keys(propertyEntiresByCreaitonTime).map((date) => {
                      const propertyEntriesOnDate = propertyEntiresByCreaitonTime[date];
                      return (
                        <ItemGroup title={date}>
                          {
                            propertyEntriesOnDate.map((property) => {
                              return (
                                <Menu.Item key={property.id}>
                                  <div style={{display: 'flex'}}>
                                    <div style={{
                                      width: 240,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                    }}>{property.id}</div>
                                    <div 
                                      style={{
                                        marginLeft: 10
                                      }}
                                      onClick = {() => {
                                        setIsDeletionModalVisible(true);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </div>
                                  </div>
                                </Menu.Item>
                              );
                            })
                          }
                        </ItemGroup>
                      );
                    })
                  }
                </Menu>
            </Sider>
            <Content>
                <PropertySection />
            </Content>
        </Layout>
        <ReportCreationModal 
          isCreationModalVisible={isCreationModalVisible}
          setIsCreationModalVisible={setIsCreationModalVisible}
          setSelectedProperty={(value: string) => setSelectedProperty(value)}
          setNewEntries={setNewEntries}
        />
        <ReportDeletionModal 
          isDeletionModalVisible={isDeletionModalVisible}
          setIsDeletionModalVisible={setIsDeletionModalVisible}
          propertyId={selectedProperty}
          setNewEntries={setNewEntries}
          deselectProperty={() => setSelectedProperty(tempProperty?.id ?? '')}
        />
        <ImportFromURLModal
          isImportModalVisible = {isImportModalVisible}
          setIsImportModalVisible = {setIsImportModalVisible}
        />
    </Layout>
  );
}

export default App;