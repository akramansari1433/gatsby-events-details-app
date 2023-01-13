import React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import "../styles/global.css";
import Layout from "../components/Layout";
import EventList from "./events";

const IndexPage: React.FC<PageProps> = () => {
    return <EventList />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
