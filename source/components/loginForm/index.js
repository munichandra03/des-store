import { LockClosedIcon } from "@heroicons/react/20/solid";

export default function LoginForm({
  loginFormDetails,
  setloginFormDetails,
  collection,
  setCollection,
  searchEnv,
  setSearchEnv,
  handleSignIn,
}) {
  function handleChange(evt) {
    const value = evt.target.value;
    setloginFormDetails({
      ...loginFormDetails,
      [evt.target.name]: value,
    });
  }

  const handleCollectionChange = (event) => {
    setCollection(event.target.value);
  };

  const handleEnvChange = (event) => {
    setSearchEnv(event.target.value);
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm flex flex-col space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Username"
                onChange={handleChange}
                value={loginFormDetails.username}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={loginFormDetails.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                value={collection}
                onChange={handleCollectionChange}
                className="relative block w-full rounded-b-md border border-gray-300 px-3 
                                    py-2 -mb-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                id="collection"
              >
                <option value="NewCommerceSolr">DES Collection</option>
                <option value="BBBCommerceSolr">BBB Collection</option>
                <option value="PrideCommerceSolr">Pride Collection</option>
                <option value="WineCommerceSolr">Wine Collection</option>
                <option value="DocCommerceSolr">Schaeffler Collection</option>
                <option value="KamanSolr">Kaman Collection</option>
                <option value="KDGCommerceSolr">KDG Collection KIT</option>
                <option value="DPFCommerceSolr">DPF Collection</option>
                <option value="AutoCommerceSolr">ACS Collection</option>
              </select>
            </div>
          </div>
          <div>
            <select
              value={searchEnv}
              onChange={handleEnvChange}
              className="relative block w-full rounded-b-md border border-gray-300 px-3 py-2 
                                -mb-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="searchEnv"
            >
              <option value="nodesearch">Node Search</option>
              <option value="javasearch">Java Search</option>
              <option value="msdessearch">Micro Services DES Search</option>
              <option value="msendecasearch">
                Micro Services Endeca Search
              </option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleSignIn}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
