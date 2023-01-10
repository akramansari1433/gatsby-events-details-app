import React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import "../styles/global.css";
import Layout from "../components/Layout";
import EventList from "../components/EventList";

const IndexPage: React.FC<PageProps> = () => {
   return (
      <Layout>
         <EventList />
      </Layout>
   );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
