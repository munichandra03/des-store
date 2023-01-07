import { useState, useEffect } from "react";
import API from "@/utils/httputils";
import { isNullOrUndefined } from "@/utils/index";

const usePageSignal = (router) => {
  const [history, setHistory] = useState({
    previous: null,
    current: router.asPath,
    oldDate: new Date(),
  });

  const isExternal = router.asPath.indexOf("commingfrom") === -1 ? true : false;

  if (isNullOrUndefined(isExternal)) {
    isExternal = false;
  }

  useEffect(() => {
    setHistory((oldHistory) => ({
      ...oldHistory,
      previous: router.asPath,
      oldDate: new Date(),
    }));
    var seenfor = Math.round(
      (new Date().getTime() - history.oldDate.getTime()) / 1000
    );

    //activate the below code for make it save data
    API.sendPageSignal(
      router.asPath, //pageName,
      history.previous, //previousPage,
      seenfor, //seenfor in seconds,
      isExternal //isExternal
    );
  }, [router]);
};

export default usePageSignal;
