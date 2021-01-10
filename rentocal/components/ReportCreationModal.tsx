import { gql, useMutation } from '@apollo/client';
import { Form, Input, InputNumber, Modal, Steps } from 'antd';
const { Step } = Steps;
import React, { ReactNode, useState } from 'react';
import StepButtonGroup from './StepButtonGroup';
import { getApolloClient } from './Utils/Utils';

type Props = {
    isCreationModalVisible: boolean,
    setIsCreationModalVisible: (value: boolean) => void,
    setSelectedProperty: (value: string) => void,
    setNewEntries: () => void,
};

const INFO_STEPS = [
    "Property", 
    "Investment",
    "Rental",
    "Finish",
];

const CREATE_PROERTY = gql`
    mutation CreateProperty(
        $bathroom_count: Int!,
        $bedroom_count: Int!,
        $capital_exp_rate: Float!,
        $closing_cost: Float!,
        $down_percentage: Float!,
        $hoa_fee: Int!,
        $id: String!,
        $immediate_cost: Float!,
        $interest_rate: Float!,
        $management_rate: Float!,
        $monthly_insurance: Float!,
        $monthly_rent: Int!,
        $monthly_tax: Float!,
        $price: Int!,
        $reserve_rate: Float!,
        $unique_id: String!,
        $vacancy_rate: Float!,
        $year_built: String!,
    ) {
        createProperty(
            bathroom_count: $bathroom_count,
            bedroom_count: $bedroom_count,
            capital_exp_rate: $capital_exp_rate,
            closing_cost: $closing_cost,
            down_percentage: $down_percentage,
            hoa_fee: $hoa_fee,
            id: $id,
            immediate_cost: $immediate_cost,
            interest_rate: $interest_rate,
            management_rate: $management_rate,
            monthly_insurance: $monthly_insurance,
            monthly_rent: $monthly_rent,
            monthly_tax: $monthly_tax,
            price: $price,
            reserve_rate: $reserve_rate,
            unique_id: $unique_id,
            vacancy_rate: $vacancy_rate,
            year_built: $year_built,
        ) {
            unique_id
        }
    }
`;

function ReportCreationModal(props: Props) {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [propertyAddress, setPropertyAddress] = useState<string>('');
    const [bedroomCount, setBedroomCount] = useState<number>(0);
    const [bathroomCount, setBathroomCount] = useState<number>(0);
    const [yearBuilt, setYearBuilt] = useState<string>("2021");
    const [purchasePrice, setPurchasePrice] = useState<number>(0);
    const [downPercentage, setDownPercentage] = useState<number>(25);
    const [interestRate, setInterestRate] = useState<number>(3.0);
    const [immediateCost, setImmediateCost] = useState<number>(0);
    const [closingCost, setClosingCost] = useState<number>(1.5);
    const [monthlyRent, setMonthlyRent] = useState<number>(0);
    const [vacancyRate, setVacancyRate] = useState<number>(5);
    const [managementRate, setManagementRate] = useState<number>(6);
    const [repairReserve, setRepairReserve] = useState<number>(5);
    const [monthlyTax, setMonthlyTax] = useState<number>(0);
    const [monthlyInsurance, setMonthlyInsurance] = useState<number>(0);
    const [hoaFee, setHoaFee] = useState<number>(0);
    const [capitalExp, setCapitalExp] = useState<number>(5);
    const {
        isCreationModalVisible, 
        setIsCreationModalVisible, 
        setSelectedProperty,
        setNewEntries,
    } = props;

    const [createProperty] = useMutation(
        CREATE_PROERTY, 
        {
            client: getApolloClient(),
            onCompleted: (data) => {
                setNewEntries();
                // setSelectedProperty(data.createProperty.unique_id);
            },
            onError: ({networkError, graphQLErrors}) => {
                console.log('graphQLErrors: ', graphQLErrors);
                console.log('networkError: ', networkError);
            }
    });

	return (
        <Modal 
            title="Create Report" 
            visible={isCreationModalVisible} 
            onOk={() => {
                const propertyID = propertyAddress.replace(/,/g, '').replace(/ /g, '-');
                createProperty(
                    { variables: 
                        { 
                            bathroom_count: Number(bathroomCount),
                            bedroom_count: Number(bedroomCount),
                            capital_exp_rate: Number(capitalExp),
                            closing_cost: Number(closingCost),
                            down_percentage: Number(downPercentage),
                            hoa_fee: Number(hoaFee),
                            id: propertyID,
                            immediate_cost: Number(immediateCost),
                            interest_rate: Number(interestRate),
                            management_rate: Number(managementRate),
                            monthly_insurance: Number(monthlyInsurance),
                            monthly_rent: Number(monthlyRent),
                            monthly_tax: Number(monthlyTax),
                            price: Number(purchasePrice),
                            reserve_rate: Number(repairReserve),
                            unique_id: propertyID,
                            vacancy_rate: Number(vacancyRate),
                            year_built: yearBuilt,
                        } 
                    }
                );
                setIsCreationModalVisible(false);
            }} 
            onCancel={() => {setIsCreationModalVisible(false)}}
            okButtonProps={{disabled: currentStep < 3}}
        >
            <div>
                <Steps
                    style={{marginBottom: 20}}
                    size="small" 
                    current={currentStep}
                >
                    {
                        INFO_STEPS.map((step, index) => {
                            return <Step key={index} title={step}/>
                        })
                    }
                </Steps>
                {
                    ReportCreationForm({
                            currentStep: currentStep,
                            setPropertyAddress: setPropertyAddress,
                            setBedroomCount: setBedroomCount,
                            setBathroomCount: setBathroomCount,
                            setYearBuilt: setYearBuilt,
                            setPurchasePrice: setPurchasePrice,
                            setDownPercentage: setDownPercentage,
                            setInterestRate: setInterestRate,
                            setClosingCost: setClosingCost,
                            setImmediateCost: setImmediateCost,
                            setMonthlyRent: setMonthlyRent,
                            setVacancyRate: setVacancyRate,
                            setManagementRate: setManagementRate,
                            setRepairReserve: setRepairReserve,
                            setMonthlyTax: setMonthlyTax,
                            setMonthlyInsurance: setMonthlyInsurance,
                            setHoaFee: setHoaFee,
                            setCapitalExp: setCapitalExp,
                            propertyAddress: propertyAddress,
                            bedroomCount: bedroomCount,
                            bathroomCount: bathroomCount,
                            yearBuilt: yearBuilt,
                            purchasePrice: purchasePrice,
                            downPercentage: downPercentage,
                            interestRate: interestRate,
                            closingCost: closingCost,
                            immediateCost: immediateCost,
                            monthlyRent: monthlyRent,
                            vacancyRate: vacancyRate,
                            managementRate: managementRate,
                            repairReserve: repairReserve,
                            monthlyTax: monthlyTax,
                            monthlyInsurance: monthlyInsurance,
                            hoaFee: hoaFee,
                            capitalExp: capitalExp,
                    })
                }
                <StepButtonGroup
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
            </div>
        </Modal>

	)
}

function ReportCreationForm(
    props: {
        currentStep: number,
        setPropertyAddress: (value: string) => void,
        setBedroomCount: (value: number) => void,
        setBathroomCount: (value: number) => void,
        setYearBuilt: (value: string) => void,
        setPurchasePrice: (value: number) => void,
        setDownPercentage: (value: number) => void,
        setInterestRate: (value: number) => void,
        setClosingCost: (value: number) => void,
        setImmediateCost: (value: number) => void,
        setMonthlyRent: (value: number) => void,
        setVacancyRate: (value: number) => void,
        setManagementRate: (value: number) => void,
        setRepairReserve: (value: number) => void,
        setMonthlyTax: (value: number) => void,
        setMonthlyInsurance: (value: number) => void,
        setHoaFee: (value: number) => void,
        setCapitalExp: (value: number) => void,
        propertyAddress: string,
        bedroomCount: number,
        bathroomCount: number,
        yearBuilt: string,
        purchasePrice: number,
        downPercentage: number,
        interestRate: number,
        closingCost: number,
        immediateCost: number,
        monthlyRent: number,
        vacancyRate: number,
        managementRate: number,
        repairReserve: number,
        monthlyTax: number,
        monthlyInsurance: number,
        hoaFee: number,
        capitalExp: number,
    }
): ReactNode {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const {
        currentStep,
        setPropertyAddress,
        setBedroomCount,
        setBathroomCount,
        setYearBuilt,
        setPurchasePrice,
        setDownPercentage,
        setInterestRate,
        setClosingCost,
        setImmediateCost,
        setMonthlyRent,
        setVacancyRate,
        setManagementRate,
        setRepairReserve,
        setMonthlyTax,
        setMonthlyInsurance,
        setHoaFee,
        setCapitalExp,
        downPercentage,
        interestRate,
        closingCost,
        immediateCost,
        purchasePrice,
        propertyAddress,
        bedroomCount,
        bathroomCount,
        yearBuilt,
        monthlyRent,
        vacancyRate,
        managementRate,
        repairReserve,
        monthlyTax,
        monthlyInsurance,
        hoaFee,
        capitalExp,
    } = props;
    switch (currentStep) {
        case 0:
            return (
                <Form 
                    {...layout} 
                    name="property-form" 
                    onValuesChange={({address, beds, bath, yearBuiltValue}) => {
                        if (address != null) {
                            setPropertyAddress(address);
                        }
                        if (beds != null) {
                            setBedroomCount(beds);
                        }
                        if (bath != null) {
                            setBathroomCount(bath);
                        }
                        if (yearBuiltValue != null) {
                            setYearBuilt(yearBuiltValue);
                        }
                    }}
                >
                    <Form.Item 
                        name={'address'} 
                        label="Address" 
                        required={true}
                        initialValue={propertyAddress}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item 
                        name={'beds'} 
                        label="Beds" 
                        required={true}
                        initialValue={bedroomCount}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item 
                        name={'bath'} 
                        label="Bath" 
                        required={true}
                        initialValue={bathroomCount}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item 
                        name={'yearBuiltValue'} 
                        label="Year Built" 
                        required={true}
                        initialValue={yearBuilt}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            );
            case 1:
                return (
                    <Form 
                        {...layout} 
                        name="investment-form" 
                        onValuesChange={({price, downpayment, interest, closingCost, immediateCost}) => {
                            if (price != null) {
                                setPurchasePrice(price);
                            }
                            if (downpayment != null) {
                                setDownPercentage(downpayment);
                            }
                            if (interest != null) {
                                setInterestRate(interest);
                            }
                            if (closingCost != null) {
                                setClosingCost(closingCost);
                            }
                            if (immediateCost != null) {
                                setImmediateCost(immediateCost);
                            }
                        }}
                    >
                        <Form.Item 
                            name={'price'} 
                            label="Purchase Price" 
                            required={true}
                            initialValue={purchasePrice}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'downpayment'} 
                            label="Down %" 
                            required={true}
                            initialValue={downPercentage}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'interest'} 
                            label="Interest Rate %" 
                            required={true}
                            initialValue={interestRate}
                        >
                            <InputNumber style={{width: '100%'}} step={0.125} />
                        </Form.Item>
                        <Form.Item 
                            name={'closingCost'} 
                            label="Closing Cost %" 
                            required={true}
                            initialValue={closingCost}
                        >
                            <InputNumber style={{width: '100%'}} step={0.5} />
                        </Form.Item>
                        <Form.Item 
                            name={'immediateCost'} 
                            label="Immediate Cost" 
                            required={true}
                            initialValue={immediateCost}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                    </Form>
                );
            case 2:
                return (
                    <Form 
                        {...layout} 
                        name="rental-form" 
                        onValuesChange={({
                            rent, 
                            vacancy, 
                            management, 
                            repairReserve, 
                            tax,
                            insurance,
                            hoa,
                            capitalExp,
                        }) => {
                            if (rent != null) {
                                setMonthlyRent(rent);
                            }
                            if (vacancy != null) {
                                setVacancyRate(vacancy);
                            }
                            if (management != null) {
                                setManagementRate(management);
                            }
                            if (repairReserve != null) {
                                setRepairReserve(repairReserve);
                            }
                            if (tax != null) {
                                setMonthlyTax(tax);
                            }
                            if (insurance != null) {
                                setMonthlyInsurance(insurance);
                            }
                            if (hoa != null) {
                                setHoaFee(hoa);
                            }
                            if (capitalExp != null) {
                                setCapitalExp(capitalExp);
                            }
                        }}
                    >
                        <Form.Item 
                            name={'rent'} 
                            label="Rent/Month" 
                            required={true}
                            initialValue={monthlyRent}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'vacancy'} 
                            label="Vacancy %" 
                            required={true}
                            initialValue={vacancyRate}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'management'} 
                            label="Management Cost %" 
                            required={true}
                            initialValue={managementRate}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'repairReserve'} 
                            label="Monthly Repair %" 
                            required={true}
                            initialValue={repairReserve}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'tax'} 
                            label="Monthly Tax" 
                            required={true}
                            initialValue={monthlyTax}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'insurance'} 
                            label="Monthly Insurance" 
                            required={true}
                            initialValue={monthlyInsurance}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'hoa'} 
                            label="Monthly Hoa" 
                            required={true}
                            initialValue={hoaFee}
                        >
                            <InputNumber style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item 
                            name={'capitalExp'} 
                            label="Capital Expenditures %" 
                            required={true}
                            initialValue={capitalExp}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                );
            default:
                null;
    }
}

export default ReportCreationModal