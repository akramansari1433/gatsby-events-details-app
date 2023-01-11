import React, { useState } from "react";

export default function Modify() {
   const inputArr = [
      {
         fields: [
            {
               type: "text",
               id: 1,
               placeholder: "Key",
               value: "",
            },
            {
               type: "text",
               id: 2,
               value: "",
               placeholder: "Value",
            },
         ],
      },
      {
         fields: [
            {
               type: "text",
               id: 1,
               placeholder: "Key",
               value: "",
            },
            {
               type: "text",
               id: 2,
               value: "",
               placeholder: "Value",
            },
         ],
      },
      {
         fields: [
            {
               type: "text",
               id: 1,
               placeholder: "Key",
               value: "",
            },
            {
               type: "text",
               id: 2,
               value: "",
               placeholder: "Value",
            },
         ],
      },
      {
         fields: [
            {
               type: "text",
               id: 1,
               placeholder: "Key",
               value: "",
            },
            {
               type: "text",
               id: 2,
               value: "",
               placeholder: "Value",
            },
         ],
      },
   ];

   return (
      <div>
         <h2 className="m-1 text-xl">Headers</h2>
         <div className="flex flex-col overflow-auto">
            {inputArr.map((item, i) => (
               <div key={i} className=" flex flex-row">
                  {item.fields.map((field, i) => (
                     <input
                        key={i}
                        className="p-1 m-1 border-2 rounded-md"
                        type={field.type}
                        placeholder={field.placeholder}
                     />
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}
