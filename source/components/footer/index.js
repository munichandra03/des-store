import React from "react";
import { LcsLink } from "@/widgets/LcsLink";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#052241] light:bg-gray-800 pt-4 pb-4 xl:pt-8 text-white">
        <div className="grid lg:grid-cols-3 md:grid-cols-1 lg:grid-rows-1 md:gap-4 max-w-screen-lg xl:max-w-screen-xl mx-auto text-center">
          <div className="footer-left lg:col-span-1 col-span-12 text-center md:text-left">
            <h2 className="text-gray-500 text-lg uppercase mb-4 font-semibold">
              DES - STOREFRONT
            </h2>
            <div className="my-3 text-sm">
              <p>Ecommerce</p>
              <p>087 285 9401</p>
            </div>
          </div>
          <div className="footer-right lg:col-span-2 md:col-span-2 col-span-12">
            <ul className="text-lg font-light pb-2 flex">
              <li className="w-1/2 md:w-1/3 lg:w-1/3 ">
                <div className="text-left text-sm ">
                  <h2 className="text-gray-500 light:text-gray-200 text-md uppercase mb-4 font-semibold">
                    Components
                  </h2>
                  <ul>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink
                        href="/elements"
                        content="Elements"
                        type="SOFT"
                      />
                    </li>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink href="/Forms" content="Forms" type="SOFT" />
                    </li>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink
                        href="/commerces"
                        content="Commerces"
                        type="SOFT"
                      />
                    </li>
                  </ul>
                </div>
              </li>
              <li className="w-1/2 md:w-1/3 lg:w-1/3 ">
                <div className="text-left text-sm ">
                  <h2 className="text-gray-500 light:text-gray-200 text-md uppercase mb-4 font-semibold">
                    Contacts
                  </h2>
                  <ul>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink href="/policies" content="GITHUB" type="HARD" />
                    </li>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink
                        href="/facebook"
                        content="Facebook"
                        type="SOFT"
                      />
                    </li>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink href="/twitter" content="Twitter" type="SOFT" />
                    </li>
                  </ul>
                </div>
              </li>
              <li className="w-1/2 md:w-1/3 lg:w-1/3 ">
                <div className="text-left text-sm">
                  <h2 className="text-gray-500 light:text-gray-200 text-md uppercase mb-4 font-semibold">
                    Customization
                  </h2>
                  <ul>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink
                        href="/settings"
                        content="Settings"
                        type="SOFT"
                      />
                    </li>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink href="/themes" content="Themes" type="SOFT" />
                    </li>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <LcsLink href="/plugins" content="Plugins" type="SOFT" />
                    </li>
                  </ul>
                </div>
              </li>
              <li className="w-1/2 md:w-1/3 lg:w-1/3 ">
                <div className="text-center text-sm">
                  <h2 className="text-gray-500 light:text-gray-200 text-md uppercase mb-4 font-semibold">
                    Follow Us
                  </h2>
                  <ul>
                    <li className="mb-4 hover:text-gray-800 light:hover:text-white transition-colors duration-200">
                      <button className="bg-blue-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                        <svg className="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                      </button>
                      <button className="bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                        <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                          <g><path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path></g>
                        </svg>
                      </button>
                    </li>
                     
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="invisible md:visible max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="">
            <form className="hidden">
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Subscribe'
                  className="rounded-lg border-spacing-1 flex-1 appearance-none border border-gray-300 w-full py-2 px-8 ml-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-slate-600 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
                style={{ background: "#525252" }}
              >
                Subscribe
              </button>
            </form>
            <div className="text-left pt-10 sm:pt-12 font-light text-sm flex">
              © 2022
              <LcsLink
                href="https://logixal.com"
                content="Logixal,"
                type="SOFT"
                classes="mx-1"
              />
              All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
