import React from "react";
import { useSession, signIn } from "next-auth/react";
import { LcsLink } from "@/widgets/LcsLink";

const index = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="md:container md:mx-auto px-5 mt-24 mb-24">
        <h1 className="font-semibold text-xl px-4 text-center">
          Sign in your Account{" "}
          <button className="bg-blue" onClick={() => signIn()}>
            Click here..
          </button>
        </h1>
      </div>
    );
  }
  return (
    <div className="md:container md:mx-auto px-5">
      <h1 className="font-semibold text-xl px-4">Your Account</h1>
      <div className="relative rounded-xl overflow-auto px-4 py-4">
        <div className="grid grid-cols-3 grid-rows-3 gap-4 text-gray-500 text-sm font-bold leading-6 rounded-lg text-center">
          <div className="border border-gray-400 rounded ">
            <LcsLink href="/orders" content="Your Orders" type="SOFT" />
          </div>
          <div className="border border-gray-400 rounded ">
            <LcsLink href="/security" content="Login & security" type="SOFT" />
          </div>
          <div className="border border-gray-400 rounded ">
            <LcsLink href="/security" content="Your Addresses" type="SOFT" />
          </div>
          <div className="border border-gray-400 rounded ">
            <LcsLink
              href="/paymentoptions"
              content="Payment options"
              type="SOFT"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
