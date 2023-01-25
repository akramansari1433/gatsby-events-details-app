import React from "react";
import { HeadFC, PageProps } from "gatsby";
import "../styles/global.css";
import EventList from "./events";

const IndexPage: React.FC<PageProps> = () => {
    return <EventList />;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
