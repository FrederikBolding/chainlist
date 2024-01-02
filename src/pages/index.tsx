import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { ChainList } from "../components/ChainList";
import { Seo } from "../components/SEO";
import { Web3Provider } from "../context/Web3Context";
import { SearchProvider } from "../context/SearchContext";
import { Layout } from "../components/Layout";

const IndexPage = () => (
  <>
    <Seo />
    <Web3Provider>
      <SearchProvider>
        <Layout>
          <ChainList />
        </Layout>
      </SearchProvider>
    </Web3Provider>
  </>
);

export default IndexPage;
