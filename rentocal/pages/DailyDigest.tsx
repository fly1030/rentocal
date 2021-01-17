import { DailyDigestEmailList, monthList } from "components/Utils/Constants";
import { calculateMonthlyCashflow, getApolloClient, getCashOnCash, getPropertiesByDate } from "components/Utils/Utils";
import { GetServerSideProps } from "next";
import { GET_PROPERTIES } from "pages";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const client = getApolloClient();
  const { data } = await client.query({
    query: GET_PROPERTIES
  });
  const properties = data;
  const propertyEntries = properties.properties;
  return { props: { propertyEntries } };
}

type Props = {
  propertyEntries: Array<{[key: string]: any}>,
}

const DailyDigest = (props: Props) => {
  const {propertyEntries} = props;

  useEffect(() => {
    async function sendDailyDigestEmail() {
      const currentDate = new Date();
      const filteredProperties = getPropertiesByDate(propertyEntries, currentDate);
      const propertiesForEmail: Array<{[key: string]: any}> = [];
      filteredProperties.forEach(property => {
        const cashOnCashString = getCashOnCash(
          property.price,
          property.down_percentage,
          property.interest_rate,
          property.closing_cost,
          property.immediate_cost,
          property.vacancy_rate,
          property.monthly_tax,
          property.hoa_fee,
          property.management_rate,
          property.monthly_insurance,
          property.reserve_rate,
          property.capital_exp_rate,
          property.monthly_rent,
        );
        const cashOnCash = Number(cashOnCashString.replace('%', ''));
        if (cashOnCash <= 10) {
          return;
        }

        const monthlyCashFlow = calculateMonthlyCashflow(
          property.price,
          property.down_percentage,
          property.interest_rate,
          property.vacancy_rate,
          property.monthly_tax,
          property.hoa_fee,
          property.management_rate,
          property.monthly_insurance,
          property.reserve_rate,
          property.capital_exp_rate,
          property.monthly_rent,
        );

        const monthString = monthList[currentDate.getMonth()];
        const currentDateString = `${monthString} ${currentDate.getDate()} ${currentDate.getFullYear()}`;
        propertiesForEmail.push({
          address: property.id,
          creationDate: currentDateString,
          cashOnCash,
          monthlyCashFlow,
          link: `https://rentocal.vercel.app/?id=${property.id}`
        });
      });

      if (propertiesForEmail.length == 0) {
        return;
      }

      await fetch("api/send-daily-digest-email", {
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify({
            propertyEntries: propertiesForEmail,
            userEmail: DailyDigestEmailList,
        })
      });
    }
    sendDailyDigestEmail();
  }, []);

  
  return null;
}

export default DailyDigest;