import { gql } from "@apollo/client";
import { getApolloClient } from "components/Utils/Utils";
import { GetServerSideProps } from "next";
import App from "components/App";
import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

const GET_PROPERTIES = gql`
query {
  properties {
    id
    bathroom_count
    bedroom_count
    price
    down_percentage
    management_rate
    monthly_rent
    vacancy_rate
    immediate_cost
    reserve_rate
    closing_cost
    interest_rate
    hoa_fee
    monthly_tax
    monthly_insurance
    capital_exp_rate
    year_built
    unique_id
    creation_time
  }
}
`;

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

const Home = (props: Props) => {
  const {propertyEntries} = props;
  const [newEntries, setNewEntries] = useState<number>(0);
  const [propertyEntriesState, setPropertyEntiresState] = useState<Array<{[key: string]: any}>>(propertyEntries);
 
  useEffect(() => {
    async function getNewProperties() {
      const client = getApolloClient();
      const { data } = await client.query({
        query: GET_PROPERTIES
      });
      const properties = data;
      const propertyEntries = properties.properties;
      setPropertyEntiresState(propertyEntries);
    }
    getNewProperties();
  }, [newEntries]);
  
  return (
    <RecoilRoot>
      <App 
        propertyEntries={propertyEntriesState} 
        setNewEntries={() => {setNewEntries(newEntries + 1)}}
      />
    </RecoilRoot>
  );
}

export default Home;