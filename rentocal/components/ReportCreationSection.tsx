import { Form, Input, InputNumber, Steps } from 'antd';
const { Step } = Steps;
import React, { ReactNode, useState } from 'react';
import StepButtonGroup from './StepButtonGroup';

type Props = {};

const INFO_STEPS = [
    "Property", 
    "Investment",
    "Rental",
    "Finish",
];

function ReportCreationSection(props: Props) {
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

	return (
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
                        label="beds" 
                        required={true}
                        initialValue={bedroomCount}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item 
                        name={'bath'} 
                        label="bath" 
                        required={true}
                        initialValue={bathroomCount}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item 
                        name={'yearBuiltValue'} 
                        label="year built" 
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
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'downpayment'} 
                            label="Down %" 
                            required={true}
                            initialValue={downPercentage}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'interest'} 
                            label="Interest Rate %" 
                            required={true}
                            initialValue={interestRate}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'closingCost'} 
                            label="Closing Cost %" 
                            required={true}
                            initialValue={closingCost}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'immediateCost'} 
                            label="Immediate Cost" 
                            required={true}
                            initialValue={immediateCost}
                        >
                            <Input />
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
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'vacancy'} 
                            label="Vacancy %" 
                            required={true}
                            initialValue={vacancyRate}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'management'} 
                            label="Management Cost %" 
                            required={true}
                            initialValue={managementRate}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'repairReserve'} 
                            label="Monthly Repair %" 
                            required={true}
                            initialValue={repairReserve}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'tax'} 
                            label="Monthly Tax" 
                            required={true}
                            initialValue={monthlyTax}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'insurance'} 
                            label="Monthly Insurance" 
                            required={true}
                            initialValue={monthlyInsurance}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            name={'hoa'} 
                            label="Monthly Hoa" 
                            required={true}
                            initialValue={hoaFee}
                        >
                            <Input />
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

export default ReportCreationSection