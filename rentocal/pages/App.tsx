import { Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import HomepageHeader from "components/HomepageHeader";
import PropertySection from "components/PropertySection";
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

type Props = {
  propertyEntries: Array<{[key: string]: any}>,
}

const App = (props: Props) => {
  console.log('input props: ', props);
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

  const {propertyEntries} = props;
  let tempProperty = null;
  if (propertyEntries.length > 0) {
    tempProperty = propertyEntries[0];
  }
  const [selectedProperty, setSelectedProperty] = useState<string>(tempProperty != null ? tempProperty.id : '');

  useEffect(() => {
    if (selectedProperty == null) {
      return;
    } 
    const selectedPropertyInfo: Array<{[key: string]: any}> = propertyEntries.filter(info => {
      return info.id == selectedProperty;
    });

    if (selectedPropertyInfo.length < 1) {
      throw new Error;
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
                        console.log('key is: ', menu.key);
                        setSelectedProperty(String(menu.key));
                    }
                    }
                >
                    {propertyEntries.map((property) => {
                    return <Menu.Item key={property.id}>{property.id}</Menu.Item>
                    })}
                </Menu>
            </Sider>
            <Content>
                <PropertySection />
            </Content>
        </Layout>
    </Layout>
  );
}

export default App;