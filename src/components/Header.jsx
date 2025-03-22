import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import userModel from "../../NodeJS/Model/user.model";

function Header({isLoggedIn,setIsLoggedIn, setSearchTerm}) {
  
  const [hasChannel,setHasChannel] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); //convverts token to boolean (true if exists);
  },[])
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setHasChannel(storedUser?.channel);
  },[])

  const handleSignOut = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate('/');
  }

  const handleSearch = () => {
    if(input.trim()){
      setSearchTerm(input);
      setInput("");
      navigate("/");
    }
  }

  return (
    <>
      <div className="text-[2vw] h-[5vh] px-1 md:px-2 lg:px-3 xl:px-4   md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw] flex items-center mt-[1vh] justify-between">
        {/* for logo and hamburger menu */}
        <div className="flex items-center">
          {/* Menu icon */}
          <div
            className="p-1 md:p-2 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
            onClick={() => setIsMenu(!isMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-2.5 sm:size-3 md:size-4 lg:size-6 xl:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          {/* Youtube Home logo */}
          <a href="/">
            <div className="px-1 py-1.5 sm:px-1.5 md:px-2 sm:py-2 md:py-3 hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="yt-ringo2-svg_yt15"
                viewBox="0 0 93 20"
                focusable="false"
                aria-hidden="true"
                className="w-auto h-[1.2em]"
              >
                <g>
                  <path
                    d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z"
                    fill="#FF0033"
                  ></path>
                  <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path>
                </g>
                <g id="youtube-paths_yt15">
                  <path d="M37.1384 18.8999V13.4399L40.6084 2.09994H38.0184L36.6984 7.24994C36.3984 8.42994 36.1284 9.65994 35.9284 10.7999H35.7684C35.6584 9.79994 35.3384 8.48994 35.0184 7.22994L33.7384 2.09994H31.1484L34.5684 13.4399V18.8999H37.1384Z"></path>
                  <path d="M44.1003 6.29994C41.0703 6.29994 40.0303 8.04994 40.0303 11.8199V13.6099C40.0303 16.9899 40.6803 19.1099 44.0403 19.1099C47.3503 19.1099 48.0603 17.0899 48.0603 13.6099V11.8199C48.0603 8.44994 47.3803 6.29994 44.1003 6.29994ZM45.3903 14.7199C45.3903 16.3599 45.1003 17.3899 44.0503 17.3899C43.0203 17.3899 42.7303 16.3499 42.7303 14.7199V10.6799C42.7303 9.27994 42.9303 8.02994 44.0503 8.02994C45.2303 8.02994 45.3903 9.34994 45.3903 10.6799V14.7199Z"></path>
                  <path d="M52.2713 19.0899C53.7313 19.0899 54.6413 18.4799 55.3913 17.3799H55.5013L55.6113 18.8999H57.6012V6.53994H54.9613V16.4699C54.6812 16.9599 54.0312 17.3199 53.4212 17.3199C52.6512 17.3199 52.4113 16.7099 52.4113 15.6899V6.53994H49.7812V15.8099C49.7812 17.8199 50.3613 19.0899 52.2713 19.0899Z"></path>
                  <path d="M62.8261 18.8999V4.14994H65.8661V2.09994H57.1761V4.14994H60.2161V18.8999H62.8261Z"></path>
                  <path d="M67.8728 19.0899C69.3328 19.0899 70.2428 18.4799 70.9928 17.3799H71.1028L71.2128 18.8999H73.2028V6.53994H70.5628V16.4699C70.2828 16.9599 69.6328 17.3199 69.0228 17.3199C68.2528 17.3199 68.0128 16.7099 68.0128 15.6899V6.53994H65.3828V15.8099C65.3828 17.8199 65.9628 19.0899 67.8728 19.0899Z"></path>
                  <path d="M80.6744 6.26994C79.3944 6.26994 78.4744 6.82994 77.8644 7.73994H77.7344C77.8144 6.53994 77.8744 5.51994 77.8744 4.70994V1.43994H75.3244L75.3144 12.1799L75.3244 18.8999H77.5444L77.7344 17.6999H77.8044C78.3944 18.5099 79.3044 19.0199 80.5144 19.0199C82.5244 19.0199 83.3844 17.2899 83.3844 13.6099V11.6999C83.3844 8.25994 82.9944 6.26994 80.6744 6.26994ZM80.7644 13.6099C80.7644 15.9099 80.4244 17.2799 79.3544 17.2799C78.8544 17.2799 78.1644 17.0399 77.8544 16.5899V9.23994C78.1244 8.53994 78.7244 8.02994 79.3944 8.02994C80.4744 8.02994 80.7644 9.33994 80.7644 11.7299V13.6099Z"></path>
                  <path d="M92.6517 11.4999C92.6517 8.51994 92.3517 6.30994 88.9217 6.30994C85.6917 6.30994 84.9717 8.45994 84.9717 11.6199V13.7899C84.9717 16.8699 85.6317 19.1099 88.8417 19.1099C91.3817 19.1099 92.6917 17.8399 92.5417 15.3799L90.2917 15.2599C90.2617 16.7799 89.9117 17.3999 88.9017 17.3999C87.6317 17.3999 87.5717 16.1899 87.5717 14.3899V13.5499H92.6517V11.4999ZM88.8617 7.96994C90.0817 7.96994 90.1717 9.11994 90.1717 11.0699V12.0799H87.5717V11.0699C87.5717 9.13994 87.6517 7.96994 88.8617 7.96994Z"></path>
                </g>
              </svg>
            </div>
          </a>
        </div>
        {/* Search bar and button */}
        <div className="border-gray-300 border-1 lg:border-2 rounded-full  flex items-center h-fit">
          {/* for search bar */}
          <div className="flex items-center h-[1.5em] md:h-[1.75em] lg:h-[2em] xl:h-[2.25em]">
            {/* Search icon */}
            <div
              className={`pl-[1em] ${
                isFocused ? "block" : "hidden"
              } h-full flex items-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-2 sm:size-2.5 md:size-4 lg:size-5 xl:size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            {/* Search input */}
            <div className="pl-[1em] pr-[0.1em] h-auto flex items-center w-[30vw]">
              <input
                type="text"
                value={input}
                placeholder="Search"
                className="outline-none w-full"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
            {/* Search button */}
            <div
              className="px-[1em] border-l-1 lg:border-l-2  border-gray-300 h-full flex items-center bg-gray-100 rounded-r-full hover:bg-gray-200 hover:cursor-pointer"
              onClick={() => handleSearch()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-2 sm:size-2.5 md:size-4 lg:size-5 xl:size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* for Account management */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center justify-center">
              {hasChannel ? (
                // If user has a channel, shows "Channel" button
                <Link to={`/Channel`}>
                  <button className=" flex items-center text-blue-600 border-[1px] border-gray-200 rounded-full h-[1.75em] md:h-[1.75em] lg:h-[2em] xl:h-[2.25em] pr-[1em] hover:bg-blue-100 hover:cursor-pointer mr-[1em]">
                    <div className="aspect-square h-[1.75em] md:h-[1.75em] lg:h-[2em] xl:h-[2.25em] rounded-[50%] mr-[0.5em] text-white bg-green-300 flex items-center justify-center font-bold ">
                      {user.userName[0]}
                    </div> Channel 
                  </button>
                </Link>
              ) : (
                // If user doesn't have a channel, show "Create Channel" button
                <Link to="/AddChannel">
                  <button className="flex items-center text-blue-600 border-[1px] border-gray-200 rounded-full h-[1.75em] md:h-[1.75em] lg:h-[2em] xl:h-[2.25em] px-[1em] hover:bg-blue-100 hover:cursor-pointer mr-[1em]">
                    + Channel
                  </button>
                </Link>
              )}
              <button
                className="flex items-center text-blue-600 border-[1px] border-gray-200 rounded-full h-[1.75em] md:h-[1.75em] lg:h-[2em] xl:h-[2.25em] px-[1em] hover:bg-blue-100 hover:cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          ) : (
            // Sifn-In
            <Link to="/login">
              <div className="flex items-center text-blue-600 border-[1px] border-gray-200 rounded-full h-[1.75em] md:h-[1.75em] lg:h-[2em] xl:h-[2.25em] px-[1em] hover:bg-blue-100 hover:cursor-pointer">
                {/* User-Icon */}
                <div className="pr-[0.5em]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-auto h-[1.5em] text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <h1>Sign in</h1>
                </div>
              </div>
            </Link>
          )}
        </div>
        {/* overlay for static sidebar */}
        <div
          className={`z-2 bg-black min-w-screen min-h-screen fixed left-0 top-0 opacity-50 ${
            isMenu ? "left-0" : "left-[100%]"
          }`}
          onClick={() => setIsMenu(!isMenu)}
        >
          {/* overlay */}
        </div>
        {/* static sidebar */}
        <div
          className={`z-5 w-[25vw] sm:w-[22vw] md:w-[20vw] lg:w-[15vw] bg-white fixed h-[100vh] top-0 left-0 transition-all duration-300 ${
            isMenu ? "left-0" : "left-[-100%]"
          }`}
        >
          {/* for logo and hamburger menu */}
          <div className="flex mt-0.5 lg:mt-1 pl-1 md:pl-2 lg:pl-3 xl:pl-3.5">
            {/* Menu icon */}
            <div
              className="p-1 md:p-2 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer "
              onClick={() => setIsMenu(!isMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-2.5 sm:size-3 md:size-4 lg:size-6 xl:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {/* Youtube Home logo */}
            <div className="px-1 py-1.5 sm:px-1.5 md:px-2 sm:py-2 md:py-3 hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="yt-ringo2-svg_yt15"
                viewBox="0 0 93 20"
                focusable="false"
                aria-hidden="true"
                className="w-auto h-[1.2em]"
              >
                <g>
                  <path
                    d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z"
                    fill="#FF0033"
                  ></path>
                  <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path>
                </g>
                <g id="youtube-paths_yt15">
                  <path d="M37.1384 18.8999V13.4399L40.6084 2.09994H38.0184L36.6984 7.24994C36.3984 8.42994 36.1284 9.65994 35.9284 10.7999H35.7684C35.6584 9.79994 35.3384 8.48994 35.0184 7.22994L33.7384 2.09994H31.1484L34.5684 13.4399V18.8999H37.1384Z"></path>
                  <path d="M44.1003 6.29994C41.0703 6.29994 40.0303 8.04994 40.0303 11.8199V13.6099C40.0303 16.9899 40.6803 19.1099 44.0403 19.1099C47.3503 19.1099 48.0603 17.0899 48.0603 13.6099V11.8199C48.0603 8.44994 47.3803 6.29994 44.1003 6.29994ZM45.3903 14.7199C45.3903 16.3599 45.1003 17.3899 44.0503 17.3899C43.0203 17.3899 42.7303 16.3499 42.7303 14.7199V10.6799C42.7303 9.27994 42.9303 8.02994 44.0503 8.02994C45.2303 8.02994 45.3903 9.34994 45.3903 10.6799V14.7199Z"></path>
                  <path d="M52.2713 19.0899C53.7313 19.0899 54.6413 18.4799 55.3913 17.3799H55.5013L55.6113 18.8999H57.6012V6.53994H54.9613V16.4699C54.6812 16.9599 54.0312 17.3199 53.4212 17.3199C52.6512 17.3199 52.4113 16.7099 52.4113 15.6899V6.53994H49.7812V15.8099C49.7812 17.8199 50.3613 19.0899 52.2713 19.0899Z"></path>
                  <path d="M62.8261 18.8999V4.14994H65.8661V2.09994H57.1761V4.14994H60.2161V18.8999H62.8261Z"></path>
                  <path d="M67.8728 19.0899C69.3328 19.0899 70.2428 18.4799 70.9928 17.3799H71.1028L71.2128 18.8999H73.2028V6.53994H70.5628V16.4699C70.2828 16.9599 69.6328 17.3199 69.0228 17.3199C68.2528 17.3199 68.0128 16.7099 68.0128 15.6899V6.53994H65.3828V15.8099C65.3828 17.8199 65.9628 19.0899 67.8728 19.0899Z"></path>
                  <path d="M80.6744 6.26994C79.3944 6.26994 78.4744 6.82994 77.8644 7.73994H77.7344C77.8144 6.53994 77.8744 5.51994 77.8744 4.70994V1.43994H75.3244L75.3144 12.1799L75.3244 18.8999H77.5444L77.7344 17.6999H77.8044C78.3944 18.5099 79.3044 19.0199 80.5144 19.0199C82.5244 19.0199 83.3844 17.2899 83.3844 13.6099V11.6999C83.3844 8.25994 82.9944 6.26994 80.6744 6.26994ZM80.7644 13.6099C80.7644 15.9099 80.4244 17.2799 79.3544 17.2799C78.8544 17.2799 78.1644 17.0399 77.8544 16.5899V9.23994C78.1244 8.53994 78.7244 8.02994 79.3944 8.02994C80.4744 8.02994 80.7644 9.33994 80.7644 11.7299V13.6099Z"></path>
                  <path d="M92.6517 11.4999C92.6517 8.51994 92.3517 6.30994 88.9217 6.30994C85.6917 6.30994 84.9717 8.45994 84.9717 11.6199V13.7899C84.9717 16.8699 85.6317 19.1099 88.8417 19.1099C91.3817 19.1099 92.6917 17.8399 92.5417 15.3799L90.2917 15.2599C90.2617 16.7799 89.9117 17.3999 88.9017 17.3999C87.6317 17.3999 87.5717 16.1899 87.5717 14.3899V13.5499H92.6517V11.4999ZM88.8617 7.96994C90.0817 7.96994 90.1717 9.11994 90.1717 11.0699V12.0799H87.5717V11.0699C87.5717 9.13994 87.6517 7.96994 88.8617 7.96994Z"></path>
                </g>
              </svg>
            </div>
          </div>
          {/* scrollable menu area */}
          <div className="h-[95vh] overflow-y-scroll">
            {/* guide section */}
            <div className="flex flex-col w-full p-[0.5em]">
              <a href="/">
                <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                  <div className="mx-1 md:mx-2 xl:mx-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-auto h-[1.2em]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  <div className="pl-1 md:pl-1.5 xl:pl-2">
                    <h2>Home</h2>
                  </div>
                </div>
              </a>

              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em]">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Shorts</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em]">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Subscriptions</h2>
                </div>
              </div>
            </div>
            <div className="border-b-1 border-gray-300 my-1 mx-1"></div>
            <div className="flex flex-col w-full p-[0.5em]">
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>You</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em]">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>History</h2>
                </div>
              </div>
            </div>
            <div className="border-b-1 border-gray-300 my-1 mx-1"></div>
            <div className="flex flex-col w-full p-[0.5em]">
              <div className="w-full flex items-center px-1 md:px-2 xl:px-3 ">
                Sign in to like videos, comment, and subscribe.
              </div>
              <Link to="/login">
                <div className="flex items-center w-fit mx-1 md:mx-2 xl:mx-3 text-blue-600 border-[1px] border-gray-200 rounded-full h-[1.75em] md:h-[1.75em] lg:h-[2em] xl:h-[2.25em] px-[1em] hover:bg-blue-100 hover:cursor-pointer">
                  {/* user Icon */}
                  <div className="pr-[0.5em]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-auto h-[1.5em] text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1>Sign in</h1>
                  </div>
                </div>
              </Link>
            </div>
            <div className="border-b-1 border-gray-300 my-1 mx-1"></div>
            <div className="flex flex-col w-full p-[0.5em]">
              <div className="w-full flex items-center px-1 md:px-2 xl:px-3 font-bold">
                Explore
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="m14 2-1.5.886-5.195 3.07C4.637 7.533 3 10.401 3 13.5c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5V1l-1.5 1-3 2L14 5V2ZM8.068 7.248l4.432-2.62v3.175l2.332-1.555L18.5 3.803V13.5c0 3.866-3.134 7-7 7s-7-3.134-7-7c0-2.568 1.357-4.946 3.568-6.252ZM9 15c0-1.226.693-2.346 1.789-2.894L15 10v5c0 1.657-1.343 3-3 3s-3-1.343-3-3Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Trending</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12 2.5c-.328 0-.653.065-.957.19-.303.126-.579.31-.81.542-.233.232-.417.508-.543.811-.125.304-.19.629-.19.957v1h5V5c0-.328-.065-.653-.19-.957-.126-.303-.31-.579-.542-.81-.232-.233-.508-.417-.811-.543-.304-.125-.629-.19-.957-.19ZM16 5v1h3.5c.828 0 1.5.672 1.5 1.5V18c0 2.21-1.79 4-4 4H7c-2.21 0-4-1.79-4-4V7.5C3 6.672 3.672 6 4.5 6H8V5c0-.525.103-1.045.304-1.53.201-.486.496-.927.868-1.298.371-.372.812-.667 1.297-.868C10.955 1.104 11.475 1 12 1c.525 0 1.045.103 1.53.304.486.202.927.496 1.298.868.372.371.667.812.867 1.297C15.896 3.955 16 4.475 16 5Zm-4 7.5c-.328 0-.653-.065-.957-.19-.303-.126-.579-.31-.81-.542-.233-.232-.417-.508-.543-.811-.125-.304-.19-.629-.19-.957 0-.414-.336-.75-.75-.75S8 9.586 8 10c0 .525.103 1.045.304 1.53.201.486.496.927.868 1.298.371.372.812.667 1.297.867.486.201 1.006.305 1.531.305.525 0 1.045-.104 1.53-.305.486-.2.927-.495 1.298-.867.372-.371.667-.812.867-1.297.201-.486.305-1.006.305-1.531 0-.414-.336-.75-.75-.75s-.75.336-.75.75c0 .328-.065.653-.19.957-.126.303-.31.579-.542.81-.232.233-.508.417-.811.543-.304.125-.629.19-.957.19Zm-7.5-5h15V18c0 1.38-1.12 2.5-2.5 2.5H7c-1.38 0-2.5-1.12-2.5-2.5V7.5Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Shopping</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M19 3c0-.271-.146-.521-.383-.654-.237-.133-.527-.127-.758.014l-9 5.5c-.223.136-.359.379-.359.64v7.901C8.059 16.146 7.546 16 7 16c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3v-7.08l7.5-4.583v6.064c-.441-.255-.954-.401-1.5-.401-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3Zm-1.5 13c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5Zm-9 3c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5Zm9-13.42L10 10.162V8.92l7.5-4.584V5.58Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Music</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="m3.116 5.998 16.79-2.66.157.988-16.79 2.66-.157-.988Zm-1.481.235c-.13-.819.428-1.587 1.247-1.717l16.79-2.659c.819-.13 1.587.429 1.716 1.247l.157.988.234 1.481-1.481.235L6.463 7.999H22v11.5c0 .829-.672 1.5-1.5 1.5h-17c-.828 0-1.5-.671-1.5-1.5V8.539L1.79 7.22l-.156-.987Zm7.698 3.266h-2L9 11.999H6l-1.667-2.5H3.5v10h17v-10h-3.167L19 12h-3l-1.667-2.501h-2L14 12h-3L9.333 9.499Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Movies</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M5.636 5.636c.293-.293.293-.768 0-1.06-.293-.294-.768-.294-1.06 0-.976.974-1.75 2.132-2.277 3.406C1.772 9.256 1.5 10.622 1.5 12c0 1.379.272 2.744.8 4.018.527 1.274 1.3 2.432 2.275 3.407.293.293.768.293 1.061 0 .293-.293.293-.768 0-1.061-.836-.836-1.499-1.828-1.95-2.92C3.232 14.352 3 13.182 3 12s.233-2.352.685-3.444c.452-1.092 1.115-2.084 1.951-2.92Zm2.828 1.768c.293.292.293.767 0 1.06-.464.464-.832 1.016-1.083 1.622C7.129 10.693 7 11.343 7 12c0 .656.13 1.306.38 1.913.252.607.62 1.158 1.084 1.622.293.293.293.768 0 1.06-.292.294-.767.294-1.06 0-.604-.603-1.083-1.32-1.41-2.108C5.669 13.7 5.5 12.853 5.5 12c0-.854.168-1.7.495-2.488.326-.788.805-1.505 1.409-2.108.293-.293.768-.293 1.06 0Zm7.072 0c.292-.293.767-.293 1.06 0C17.816 8.623 18.5 10.276 18.5 12c0 1.724-.685 3.377-1.904 4.596-.293.293-.768.293-1.06 0-.293-.293-.293-.768 0-1.06C16.473 14.597 17 13.325 17 12s-.527-2.598-1.464-3.536c-.293-.293-.293-.768 0-1.06Zm2.828-2.829c.293-.293.768-.293 1.06 0C21.395 6.545 22.5 9.215 22.5 12s-1.106 5.456-3.075 7.425c-.293.293-.768.293-1.061 0-.293-.293-.293-.768 0-1.061C20.052 16.676 21 14.387 21 12s-.948-4.676-2.636-6.364c-.293-.293-.293-.768 0-1.06ZM12 14c1.105 0 2-.895 2-2 0-1.104-.895-2-2-2s-2 .896-2 2c0 1.105.895 2 2 2Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Live</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="m12 7.75-.772-.464-4.186-2.511L2.5 7.803v6.307L12 19.29l9.5-5.181V7.803l-4.542-3.028-4.186 2.511L12 7.75ZM12 6 7.814 3.488c-.497-.298-1.122-.283-1.604.039L1.668 6.555C1.251 6.833 1 7.3 1 7.803v6.307c0 .548.3 1.054.782 1.316l9.5 5.182c.447.244.989.244 1.436 0l9.5-5.182c.482-.262.782-.768.782-1.316V7.803c0-.502-.25-.97-.668-1.248L17.79 3.527c-.482-.322-1.107-.337-1.604-.039L12 6Zm3.5 6.25c0 .69-.56 1.25-1.25 1.25S13 12.94 13 12.25 13.56 11 14.25 11s1.25.56 1.25 1.25ZM7 8c-.414 0-.75.336-.75.75v1.5h-1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.5v1.5c0 .414.336.75.75.75s.75-.336.75-.75v-1.5h1.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.5v-1.5C7.75 8.336 7.414 8 7 8Zm10.75 3c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Gaming</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M2 5.121V3l.94.94.56.56.5.5.94-.94.12-.12L6 3l.94.94.12.12L8 5l.94-.94.12-.12L10 3l.94.94.12.12L12 5l.94-.94.12-.12L14 3l.94.94.12.12L16 5l.94-.94.12-.12L18 3l.94.94.12.12L20 5l.5-.5.56-.56L22 3v16c0 1.105-.895 2-2 2H4c-1.105 0-2-.895-2-2V5.121ZM10.75 19.5h-4.5v-5.25h4.5v5.25Zm1.25 0V13H5v6.5H4c-.276 0-.5-.224-.5-.5V7.65l2.514-2.514.925.925L8 7.12l1.06-1.06.94-.94.94.94L12 7.12l1.06-1.06.94-.94.94.94L16 7.12l1.06-1.06.926-.925L20.5 7.65V19c0 .276-.224.5-.5.5h-8ZM19 9v2H5V9h14Zm-5 4h5v1.5h-5V13Zm5 3h-5v1.5h5V16Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>News</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M6.5 3.5h11V9c0 3.038-2.462 5.5-5.5 5.5S6.5 12.038 6.5 9V3.5ZM5 3.5C5 2.672 5.672 2 6.5 2h11c.828 0 1.5.672 1.5 1.5V4h2c.552 0 1 .448 1 1v3c0 2.493-1.825 4.56-4.212 4.938-1.082 1.588-2.8 2.707-4.788 2.991V17.5h1.5c.828 0 1.5.672 1.5 1.5v3H8v-3c0-.828.672-1.5 1.5-1.5H11v-1.57c-1.987-.285-3.706-1.404-4.788-2.992C3.825 12.56 2 10.493 2 8V5c0-.552.448-1 1-1h2v-.5Zm0 1.75H3.25V8c0 1.508.89 2.808 2.174 3.403C5.15 10.654 5 9.845 5 9V5.25Zm13.576 6.153C19.86 10.808 20.75 9.508 20.75 8V5.25H19V9c0 .844-.15 1.654-.424 2.403ZM9.5 20.5V19h5v1.5h-5Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Sports</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M11.271 2.689a1.5 1.5 0 011.457 0l9 5A1.5 1.5 0 0122.5 9v7a.75.75 0 01-1.5 0v-5.284l-1.5.833V17a.75.75 0 01-.741.75c-1.9.023-3.076.4-3.941.896-.71.407-1.229.895-1.817 1.448-.159.149-.322.302-.496.46a.75.75 0 01-1.046-.034l-.076-.08c-.702-.73-1.303-1.355-2.164-1.832-.875-.485-2.074-.84-3.976-.858A.75.75 0 014.5 17v-5.45l-2.228-1.24a1.5 1.5 0 010-2.622l9-5ZM6 12.383v3.891c1.703.096 2.946.468 3.946 1.022.858.475 1.508 1.07 2.08 1.652.575-.54 1.221-1.13 2.046-1.603.988-.566 2.215-.963 3.928-1.068v-3.894l-5.272 2.928a1.5 1.5 0 01-1.457 0L6 12.383ZM12 4l9 5-9 5-9-5 9-5Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Courses</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M11.58 2.03c.545-.078 1.1-.003 1.606.214.506.218.942.57 1.26 1.02.319.448.508.976.547 1.525.038.55-.075 1.099-.328 1.588-.252.489-.634.899-1.104 1.185-.254.154-.527.27-.81.343v.705l7.18 5.026c.267.187.383.527.284.84-.098.312-.388.524-.715.524H18v3c0 .552-.448 1-1 1h-2v3h-1v-1h-1v1h-1v-1h-1v1h-1v-1H9v1H8v-1H7v1H6v-7H4.5c-.327 0-.617-.212-.715-.524-.099-.313.017-.653.285-.84l7.18-5.026V7.25c0-.414.336-.75.75-.75.275 0 .545-.076.78-.219.235-.143.427-.348.553-.593.126-.244.183-.519.163-.793-.019-.275-.114-.539-.273-.763-.16-.225-.377-.4-.63-.51-.253-.109-.53-.146-.803-.107-.272.038-.53.151-.742.326-.213.174-.373.404-.464.664-.137.391-.564.597-.955.46-.391-.136-.598-.564-.461-.955.182-.52.503-.98.928-1.328.425-.35.939-.575 1.484-.652ZM15 15h1.5v2.5H15V15Zm2.12-1.5H6.88L12 9.915l5.12 3.585ZM7.5 15h6v4.5h-6V15Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Fashion & Beauty</h2>
                </div>
              </div>
              <div className="w-full flex items-center hover:bg-gray-300 hover:cursor-pointer rounded-sm md:rounded-md lg:rounded-lg xl:rounded-xl h-[3em] ">
                <div className="mx-1 md:mx-2 xl:mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    className="w-auto h-[1.2em]"
                  >
                    <path
                      clipRule="evenodd"
                      d="M7.278 4.933C8.675 3.999 10.318 3.5 12 3.5c1.681 0 3.325.499 4.722 1.433 1.398.934 2.488 2.261 3.13 3.814.644 1.553.813 3.262.485 4.911-.328 1.65-1.138 3.164-2.327 4.352-.293.293-.293.768 0 1.061.293.293.768.293 1.061 0 1.399-1.399 2.351-3.18 2.737-5.12.386-1.94.188-3.95-.57-5.778-.756-1.827-2.038-3.389-3.682-4.488C15.91 2.586 13.978 2 12 2c-1.978 0-3.911.586-5.556 1.685-1.644 1.1-2.926 2.66-3.683 4.488-.757 1.827-.955 3.838-.569 5.778.386 1.94 1.338 3.721 2.737 5.12.293.293.768.293 1.06 0 .293-.293.293-.768 0-1.06-1.188-1.19-1.998-2.704-2.326-4.353-.328-1.649-.16-3.358.484-4.91.643-1.554 1.733-2.881 3.13-3.815ZM12 7.5c-.89 0-1.76.264-2.5.758-.74.495-1.317 1.198-1.657 2.02-.341.822-.43 1.727-.257 2.6.174.873.603 1.675 1.232 2.304.293.293.293.768 0 1.06-.293.293-.768.293-1.06 0-.84-.839-1.411-1.908-1.643-3.072-.231-1.163-.112-2.37.342-3.466S7.68 7.67 8.667 7.01C9.653 6.351 10.813 6 12 6c1.187 0 2.347.352 3.333 1.011.987.66 1.756 1.597 2.21 2.693.454 1.096.573 2.303.342 3.466-.232 1.164-.803 2.233-1.642 3.073-.293.293-.768.293-1.061 0-.293-.293-.293-.768 0-1.061.63-.63 1.058-1.431 1.231-2.304.174-.873.085-1.778-.256-2.6-.34-.822-.917-1.525-1.657-2.02-.74-.494-1.61-.758-2.5-.758Zm.875 6.299C13.541 13.474 14 12.79 14 12c0-1.105-.895-2-2-2s-2 .895-2 2c0 .79.459 1.474 1.125 1.799V21c0 .483.392.875.875.875s.875-.392.875-.875v-7.201Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="pl-1 md:pl-1.5 xl:pl-2">
                  <h2>Podcasts</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
