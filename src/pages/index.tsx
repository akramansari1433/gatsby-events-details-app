import React, { useState } from "react";
import { HeadFC, PageProps } from "gatsby";
import "../styles/global.css";
import Layout from "../components/Layout";
import EventList from "../components/EventList";
import Modify from "../components/Modify";

const IndexPage: React.FC<PageProps> = () => {
   const [openTab, setOpenTab] = useState(1);
   return (
      <Layout>
         <>
            <div className="flex flex-wrap mx-1">
               <div className="w-full">
                  <ul className="flex flex-row mb-1 pt-3 pb-4 " role="tablist">
                     <li className="mx-2">
                        <a
                           className={
                              "text-md font-semibold px-1 py-3 block" +
                              (openTab === 1
                                 ? "text-black border-b-2 border-violet-600"
                                 : "text-black bg-white")
                           }
                           onClick={(e) => {
                              e.preventDefault();
                              setOpenTab(1);
                           }}
                           data-toggle="tab"
                           href="#link1"
                           role="tablist"
                        >
                           Invocation Log
                        </a>
                     </li>
                     <li className="mx-2">
                        <a
                           className={
                              "text-md font-semibold px-1 py-3 block" +
                              (openTab === 2
                                 ? "text-black border-b-2 border-violet-600"
                                 : "text-black bg-white")
                           }
                           onClick={(e) => {
                              e.preventDefault();
                              setOpenTab(2);
                           }}
                           data-toggle="tab"
                           href="#link2"
                           role="tablist"
                        >
                           Modify
                        </a>
                     </li>
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                     <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                           <div
                              className={openTab === 1 ? "block" : "hidden"}
                              id="link1"
                           >
                              <EventList />
                           </div>
                           <div
                              className={openTab === 2 ? "block" : "hidden"}
                              id="link2"
                           >
                              <Modify />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>
      </Layout>
   );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
