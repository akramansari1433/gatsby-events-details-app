import React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import "../styles/global.css";


const IndexPage: React.FC<PageProps> = () => {

    return (
        <>
            <Link to="modify">Modify</Link>
            <Link to="events">Events</Link>
        </>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
