import React from "react";
import HomeWrapper from "./home/HomeWrapper";
import authentication from "@/components/authentication/authentication";
import { useSession } from "next-auth/react";
import API from "@/utils/httputils";
import config from "../config.json";

const index = ({ xp_home }) => {
  const { data: session, status } = useSession();
  if (status == "loading") return;
  if (session) {
    authentication.setLoginToken(
      session.user.token,
      session.user.username,
      session.user.segment,
      session.user.collection,
      session.user.searchEnv,
      session.user.firstName,
      session.user.organization,
      session.user.characterstics
      // result.users.dont_track,
      //data.loginDetails.deployEnv
    );
  } else {
    authentication.clearToken();
    // handle guest user's token

    // useRouter().push("/signin");
  }
  return <>{xp_home && <HomeWrapper xp_home={xp_home} />}</>;
};

export async function getServerSideProps() {
  const res = await API.getXPService(
    config.apiUrlData.homePageStructure.part_url,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjlkYTNkZjc2ZjE4YjNjN2Y4NWE3MjgiLCJmdWxsIjp7Imxhc3ROYW1lIjoid2F0c29uIiwic3Vic2NyaXB0aW9uIjoiIiwiZG9udF90cmFjayI6ZmFsc2UsImxvY2F0aW9uIjoiUHVuZSIsInVzZXJuYW1lIjoiNDk3NmY0NjI5M2JjNzQwZGM4MWM4MDY3Yjk4NzkxNDJhNzYyMjNlMTBkYWVmMDk5ZGY1M2RjYzZhZGIyMDE1ZSIsImRvbnRfdHJhY2tfZGF0ZSI6bnVsbCwiaW50ZXJlc3QiOiIiLCJpc0IyQiI6ZmFsc2UsInVwZGF0ZWREYXRlIjoiMjAyMi0wNi0wNlQwNjo1MToxMS40NDdaIiwicmF3X3VzZXJuYW1lIjoiZW1tYXciLCJkYXRlT2ZCaXJ0aCI6bnVsbCwiYWdlIjo1MSwiZ2VuZGVyIjoiRmVtYWxlIiwic2VnbWVudCI6IiIsInJhd19lbWFpbCI6ImFrc2hhZGEud2FsdW5qQGxvZ2l4YWwuY29tIiwidGVuYW50SWQiOiJEUEYiLCJ1c2VydHlwZSI6IkNVU1RPTUVSIiwib3JnYW5pemF0aW9uIjoic2FjaGluIiwiX2lkIjoiNjI5ZGEzZGY3NmYxOGIzYzdmODVhNzI4IiwiZmlyc3ROYW1lIjoiZW1tYSIsImlzQjJCSFEiOmZhbHNlLCJjaGFyYWN0ZXJzdGljcyI6eyJjdXN0b21lcl9yYW5rIjo1fX0sImlzRXh0ZXJuYWwiOmZhbHNlLCJ0eXBlIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzI2Mzg3NjUsImV4cCI6MTY3NTIzMDc2NX0.F-z-yFRBNaSfalaiG_sAhBlEgkPLguyrQ7iELhTTtiE"
  );
  const xp_home = res.response.data;
  return { props: { xp_home } };
}

export default index;
