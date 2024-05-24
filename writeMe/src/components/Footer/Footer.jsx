import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo.jsx";

function Footer() {
  return (
    <section style={{backgroundColor:"#7AB2B2"}} className="overflow-hidden py-10 border border-t-2 border-t-black w-full">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6">
            <div className="flex h-full flex-row items-center justify-between">
              <div className="inline-flex items-center">
                <Logo width="50px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by WriteMe.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Footer;
