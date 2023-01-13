import { Link } from "gatsby";
import React from "react";

export default function Header() {
   return (
      <div>
         <div className="flex items-center justify-start pl-5 bg-violet-600 shadow-md h-14">
            <Link to="/" className="text-2xl text-white">
               Sync Machine
            </Link>
         </div>
      </div>
   );
}
