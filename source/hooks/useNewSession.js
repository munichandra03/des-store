import axios from "axios";
import Cookies from "js-cookie";
import { isNullOrUndefined } from "@/utils/index";
import { useSession, signIn, signOut } from "next-auth/react";

const getGuestUser = () => {
  console.log("session", session);
  if (session) {
    console.log("user is logged in");
    return;
  }
  console.log("this is guest user");
  if (typeof window !== "undefined") {
    var navigator_info = window?.navigator;
    var screen_info = window?.screen;
    var uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, "");
    uid += navigator_info.plugins.length;
    uid += screen_info.height || "";
    uid += screen_info.width || "";
    uid += screen_info.pixelDepth || "";
    let data = "stackabuse.com";
    let buff = new Buffer(data);
    let base64data = buff.toString("base64");
    uid += "~~~" + base64data || "";

    console.log(uid);
    let isGuest = localStorage.getItem("guestsess");
    if (isNullOrUndefined(isGuest)) {
      // call nextj/api/jwt
      axios({
        method: "post",
        url: "/api/jwt",
        data: {
          uid,
        },
      })
        .then((res) => {
          console.log("res", res.data);
          // set in localstorage or cookies
          localStorage.setItem("guestsess", res.data.token);
          // Cookies.set("guestsess", res.data.token);
        })
        .catch((error) => {
          console.log("error in axios guest", error);
        });
    }
  }
};

export default getGuestUser;
