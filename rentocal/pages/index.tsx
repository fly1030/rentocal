import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Menu } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import HomepageHeader from "components/HomepageHeader";
import { GetServerSideProps } from "next";
import React from "react";

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
          rent
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
  console.log('input props: ', props);
  const {propertyEntries} = props;
  return (
    <Layout style={{height: 740}}>
      <HomepageHeader />
      <Layout>
        <Sider width={300} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {propertyEntries.map((property, index) => {
              return <Menu.Item key={index + 1}>{property.id}</Menu.Item>
            })}
          </Menu>
        </Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
}

export default Home;