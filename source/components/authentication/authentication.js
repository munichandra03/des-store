import {
  setItemtoSessionStorage,
  removeItemtoSessionStorage,
  DEFAULT_JWT_COMUI,
  DEFAULT_USERID_COMUI,
  DEFAULT_USERSEG_COMUI,
  DEFAULT_SOLR_COLLECTION,
  DEFAULT_SEARCH_TERM,
  DEFAULT_SEARCH_ENV,
  DEFAULT_USERNAME_COMUI,
  getItemfromSessionStorage,
  DEFAULT_SYS_ENV,
} from "@/utils/storageutils";

const authentication = (() => {
  const isLogin = () => {
    if (getItemfromSessionStorage(DEFAULT_JWT_COMUI)) {
      //if (localStorage.getItem('jwt_descomui')) {
      return true;
    }
    return false;
  };

  const setLoginToken = (
    token,
    user,
    segment,
    collection,
    searchenv,
    firstname,
    organization,
    characteristics,
    dontTrack,
    userB2BObj
    //, deployEnv
  ) => {
    setItemtoSessionStorage(DEFAULT_JWT_COMUI, token);
    setItemtoSessionStorage(DEFAULT_USERID_COMUI, user);
    setItemtoSessionStorage(DEFAULT_USERSEG_COMUI, segment);
    setItemtoSessionStorage(DEFAULT_SOLR_COLLECTION, collection);
    setItemtoSessionStorage(DEFAULT_SEARCH_ENV, searchenv);
    setItemtoSessionStorage(DEFAULT_USERNAME_COMUI, firstname);
    setItemtoSessionStorage("com_user_org", organization);
    try {
      if (characteristics != undefined) {
        setItemtoSessionStorage(
          "com_user_char",
          JSON.stringify(characteristics)
        );
      }
      if (dontTrack != undefined) {
        setItemtoSessionStorage("com_user_dont_track", dontTrack);
      }
      if (userB2BObj != undefined) {
        setItemtoSessionStorage("com_user_b2b", JSON.stringify(userB2BObj));
      }
    } catch (error) {}

    // localStorage.setItem('jwt_descomui', token);
    // localStorage.setItem('com_userid', user);
    // localStorage.setItem('com_user_segment', segment);
    // localStorage.setItem('com_solrcollection', collection);
    // localStorage.setItem('com_search_env', searchenv);
  };

  const clearToken = () => {
    // localStorage.clear();
    removeItemtoSessionStorage(DEFAULT_JWT_COMUI);
    removeItemtoSessionStorage(DEFAULT_USERID_COMUI);
    removeItemtoSessionStorage(DEFAULT_USERSEG_COMUI);
    // removeItemtoSessionStorage(DEFAULT_SOLR_COLLECTION);
    removeItemtoSessionStorage(DEFAULT_SEARCH_TERM);
    removeItemtoSessionStorage(DEFAULT_SEARCH_ENV);
    removeItemtoSessionStorage(DEFAULT_USERNAME_COMUI);
    removeItemtoSessionStorage("appTheme");
    removeItemtoSessionStorage(DEFAULT_SYS_ENV);
    removeItemtoSessionStorage("com_user_org");
    removeItemtoSessionStorage("com_user_char");
    removeItemtoSessionStorage("com_user_dont_track");
    removeItemtoSessionStorage("com_user_b2b");
  };

  return {
    isLogin,
    setLoginToken,
    clearToken,
  };
})();

export default authentication;
