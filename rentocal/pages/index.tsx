import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import App from "pages/App";
import React from "react";
import { RecoilRoot } from "recoil";

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const client = new ApolloClient({
    uri: 'https://rentocal-dfc8c.wm.r.appspot.com',
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
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
        }
      }
    `
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
  return (
    <RecoilRoot>
      <App propertyEntries={propertyEntries}/>
    </RecoilRoot>
  );
}

export default Home;