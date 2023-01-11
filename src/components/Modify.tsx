import React, { ChangeEvent, useEffect, useState } from "react";

type THeaderType = {
   key: string;
   value: string;
};

export default function Modify() {
   const emptyHeaderData: THeaderType = {
      key: "",
      value: "",
   };
   const [headers, setHeaders] = useState<THeaderType[]>([
      { key: "", value: "" },
   ]);
   const [showHeaderForm, setShowHeaderForm] = useState<boolean>(false);
   const [showHeaderData, setShowHeaderData] = useState<boolean>(false);

   const keySetter = (e: ChangeEvent<HTMLInputElement>, i: number) => {
      const tempHeader = [...headers];
      tempHeader[i].key = e.target.value;
      setHeaders(tempHeader);
   };

   const valueSetter = (e: ChangeEvent<HTMLInputElement>, i: number) => {
      const tempHeader = [...headers];
      tempHeader[i].value = e.target.value;
      setHeaders(tempHeader);
   };

   const getSavedHeaders = () => {
      const rawHeaderData = localStorage.getItem("headersConfig");
      if (rawHeaderData) {
         const headerConfig = JSON.parse(rawHeaderData);
         headerConfig && setHeaders(headerConfig);
      } else {
         setHeaders([emptyHeaderData]);
      }
   };

   const onSaveHeaders = () => {
      // We need to store the config probably in the DB, temporarly storing it in the localStorage
      localStorage.setItem("headersConfig", JSON.stringify(headers));
   };

   const onCloseHeaders = () => {
      getSavedHeaders();
      setShowHeaderForm(false);
   };

   useEffect(() => {
      getSavedHeaders();
   }, []);

   useEffect(() => {
      const lastHeaderKey = headers[headers.length - 1].key;
      const secondLastHeaderKey = headers[headers.length - 2]?.key;
      if (lastHeaderKey.length !== 0) {
         const tempHeader = [...headers];
         tempHeader.push(emptyHeaderData);
         setHeaders(tempHeader);
      }
      if (secondLastHeaderKey) {
         setShowHeaderData(true);
      }
   }, [headers]);

   return (
      <div>
         <h2 className="m-1 text-xl">Headers</h2>
         <div className="flex flex-col overflow-auto">
            {!showHeaderForm && (
               <button
                  className="w-fit mr-5 bg-violet-600 px-2 py-1 text-white"
                  onClick={() => setShowHeaderForm(true)}
               >
                  Edit
               </button>
            )}
            {showHeaderForm && (
               <>
                  {headers?.map((header, i) => {
                     return (
                        <div className="flex flex-row">
                           <input
                              className="border-2 border-gray-500 mr-5 text-gray-500 p-2"
                              type="text"
                              value={header.key}
                              onChange={(e) => keySetter(e, i)}
                              placeholder="Key"
                           />
                           <input
                              className="border-2 border-gray-500 text-gray-500 p-2"
                              type="text"
                              value={header.value}
                              onChange={(e) => valueSetter(e, i)}
                              placeholder="Value"
                           />
                        </div>
                     );
                  })}
                  <div className="flex flex-row justify-start mt-5">
                     <button
                        className="w-fit mr-5 bg-violet-600 px-2 py-1 text-white"
                        onClick={onSaveHeaders}
                     >
                        Save
                     </button>
                     <button
                        className="w-fit px-2 py-1 border-2"
                        onClick={onCloseHeaders}
                     >
                        Close
                     </button>
                  </div>
               </>
            )}
         </div>

         {/* Style the below table */}
         {showHeaderData && !showHeaderForm && (
            <table className="table-fixed mt-5">
               <thead>
                  <tr>
                     <th>Key</th>
                     <th>Value</th>
                  </tr>
               </thead>
               <tbody>
                  {headers.map((header, i) => (
                     <tr key={i}>
                        <td>{header.key}</td>
                        <td>{header.value}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>
   );
}
