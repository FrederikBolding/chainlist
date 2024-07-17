import React from "react";
import { ChainList } from "../components/ChainList";
import { Seo } from "../components/SEO";
import { Layout } from "../components/Layout";

const IndexPage = () => (
  <>
    <Seo />
    <Layout>
      <ChainList />
    </Layout>
  </>
);

export default IndexPage;
