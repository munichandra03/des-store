import React, { useState } from "react";
import PagesLayout from "../../layouts/PagesLayout";
import { Pages } from "@/consts/style.consts";
import { useRouter } from "next/router";
import LoginForm from "../loginForm";
import { signIn } from "next-auth/react";

export default function Signin() {
  const router = useRouter();

  const [loginFormDetails, setloginFormDetails] = React.useState({
    username: "",
    password: "",
  });
  const [collection, setCollection] = React.useState("NewCommerceSolr");
  const [searchEnv, setSearchEnv] = React.useState("nodesearch");

  const [pageState, setPageState] = useState({
    error: "",
    processing: false,
  });

  const datas = {
    header: {
      imgdesc: "Logixal",
      img: "https://media-exp1.licdn.com/dms/image/C4D0BAQG-F1nBF-2gzw/company-logo_200_200/0/1662636224296?e=1672876800&v=beta&t=-qWjfmZWdEk6HI1IWID4FOHZeTNg2FBDc-SUGlhLAOU",
      title: "Sign in to your account",
      desc: "",
      link: {
        text: "",
        link: "/",
      },
    },
    footer: "",
    content: {
      form: {
        name: "signin",
        type: "signin",
        groups: [
          {
            groupname: "login",
            fields: [
              {
                type: "email",
                name: "email",
                label: "Email Address",
              },
              {
                name: "password",
                label: "Password",
                type: "password",
              },
              {
                name: "collection",
                label: "Collection",
                type: "select",
                data: [
                  {
                    name: "DES Collection",
                    value: "NewCommerceSolr",
                  },
                  {
                    name: "BBB Collection",
                    value: "BBBCommerceSolr",
                  },
                  {
                    name: "Pride Collection",
                    value: "PrideCommerceSolr",
                  },
                  {
                    name: "Wine Collection",
                    value: "WineCommerceSolr",
                  },
                  {
                    name: "Schaeffler Collection",
                    value: "DocCommerceSolr",
                  },
                  {
                    name: "Kaman Collection",
                    value: "KamanSolr",
                  },
                  {
                    name: "KDG Collection KIT",
                    value: "KDGCommerceSolr",
                  },
                  {
                    name: "DPF Collection",
                    value: "DPFCommerceSolr",
                  },
                  {
                    name: "ACS Collection",
                    value: "AutoCommerceSolr",
                  },
                ],
              },
              {
                name: "searchenv",
                label: "Search Env",
                type: "select",
                data: [
                  {
                    name: "Node Search",
                    value: "nodesearch",
                  },
                  {
                    name: "Java Search",
                    value: "javasearch",
                  },
                  {
                    name: "Micro Services DES Search",
                    value: "msdessearch",
                  },
                  {
                    name: "Micro Services Endeca Search",
                    value: "msendecasearch",
                  },
                ],
              },
            ],
          },
          {
            groupname: "remember",
            fields: [
              {
                name: "remember-me",
                type: "checkbox",
                label: "Remember me",
              },
              {
                name: "forgot-password",
                type: "link",
                content: "Forgot Password?",
                link: "/forgot-password",
              },
            ],
          },
        ],
        actions: [
          {
            name: "submit",
            value: "Sign in",
            action: "signin",
            icon: "LockClosedIcon",
          },
        ],
        data: [
          {
            name: "DES Collection",
            value: "NewCommerceSolr",
          },
          {
            name: "BBB Collection",
            value: "BBBCommerceSolr",
          },
          {
            name: "Pride Collection",
            value: "PrideCommerceSolr",
          },
          {
            name: "Wine Collection",
            value: "WineCommerceSolr",
          },
          {
            name: "Schaeffler Collection",
            value: "DocCommerceSolr",
          },
          {
            name: "Kaman Collection",
            value: "KamanSolr",
          },
          {
            name: "KDG Collection KIT",
            value: "KDGCommerceSolr",
          },
          {
            name: "DPF Collection",
            value: "DPFCommerceSolr",
          },
          {
            name: "ACS Collection",
            value: "AutoCommerceSolr",
          },
        ],
      },
    },
  };

  //Sign In Api Call
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        username: loginFormDetails.username,
        password: loginFormDetails.password,
        collection: collection,
        nodesearch: searchEnv,
        redirect: false,
      })
        .then((response) => {
          if (response.ok) {
            //Authenticate user response.error
            router.push(`/`);
          } else {
            setPageState((old) => ({ ...old, error: "User not authorize.." }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const simplifyError = (error) => {
    const errorMap = {
      CredentialsSignin: "Invalid username or password",
    };
    return errorMap[error] ?? "Unknow error occurred";
  };

  return (
    <PagesLayout>
      <div>
        {datas.header.img ? (
          <img
            className={Pages.img()}
            src={datas.header.img}
            alt={datas.header.imgdesc}
            width="70"
            height="70"
          />
        ) : (
          ""
        )}
        <h2 className={Pages.title()}>{datas.header.title}</h2>

        {pageState.error !== "" && (
          <h5 className="text-red-600 font-medium text-center mt-4">
            {simplifyError(pageState.error)}
          </h5>
        )}

        <LoginForm
          loginFormDetails={loginFormDetails}
          setloginFormDetails={setloginFormDetails}
          collection={collection}
          setCollection={setCollection}
          searchEnv={searchEnv}
          setSearchEnv={setSearchEnv}
          handleSignIn={handleSignIn}
        />
      </div>
    </PagesLayout>
  );
}
