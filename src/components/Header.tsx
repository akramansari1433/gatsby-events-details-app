import { Link } from "gatsby";
import React from "react";

export default function Header() {
   return (
      <div>
         <div className="flex items-center justify-center bg-violet-600 shadow-md h-14">
            <Link to="/" className="text-2xl text-white">
               Home
            </Link>
         </div>
      </div>
   );
}
