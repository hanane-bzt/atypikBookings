var _a;
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { useLocation, Link, Outlet, Navigate, useParams, Routes, Route } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import jwt_decode from "jwt-decode";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Avatar as Avatar$1, AvatarImage as AvatarImage$1 } from "@radix-ui/react-avatar";
import { Helmet } from "react-helmet";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { X, PenSquare, Upload, Loader2, Text, Mail, LogOut, ChevronRight, ChevronLeft, Calendar as Calendar$1 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import { differenceInCalendarDays, format, addDays, differenceInDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
const Logo = "/assets/Logo_AtypikHouse-DIBUtg9f.png";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});
const initialState$1 = {
  user: null,
  register: () => {
  },
  login: () => {
  },
  googleLogin: () => {
  },
  logout: () => {
  },
  loading: true
};
const UserContext = createContext(initialState$1);
const UserProvider = ({ children }) => {
  const auth = useProvideAuth();
  return /* @__PURE__ */ jsx(UserContext.Provider, { value: auth, children });
};
const isBrowser$1 = typeof window !== "undefined";
const initialState = {
  places: isBrowser$1 ? ((_a = window.__INITIAL_DATA__) == null ? void 0 : _a.places) ?? [] : [],
  loading: false,
  setPlaces: () => {
  },
  setLoading: () => {
  }
};
const PlaceContext = createContext(initialState);
const PlaceProvider = ({ children }) => {
  const allPlaces = useProvidePlaces(initialState.places);
  return /* @__PURE__ */ jsx(PlaceContext.Provider, { value: allPlaces, children });
};
const setItemsInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Cannot store in LS");
  }
  const valueToStore = typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};
const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error(`Cannot get value from LS`);
  }
  return localStorage.getItem(key);
};
const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error(`Cannot remove item from LS`);
  }
  localStorage.removeItem(key);
};
const useAuth = () => useContext(UserContext);
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = getItemFromLocalStorage("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const saveSession = ({ user: user2, token }) => {
    setUser(user2);
    setItemsInLocalStorage("user", user2);
    setItemsInLocalStorage("token", token);
  };
  const register = async ({ name, email, password }) => {
    var _a2, _b;
    try {
      const { data } = await axiosInstance.post("/user/register", {
        name,
        email,
        password
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: "Inscription réussie" };
    } catch (err) {
      return {
        success: false,
        message: ((_b = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || "Erreur serveur"
      };
    }
  };
  const login = async ({ email, password }) => {
    var _a2, _b;
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: "Connexion réussie" };
    } catch (err) {
      return {
        success: false,
        message: ((_b = (_a2 = err == null ? void 0 : err.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.message) || "Erreur serveur"
      };
    }
  };
  const googleLogin = async (credential) => {
    const decoded = jwt_decode(credential);
    try {
      const { data } = await axiosInstance.post("/user/google/login", {
        name: `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: "Connexion Google réussie" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };
  const logout = async () => {
    try {
      await axiosInstance.get("/user/logout");
    } catch {
    } finally {
      setUser(null);
      removeItemFromLocalStorage("user");
      removeItemFromLocalStorage("token");
      return { success: true, message: "Déconnexion réussie" };
    }
  };
  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      const { data } = await axiosInstance.post("/user/upload-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const updateUser = async ({ name, password, picture }) => {
    const email = JSON.parse(getItemFromLocalStorage("user") || "{}").email;
    try {
      const { data } = await axiosInstance.put("/user/update-user", {
        name,
        password,
        email,
        picture
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  return {
    user,
    setUser,
    register,
    login,
    googleLogin,
    logout,
    loading,
    uploadPicture,
    updateUser
  };
};
const usePlaces = () => useContext(PlaceContext);
const useProvidePlaces = (prefetched = []) => {
  const [places, setPlaces] = useState(prefetched);
  const [loading, setLoading] = useState(prefetched.length === 0);
  useEffect(() => {
    if (prefetched.length > 0) return;
    const fetchPlaces = async () => {
      try {
        const { data } = await axiosInstance.get("/api/places");
        setPlaces(data.places);
      } catch (err) {
        console.error("Erreur chargement places :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [prefetched.length]);
  return { places, setPlaces, loading, setLoading };
};
const SearchBar = () => {
  const Places = usePlaces();
  const { setPlaces, setLoading } = Places;
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleSearch = async (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    if (searchText.trimStart() !== "") {
      setLoading(true);
      setSearchTimeout(
        setTimeout(async () => {
          const { data } = await axiosInstance.get(
            `/places/search/${searchText.trimStart()}`
          );
          setPlaces(data);
          setLoading(false);
        }, 500)
      );
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex w-4/6 overflow-hidden rounded-full border border-gray-400 bg-gray-300 shadow-sm hover:shadow-lg md:w-1/2", children: [
    /* @__PURE__ */ jsx("div", { className: "grow", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "search",
        placeholder: "Where do you want to go?",
        className: "h-full w-full border-none px-4 py-2 text-sm  focus:outline-none md:text-lg",
        onChange: (e) => handleSearch(e),
        value: searchText
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "bg-blue flex cursor-pointer  items-center bg-primary text-white", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "flex rounded-r-full bg-primary px-4 py-2 md:p-2",
        onClick: handleSearch,
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 3,
              stroke: "currentColor",
              className: "mt-1 h-4 w-4",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-1 hidden md:block", children: "Search" })
        ]
      }
    ) })
  ] }) });
};
const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const { user } = auth;
  const handleScroll = () => {
    const shouldHaveShadow = window.scrollY > 0;
    setHasShadow(shouldHaveShadow);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (location.pathname === "/") {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `fixed top-0 z-10 flex w-screen justify-center bg-white py-4 ${hasShadow ? "shadow-md" : ""}`,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex ${showSearchBar ? "justify-around" : "justify-between px-10"} w-screen max-w-screen-xl`,
            children: [
              /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center gap-1", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "h-12 w-24 md:h-16 md:w-32",
                  src: Logo,
                  alt: "AtypikHouse Logo"
                }
              ) }),
              showSearchBar && /* @__PURE__ */ jsx(SearchBar, {}),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: user ? "/account" : "/login",
                  className: "w-50 flex h-full items-center gap-2 rounded-full border-gray-300 px-2 py-1 md:border",
                  children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        className: "hidden h-6 w-6 md:block",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "z-10 h-[35px] w-[35px] overflow-hidden rounded-full", children: user ? /* @__PURE__ */ jsx(Avatar$1, { children: (user == null ? void 0 : user.picture) ? /* @__PURE__ */ jsx(AvatarImage$1, { src: user.picture, className: "h-full w-full" }) : /* @__PURE__ */ jsx(
                      AvatarImage$1,
                      {
                        src: "https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png",
                        className: "h-full w-full"
                      }
                    ) }) : /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        fill: "#858080",
                        version: "1.1",
                        id: "Layer_1",
                        xmlns: "http://www.w3.org/2000/svg",
                        xmlnsXlink: "http://www.w3.org/1999/xlink",
                        viewBox: "796 796 200 200",
                        enableBackground: "new 796 796 200 200",
                        xmlSpace: "preserve",
                        stroke: "#858080",
                        className: "h-8 w-8",
                        children: [
                          /* @__PURE__ */ jsx("g", { id: "SVGRepo_bgCarrier", strokeWidth: "0" }),
                          /* @__PURE__ */ jsx(
                            "g",
                            {
                              id: "SVGRepo_tracerCarrier",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          ),
                          /* @__PURE__ */ jsxs("g", { id: "SVGRepo_iconCarrier", children: [
                            /* @__PURE__ */ jsx("path", { d: "M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z" }),
                            " "
                          ] })
                        ]
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("br", { className: "border border-gray-600" })
      ]
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex  w-full justify-center bg-gray-100 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-screen-xl flex-col items-center px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid  w-full grid-cols-1 gap-4 py-8 text-sm md:grid-cols-3 ", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium", children: "Support" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Help Center" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Get help with a safety issue" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Air cover" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Anti-discrimination" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Disablity support" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Cancellation options" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Report neighbourhood concern" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium", children: "Hosting" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "AtypikHouse your home" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "AirCover for Hosts" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Hosting resources" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Community forum" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Hosting responsibly" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsx("strong", { className: "font-medium", children: "AtypikHouse" }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Newsroom" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "New features" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Careers" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Investors" }) }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "AtypikHouse.org emergency stays" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "my-4 w-full border-[1px] border-gray-200" }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center justify-between gap-4 md:gap-0 lg:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex w-full justify-between gap-10 md:order-last md:w-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex text-sm font-semibold", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: "1.5",
              stroke: "currentColor",
              className: "mr-2 h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                }
              )
            }
          ),
          "English(ENG) ",
          /* @__PURE__ */ jsx("span", { className: "mx-4", children: "€ EUR" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6 cursor-pointer",
              viewBox: "0 0 50 50",
              children: /* @__PURE__ */ jsx("path", { d: "M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z" })
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6 cursor-pointer",
              viewBox: "0 0 50 50",
              children: /* @__PURE__ */ jsx("path", { d: "M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" })
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-6 w-6 cursor-pointer",
              viewBox: "0 0 50 50",
              children: /* @__PURE__ */ jsx("path", { d: "M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2 px-1 font-normal text-gray-700 md:w-auto md:flex-row md:items-center md:gap-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "© 2023 At, Inc." }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: " flex gap-6 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer text-gray-700 decoration-1 underline-offset-1 hover:underline md:list-disc", children: "Privacy" }),
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Terms" }),
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Sitemap" }),
          /* @__PURE__ */ jsx("li", { className: "cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline", children: "Company details" })
        ] }) })
      ] })
    ] })
  ] }) });
};
const Layout = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "mx-auto flex min-h-screen max-w-screen-xl flex-col", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const Spinner = () => {
  return /* @__PURE__ */ jsxs("div", { className: "absolute inset-1/2 flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#f5385d]",
        role: "status",
        "aria-label": "Chargement"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "mt-2 text-sm text-gray-500", children: "Chargement..." })
  ] });
};
const PlaceCard = ({ place }) => {
  const { _id: placeId, photos, address, title, price } = place;
  return /* @__PURE__ */ jsx(Link, { to: `/place/${placeId}`, className: "m-4 flex flex-col md:m-2 xl:m-0", children: /* @__PURE__ */ jsxs("div", { className: "card ", children: [
    (photos == null ? void 0 : photos[0]) && /* @__PURE__ */ jsx(
      "img",
      {
        src: `${photos == null ? void 0 : photos[0]}`,
        className: "h-4/5 w-full rounded-xl object-cover"
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "truncate font-bold", children: address }),
    /* @__PURE__ */ jsx("h3", { className: "truncate text-sm text-gray-500", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
        price,
        "€ "
      ] }),
      "per night"
    ] })
  ] }) });
};
const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places = [], loading = false } = allPlaces || {};
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  console.log("places", places);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "AtypikHouse - Découvrez des habitats uniques" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Découvrez des lieux uniques comme des cabanes dans les arbres, yourtes, et autres hébergements atypiques disponibles à la location."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "locations, habitats atypiques, cabanes, yourtes, voyage, hébergements"
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "AtypikHouse - Habitats uniques" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Réservez des habitats atypiques uniques : cabanes, yourtes, et bien plus encore !"
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 justify-items-center px-4 py-32 md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10", children: places.length > 0 ? places.map((place) => /* @__PURE__ */ jsx(PlaceCard, { place }, place._id)) : /* @__PURE__ */ jsxs(
      "div",
      {
        className: "absolute left-1/2 right-1/2 top-40 flex w-full -translate-x-1/2 transform flex-col p-10 md:w-1/2",
        role: "alert",
        "aria-label": "No results found",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold", children: "Aucun résultat trouvé !" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "Désolé, nous n'avons pas trouvé le lieu que vous recherchez." }),
          /* @__PURE__ */ jsx("button", { className: "mt-4 w-32 rounded-full bg-primary p-2 text-white", children: /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "h-5 w-5",
                children: [
                  /* @__PURE__ */ jsx("line", { x1: "19", y1: "12", x2: "5", y2: "12" }),
                  /* @__PURE__ */ jsx("polyline", { points: "12 19 5 12 12 5" })
                ]
              }
            ),
            "Retour"
          ] }) })
        ]
      }
    ) })
  ] });
};
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await auth.register(formData);
    if (response.success) {
      toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setRedirect(true);
    } else {
      toast.error(response.message || "Erreur lors de l'inscription.");
    }
  };
  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success("Connexion avec Google réussie.");
      setRedirect(true);
    } else {
      toast.error("Échec de la connexion avec Google.");
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Inscription - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Créez un compte sur AtypikHouse pour réserver des hébergements uniques et gérer vos annonces."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Inscription - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Rejoignez la communauté AtypikHouse et accédez à des hébergements uniques à louer ou à proposer."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/register" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex grow items-center justify-around p-4 md:p-0", children: /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-center text-4xl", children: "Inscription" }),
      /* @__PURE__ */ jsxs("form", { className: "mx-auto max-w-md", onSubmit: handleFormSubmit, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "name",
            type: "text",
            placeholder: "Nom complet",
            value: formData.name,
            onChange: handleFormData,
            required: true,
            "aria-label": "Nom complet"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "email",
            type: "email",
            placeholder: "votre@email.com",
            value: formData.email,
            onChange: handleFormData,
            required: true,
            "aria-label": "Adresse email"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "password",
            type: "password",
            placeholder: "Mot de passe",
            value: formData.password,
            onChange: handleFormData,
            required: true,
            "aria-label": "Mot de passe"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "primary my-2", type: "submit", children: "S'inscrire" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex w-full items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" }),
        /* @__PURE__ */ jsx("p", { className: "small -mt-1", children: "ou" }),
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex h-[50px] justify-center", children: /* @__PURE__ */ jsx(
        GoogleLogin,
        {
          onSuccess: (credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
          },
          onError: () => {
            toast.error("Échec de la connexion avec Google.");
          },
          text: "continue_with",
          width: "350"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "py-2 text-center text-gray-500", children: [
        "Déjà membre ?",
        " ",
        /* @__PURE__ */ jsx(Link, { className: "text-black underline", to: "/login", children: "Connectez-vous ici" })
      ] })
    ] }) })
  ] });
};
const AccountNav = () => {
  var _a2;
  const { pathname } = useLocation();
  let subpage = (_a2 = pathname.split("/")) == null ? void 0 : _a2[2];
  const { user } = useContext(UserContext);
  if (subpage === void 0) {
    subpage = "profile";
  }
  const linkClases = (type = null) => {
    let classes = "flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  };
  return /* @__PURE__ */ jsxs("nav", { className: "mb-8 mt-24 flex w-full flex-col justify-center gap-2 p-8 md:flex-row md:p-0", children: [
    /* @__PURE__ */ jsxs(Link, { className: linkClases("profile"), to: "/account", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            }
          )
        }
      ),
      "My Profile"
    ] }),
    /* @__PURE__ */ jsxs(Link, { className: linkClases("bookings"), to: `/account/bookings`, children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            }
          )
        }
      ),
      "My bookings"
    ] }),
    /* @__PURE__ */ jsxs(Link, { className: linkClases("places"), to: "/account/places", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            }
          )
        }
      ),
      "My accommodations"
    ] }),
    (user == null ? void 0 : user.isAdmin) && /* @__PURE__ */ jsxs(Link, { className: linkClases("dashboard"), to: "/admin/dashboard", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3 3h18M3 8h18M3 13h18M3 18h18"
            }
          )
        }
      ),
      "Admin Dashboard"
    ] }),
    (user == null ? void 0 : user.role) === "modérateur" && /* @__PURE__ */ jsxs(Link, { className: linkClases("comments"), to: "/admin/comments", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: "1.5",
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3 3h18M3 8h18M3 13h18M3 18h18"
            }
          )
        }
      ),
      "Moderator Dashboard"
    ] })
  ] });
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-full w-full shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-9xl",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const PlaceImg = ({ place, index = 0, className = null }) => {
  var _a2;
  if (!((_a2 = place.photos) == null ? void 0 : _a2.length)) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return /* @__PURE__ */ jsx("img", { src: place.photos[index], alt: "", className });
};
const InfoCard = ({ place }) => {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: `/account/places/${place._id}`,
      className: "my-3 flex cursor-pointer flex-col gap-4 rounded-2xl bg-gray-100 p-4 transition-all hover:bg-gray-300 md:flex-row",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex w-full shrink-0 bg-gray-300 sm:h-32 sm:w-32 ", children: /* @__PURE__ */ jsx(PlaceImg, { place }) }),
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg md:text-xl", children: place.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-sm", children: place.description })
        ] })
      ]
    },
    place._id
  );
};
const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPlaces = async () => {
      try {
        const { data } = await axiosInstance.get("places/user-places");
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des lieux :", error);
        setLoading(false);
      }
    };
    getPlaces();
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Mes lieux - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez vos lieux et propriétés ajoutées à AtypikHouse. Ajoutez, modifiez ou supprimez vos annonces facilement."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Mes lieux - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Accédez à vos lieux ajoutés sur AtypikHouse et gérez vos annonces en toute simplicité."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/account/places" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs(
        Link,
        {
          className: "inline-flex gap-1 rounded-full bg-primary px-6 py-2 text-white",
          to: "/account/places/new",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-6 w-6",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M12 4.5v15m7.5-7.5h-15"
                  }
                )
              }
            ),
            "Ajouter un nouveau lieu"
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "mx-4 mt-4", children: places.length > 0 ? places.map((place) => /* @__PURE__ */ jsx(InfoCard, { place }, place._id)) : /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-500", children: [
        /* @__PURE__ */ jsx("p", { children: "Aucun lieu ajouté pour l'instant." }),
        /* @__PURE__ */ jsx("p", { children: "Cliquez sur le bouton ci-dessus pour ajouter votre premier lieu !" })
      ] }) })
    ] })
  ] });
};
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = ({ className, ...props }) => /* @__PURE__ */ jsx(DialogPrimitive.Portal, { className: cn(className), ...props });
DialogPortal.displayName = DialogPrimitive.Portal.displayName;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ref,
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] })
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const EditProfileDialog = () => {
  const { user, setUser, uploadPicture, updateUser } = useAuth();
  const uploadRef = useRef(null);
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    password: "",
    confirm_password: ""
  });
  const handleImageClick = () => {
    uploadRef.current.click();
  };
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };
  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSaveChanges = async () => {
    setLoading(true);
    const { name, password, confirm_password } = userData;
    if (name.trim() === "") {
      setLoading(false);
      return toast.error("Name Can't be empty");
    } else if (password !== confirm_password) {
      setLoading(false);
      return toast.error("Passwords don't match");
    }
    try {
      let pictureUrl = "";
      if (picture) {
        pictureUrl = await uploadPicture(picture);
      }
      const userDetails = {
        name: userData.name,
        password: userData.password,
        picture: pictureUrl
      };
      const res = await updateUser(userDetails);
      if (res.success) {
        setUser(res.user);
        setLoading(false);
        return toast.success("Updated successfully!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "bg-blue-600 hover:bg-blue-600 ", children: [
      /* @__PURE__ */ jsx(PenSquare, { className: "mr-2 h-4 w-4" }),
      "Edit Profile"
    ] }) }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative h-40 w-40 cursor-pointer overflow-hidden rounded-full bg-gray-200", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute flex h-full w-full items-center justify-center bg-gray-200 hover:z-10",
            onClick: handleImageClick,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  className: "hidden",
                  ref: uploadRef,
                  onChange: handlePictureChange
                }
              ),
              /* @__PURE__ */ jsx(Upload, { height: 50, width: 50, color: "#4e4646" })
            ]
          }
        ),
        picture ? /* @__PURE__ */ jsx(Avatar, { className: "transition-all ease-in-out hover:z-0 hover:hidden ", children: /* @__PURE__ */ jsx(AvatarImage, { src: URL.createObjectURL(picture) }) }) : /* @__PURE__ */ jsx(Avatar, { className: "transition-all ease-in-out hover:z-0 hover:hidden ", children: /* @__PURE__ */ jsx(AvatarImage, { src: user.picture }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", className: "text-right", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              name: "name",
              value: userData.name,
              className: "col-span-3",
              onChange: handleUserData
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "text-right", children: "New Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              name: "password",
              value: userData.password,
              className: "col-span-3",
              type: "password",
              onChange: handleUserData
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "confirm_Password", className: "text-right", children: "Confirm Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "confirm_password",
              name: "confirm_password",
              value: userData.confirm_password,
              className: "col-span-3",
              type: "password",
              onChange: handleUserData
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(
        Button,
        {
          disabled: loading,
          type: "submit",
          className: "w-full",
          onClick: handleSaveChanges,
          children: [
            loading && /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Save changes"
          ]
        }
      ) })
    ] })
  ] });
};
const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success("Déconnexion réussie.");
      setRedirect("/");
    } else {
      toast.error("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };
  if (!user && !redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  }
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: redirect });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Profil - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez votre profil utilisateur sur AtypikHouse. Consultez vos informations personnelles et vos annonces."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Profil - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Accédez à votre espace personnel pour gérer vos informations et vos lieux sur AtypikHouse."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/account/profile" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      subpage === "profile" && /* @__PURE__ */ jsxs("div", { className: "m-4 flex flex-col items-center gap-8 rounded-[10px] p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-40 w-40 justify-center rounded-full bg-gray-200 p-4 sm:h-72 sm:w-72 md:h-96 md:w-96", children: /* @__PURE__ */ jsxs(Avatar, { children: [
          user.picture ? /* @__PURE__ */ jsx(AvatarImage, { src: user.picture }) : /* @__PURE__ */ jsx(
            AvatarImage,
            {
              src: "https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png",
              className: "object-cover"
            }
          ),
          /* @__PURE__ */ jsx(AvatarFallback, { children: user.name.slice(0, 1) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Text, { height: "18", width: "18" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xl", children: [
                /* @__PURE__ */ jsx("span", { children: "Nom : " }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: user.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Mail, { height: "18", width: "18" }),
              /* @__PURE__ */ jsxs("div", { className: "text-xl", children: [
                /* @__PURE__ */ jsx("span", { children: "Email : " }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: user.email })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10", children: [
            /* @__PURE__ */ jsx(EditProfileDialog, {}),
            /* @__PURE__ */ jsxs(Button, { variant: "secondary", onClick: handleLogout, children: [
              /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
              "Déconnexion"
            ] })
          ] })
        ] })
      ] }),
      subpage === "places" && /* @__PURE__ */ jsx(PlacesPage, {})
    ] })
  ] });
};
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await auth.login(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message || "Échec de la connexion. Veuillez réessayer.");
    }
  };
  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message || "Échec de la connexion avec Google.");
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  }
  if (auth.user) {
    return /* @__PURE__ */ jsx(ProfilePage, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Connexion - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Connectez-vous à votre compte AtypikHouse pour gérer vos réservations et vos propriétés."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Connexion - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Rejoignez la communauté AtypikHouse et accédez à votre espace personnel."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/login" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex grow items-center justify-around p-4 md:p-0", children: /* @__PURE__ */ jsxs("div", { className: "mb-40", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-center text-4xl", children: "Connexion" }),
      /* @__PURE__ */ jsxs("form", { className: "mx-auto max-w-md", onSubmit: handleFormSubmit, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "email",
            type: "email",
            placeholder: "Votre email",
            value: formData.email,
            onChange: handleFormData,
            required: true,
            "aria-label": "Email"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            name: "password",
            type: "password",
            placeholder: "Mot de passe",
            value: formData.password,
            onChange: handleFormData,
            required: true,
            "aria-label": "Mot de passe"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "primary my-4", type: "submit", children: "Se connecter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex w-full items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" }),
        /* @__PURE__ */ jsx("p", { className: "small -mt-1", children: "ou" }),
        /* @__PURE__ */ jsx("div", { className: "h-0 w-1/2 border-[1px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex h-[50px] justify-center", children: /* @__PURE__ */ jsx(
        GoogleLogin,
        {
          onSuccess: (credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
          },
          onError: () => {
            toast.error("Échec de la connexion avec Google.");
          },
          text: "continue_with",
          width: "350"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "py-2 text-center text-gray-500", children: [
        "Pas encore de compte ?",
        " ",
        /* @__PURE__ */ jsx(Link, { className: "text-black underline", to: "/register", children: "Inscrivez-vous maintenant" })
      ] })
    ] }) })
  ] });
};
const BookingDates = ({ booking, className }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 " + className, children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: "h-6 w-6",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          }
        )
      }
    ),
    differenceInCalendarDays(
      new Date(booking.checkOut),
      new Date(booking.checkIn)
    ),
    "nights:",
    /* @__PURE__ */ jsxs("div", { className: "ml-2 flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            }
          )
        }
      ),
      format(new Date(booking.checkIn), "dd-MM-yyyy"),
      " →",
      " "
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "items- flex gap-1", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            }
          )
        }
      ),
      format(new Date(booking.checkOut), "dd-MM-yyyy")
    ] })
  ] });
};
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const { data } = await axiosInstance.get("/bookings");
        setBookings(data.booking);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        setLoading(false);
      }
    };
    getBookings();
  }, []);
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Mes Réservations - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Consultez vos réservations effectuées sur AtypikHouse. Gérez vos séjours et découvrez vos prochaines aventures."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Mes Réservations - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Accédez à toutes vos réservations sur AtypikHouse et planifiez votre prochain séjour."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/account/bookings" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      /* @__PURE__ */ jsx("div", { className: "w-full px-4", children: (bookings == null ? void 0 : bookings.length) > 0 ? bookings.map((booking) => {
        var _a2, _b;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/account/bookings/${booking._id}`,
            className: "my-8 flex h-28 gap-4 overflow-hidden rounded-2xl bg-gray-200 md:h-40",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-2/6 md:w-1/6", children: ((_a2 = booking == null ? void 0 : booking.place) == null ? void 0 : _a2.photos[0]) && /* @__PURE__ */ jsx(
                PlaceImg,
                {
                  place: booking == null ? void 0 : booking.place,
                  className: "h-full w-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "grow py-3 pr-3", children: [
                /* @__PURE__ */ jsx("h2", { className: "md:text-2xl", children: (_b = booking == null ? void 0 : booking.place) == null ? void 0 : _b.title }),
                /* @__PURE__ */ jsxs("div", { className: "md:text-xl", children: [
                  /* @__PURE__ */ jsx(
                    BookingDates,
                    {
                      booking,
                      className: "mb-2 mt-4 hidden items-center text-gray-600 md:flex"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "my-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "currentColor",
                        className: "h-7 w-7",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-xl md:text-2xl", children: [
                      "Prix total : ",
                      booking.price,
                      "€"
                    ] })
                  ] })
                ] })
              ] })
            ]
          },
          booking._id
        );
      }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "my-6 text-3xl font-semibold", children: "Mes Voyages" }),
        /* @__PURE__ */ jsx("hr", { className: "border border-gray-300" }),
        /* @__PURE__ */ jsx("h3", { className: "pt-6 text-2xl font-semibold", children: "Vous n'avez encore réservé aucun voyage." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Commencez à explorer des hébergements uniques et planifiez votre prochaine aventure !" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "my-4", children: /* @__PURE__ */ jsx("button", { className: "flex w-40 justify-center rounded-lg border border-black p-3 text-lg font-semibold hover:bg-gray-50", children: "Explorer" }) })
      ] }) })
    ] })
  ] });
};
const Perks = ({ selected, handleFormData }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6", children: [
    /* @__PURE__ */ jsxs(
      "label",
      {
        className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4",
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: selected.includes("wifi"),
              name: "wifi",
              onChange: handleFormData
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { children: "Wifi" })
        ]
      },
      "perks"
    ),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("parking"),
          name: "parking",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Free parking spot" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("tv"),
          name: "tv",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "TV" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("radio"),
          name: "radio",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Radio" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("pets"),
          name: "pets",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Pets" })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes("enterence"),
          name: "enterence",
          onChange: handleFormData
        }
      ),
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-6 w-6",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "Private Enterence" })
    ] })
  ] });
};
const Image = ({ src, ...rest }) => {
  return /* @__PURE__ */ jsx("img", { src, ...rest, alt: "", className: "rounded-xl" });
};
const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setphotoLink] = useState("");
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axiosInstance.post("/upload-by-link", {
      link: photoLink
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setphotoLink("");
  };
  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    const { data: filenames } = await axiosInstance.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" }
    });
    setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });
  };
  const removePhoto = (filename) => {
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  };
  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename)
    ]);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: photoLink,
          onChange: (e) => setphotoLink(e.target.value),
          type: "text",
          placeholder: "Add using a link ...jpg"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-2xl bg-gray-200 px-4",
          onClick: addPhotoByLink,
          children: "Add photo"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 ", children: [
      (addedPhotos == null ? void 0 : addedPhotos.length) > 0 && addedPhotos.map((link) => /* @__PURE__ */ jsxs("div", { className: "relative flex h-32", children: [
        /* @__PURE__ */ jsx(
          Image,
          {
            className: "w-full rounded-2xl object-cover",
            src: link,
            alt: ""
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => removePhoto(link),
            className: "absolute bottom-1 right-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 1.5,
                stroke: "currentColor",
                className: "h-6 w-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => selectAsMainPhoto(e, link),
            className: "absolute bottom-1 left-1 cursor-pointer rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70",
            children: [
              link === addedPhotos[0] && /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  className: "h-6 w-6",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
                      clipRule: "evenodd"
                    }
                  )
                }
              ),
              link !== addedPhotos[0] && /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-6 w-6",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    }
                  )
                }
              )
            ]
          }
        )
      ] }, link)),
      /* @__PURE__ */ jsxs("label", { className: "flex h-32 cursor-pointer items-center justify-center gap-1 rounded-2xl border bg-transparent p-2 text-2xl text-gray-600", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            multiple: true,
            className: "hidden",
            onChange: uploadPhoto
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-8 w-8",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              }
            )
          }
        ),
        "Upload"
      ] })
    ] })
  ] });
};
const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 10,
    price: 500,
    type: ""
  });
  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    maxGuests,
    price,
    type
  } = formData;
  const isValidPlaceData = () => {
    if (title.trim() === "") {
      toast.error("Le titre ne peut pas être vide.");
      return false;
    } else if (address.trim() === "") {
      toast.error("L'adresse ne peut pas être vide.");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error("Veuillez ajouter au moins 5 photos.");
      return false;
    } else if (description.trim() === "") {
      toast.error("La description ne peut pas être vide.");
      return false;
    } else if (maxGuests < 1) {
      toast.error("Le nombre minimum de personnes doit être au moins de 1.");
      return false;
    }
    return true;
  };
  const handleFormData = (e) => {
    const { name, value, type: type2 } = e.target;
    if (type2 !== "checkbox") {
      setFormData({ ...formData, [name]: value });
      return;
    }
    if (type2 === "checkbox") {
      const currentPerks = [...perks];
      let updatedPerks = [];
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key]
          }));
        }
      }
      setAddedPhotos([...place.photos]);
      setLoading(false);
    });
  }, [id]);
  const preInput = (header, description2) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl", children: header }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: description2 })
  ] });
  const savePlace = async (e) => {
    e.preventDefault();
    if (!isValidPlaceData()) return;
    const placeData = { ...formData, addedPhotos };
    if (id) {
      await axiosInstance.put("/places/update-place", { id, ...placeData });
    } else {
      await axiosInstance.post("/places/add-places", placeData);
    }
    toast.success("Le lieu a été enregistré avec succès.");
    setRedirect(true);
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/account/places" });
  }
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        id ? "Modifier le lieu" : "Ajouter un nouveau lieu",
        " - AtypikHouse"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `${id ? "Modifier les détails du lieu." : "Ajouter un nouveau lieu à votre compte."}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      /* @__PURE__ */ jsxs("form", { onSubmit: savePlace, children: [
        preInput("Titre", "Un titre accrocheur pour votre lieu."),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "title",
            value: title,
            onChange: handleFormData,
            placeholder: "Titre, par exemple : Mon charmant appartement"
          }
        ),
        preInput("Adresse", "L'adresse de ce lieu"),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "address",
            value: address,
            onChange: handleFormData,
            placeholder: "Adresse"
          }
        ),
        preInput("Photos", "Ajoutez plusieurs photos pour mieux présenter votre lieu."),
        /* @__PURE__ */ jsx(PhotosUploader, { addedPhotos, setAddedPhotos }),
        preInput("Description", "Une description détaillée du lieu."),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: description,
            name: "description",
            onChange: handleFormData
          }
        ),
        preInput("Équipements", "Sélectionnez tous les équipements disponibles."),
        /* @__PURE__ */ jsx(Perks, { selected: perks, handleFormData }),
        preInput("Informations supplémentaires", "Règles de la maison, etc."),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: extraInfo,
            name: "extraInfo",
            onChange: handleFormData
          }
        ),
        preInput("Type de lieu", "Sélectionnez le type de votre lieu."),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "type",
            value: type,
            onChange: handleFormData,
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Sélectionner un type" }),
              /* @__PURE__ */ jsx("option", { value: "Treehouse", children: "Cabane dans les arbres" }),
              /* @__PURE__ */ jsx("option", { value: "Yurt", children: "Yourte" }),
              /* @__PURE__ */ jsx("option", { value: "Boat", children: "Bateau" }),
              /* @__PURE__ */ jsx("option", { value: "Cave", children: "Grotte" }),
              /* @__PURE__ */ jsx("option", { value: "Igloo", children: "Igloo" }),
              /* @__PURE__ */ jsx("option", { value: "Other", children: "Autre" })
            ]
          }
        ),
        preInput(
          "Capacité et Prix",
          "Spécifiez la capacité maximale et le prix par nuit."
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2 md:grid-cols-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "-mb-1 mt-2", children: "Capacité maximale" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "maxGuests",
                value: maxGuests,
                onChange: handleFormData,
                placeholder: "1",
                min: "1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "-mb-1 mt-2", children: "Prix par nuit (€)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "price",
                value: price,
                onChange: handleFormData,
                placeholder: "500",
                min: "1"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "mx-auto my-4 flex rounded-full bg-primary px-20 py-3 text-xl font-semibold text-white",
            children: "Enregistrer"
          }
        )
      ] })
    ] })
  ] });
};
const AddressLink = ({ placeAddress, className = null }) => {
  if (!className) {
    className = "my-3 block";
  }
  className += " flex gap-1 font-semibold underline";
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className,
      href: `https://maps.google.com/?q=${placeAddress}`,
      target: "blank",
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                }
              )
            ]
          }
        ),
        placeAddress
      ]
    }
  );
};
function Calendar({ className, classNames, ...props }) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        IconRight: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      },
      ...props,
      required: true
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      ref,
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) })
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function DatePickerWithRange({ className, setDateRange }) {
  const [date, setDate] = React.useState({
    from: /* @__PURE__ */ new Date(),
    to: addDays(Date.now(), 5)
  });
  const today = /* @__PURE__ */ new Date();
  const yesterday = /* @__PURE__ */ new Date();
  yesterday.setDate(today.getDate() - 1);
  React.useEffect(() => {
    if (!date) {
      setDate({ from: /* @__PURE__ */ new Date(), to: /* @__PURE__ */ new Date() });
    } else {
      setDateRange(date);
    }
  }, [date]);
  return /* @__PURE__ */ jsx("div", { className: cn("grid gap-2", className), children: /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(
      PopoverTrigger,
      {
        asChild: true,
        className: "border-none text-black hover:bg-transparent",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            id: "date",
            variant: "outline",
            className: cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx(Calendar$1, { className: "mr-2 h-4 w-4" }),
              (date == null ? void 0 : date.from) ? date.to ? /* @__PURE__ */ jsxs(Fragment, { children: [
                format(date.from, "LLL dd, y"),
                " -",
                ">",
                " ",
                format(date.to, "LLL dd, y")
              ] }) : format(date.from, "LLL dd, y") : /* @__PURE__ */ jsx("span", { className: "text-base font-semibold", children: "Pick a date" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
      Calendar,
      {
        initialFocus: true,
        mode: "range",
        defaultMonth: date == null ? void 0 : date.from,
        selected: date,
        onSelect: setDate,
        numberOfMonths: 1,
        disabled: (date2) => date2 < (/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 1)
      }
    ) })
  ] }) });
}
const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: "",
    phone: ""
  });
  const [redirect, setRedirect] = useState("");
  const { user } = useAuth();
  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;
  useEffect(() => {
    if (user) {
      setBookingData({ ...bookingData, name: user.name });
    }
  }, [user]);
  const numberOfNights = dateRange.from && dateRange.to ? differenceInDays(
    new Date(dateRange.to).setHours(0, 0, 0, 0),
    new Date(dateRange.from).setHours(0, 0, 0, 0)
  ) : 0;
  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };
  const handleBooking = async () => {
    if (!user) {
      return setRedirect(`/login`);
    }
    if (numberOfNights < 1) {
      return toast.error("Please select valid dates");
    } else if (noOfGuests < 1) {
      return toast.error("No. of guests can't be less than 1");
    } else if (noOfGuests > place.maxGuests) {
      return toast.error(`Allowed max. no. of guests: ${place.maxGuests}`);
    } else if (name.trim() === "") {
      return toast.error("Name can't be empty");
    } else if (phone.trim() === "") {
      return toast.error("Phone can't be empty");
    }
    try {
      const response = await axiosInstance.post("/bookings", {
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        noOfGuests,
        name,
        phone,
        place: id,
        price: numberOfNights * price
      });
      const bookingId = response.data.booking._id;
      setRedirect(`/account/bookings/${bookingId}`);
      toast("Congratulations! Enjoy your trip.");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("Error: ", error);
    }
  };
  if (redirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: redirect });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-4 shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center text-xl", children: [
      "Price: ",
      /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
        place.price,
        "€"
      ] }),
      " / per night"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border", children: [
      /* @__PURE__ */ jsx("div", { className: "flex w-full ", children: /* @__PURE__ */ jsx(DatePickerWithRange, { setDateRange }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t px-4 py-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Number of guests: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: "noOfGuests",
            placeholder: `Max. guests: ${place.maxGuests}`,
            min: 1,
            max: place.maxGuests,
            value: noOfGuests,
            onChange: handleBookingData
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t px-4 py-3", children: [
        /* @__PURE__ */ jsx("label", { children: "Your full name: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "name",
            value: name,
            onChange: handleBookingData
          }
        ),
        /* @__PURE__ */ jsx("label", { children: "Phone number: " }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            name: "phone",
            value: phone,
            onChange: handleBookingData
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: handleBooking, className: "primary mt-4", children: [
      "Book this place",
      numberOfNights > 0 && /* @__PURE__ */ jsxs("span", { children: [
        " ",
        numberOfNights * place.price,
        "€"
      ] })
    ] })
  ] });
};
const PlaceGallery = ({ place }) => {
  var _a2, _b, _c, _d, _e, _f, _g;
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-20 overflow-auto bg-white text-white", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 bg-white px-2 py-20 md:p-8", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: "fixed right-2 top-8 flex gap-1 rounded-2xl bg-white px-4 py-2 text-black shadow-sm shadow-gray-500 md:right-12",
          onClick: () => setShowAllPhotos(false),
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                className: "h-6 w-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z",
                    clipRule: "evenodd"
                  }
                )
              }
            ),
            "Close photos"
          ]
        }
      ) }),
      ((_a2 = place == null ? void 0 : place.photos) == null ? void 0 : _a2.length) > 0 && place.photos.map((photo, index) => /* @__PURE__ */ jsx("div", { className: "max-w-full", children: /* @__PURE__ */ jsx("img", { src: photo, alt: "" }) }, index))
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden h-[400px] max-h-[450px] grid-cols-4 gap-2 overflow-hidden rounded-[12px] md:grid", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-2 overflow-hidden", children: ((_b = place.photos) == null ? void 0 : _b[0]) && /* @__PURE__ */ jsx("div", { className: "h-full w-full overflow-hidden bg-red-200", children: /* @__PURE__ */ jsx(
        "img",
        {
          onClick: () => setShowAllPhotos(true),
          className: "h-full w-full cursor-pointer object-cover",
          src: place.photos[0],
          alt: ""
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid h-full grid-rows-2 gap-2", children: [
        ((_c = place.photos) == null ? void 0 : _c[1]) && // row 1
        /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[1],
            alt: ""
          }
        ) }),
        ((_d = place.photos) == null ? void 0 : _d[2]) && // row 2
        /* @__PURE__ */ jsx("div", { className: "bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[2],
            alt: ""
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-1 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "grid h-full grid-rows-2 gap-2", children: [
        ((_e = place.photos) == null ? void 0 : _e[3]) && // row 1
        /* @__PURE__ */ jsx("div", { className: "h-full bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[3],
            alt: ""
          }
        ) }),
        ((_f = place.photos) == null ? void 0 : _f[4]) && // row 2
        /* @__PURE__ */ jsx("div", { className: "h-full bg-gray-200", children: /* @__PURE__ */ jsx(
          "img",
          {
            onClick: () => setShowAllPhotos(true),
            className: "h-full w-full cursor-pointer object-cover",
            src: place.photos[4],
            alt: ""
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex overflow-hidden rounded-[12px] md:hidden", children: ((_g = place.photos) == null ? void 0 : _g[0]) && /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(
      "img",
      {
        onClick: () => setShowAllPhotos(true),
        className: "h-full cursor-pointer object-cover",
        src: place.photos[0],
        alt: ""
      }
    ) }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "absolute bottom-2 right-2 flex gap-1 rounded-xl bg-white px-4 py-2 shadow-md shadow-gray-500 ",
        onClick: () => setShowAllPhotos(true),
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "currentColor",
              className: "h-6 w-6",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          "Show all photos"
        ]
      }
    )
  ] });
};
const PerksWidget = ({ perks }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("hr", { className: "mb-5 border" }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-semibold", children: "What this place offers" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid flex-col gap-4 lg:grid-cols-2 lg:justify-items-stretch lg:gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("wifi")) ? "" : "line-through"}`, children: "Wifi" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("tv")) ? "" : "line-through"}`, children: "TV" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `${(perks == null ? void 0 : perks.includes("parking")) ? "" : "line-through"}`,
            children: "Free parking spot"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("radio")) ? "" : "line-through"}`, children: "Radio" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `${(perks == null ? void 0 : perks.includes("pets")) ? "" : "line-through"}`, children: "Pets" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "h-6 w-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `${(perks == null ? void 0 : perks.includes("enterence")) ? "" : "line-through"}`,
            children: "Private enterence"
          }
        )
      ] })
    ] })
  ] });
};
const isBrowser = typeof window !== "undefined";
const API_BASE_URL = "http://localhost:4000";
function PlacePage() {
  var _a2;
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  const [replyVisible, setReplyVisible] = useState({});
  const storedUser = isBrowser ? JSON.parse(window.localStorage.getItem("user") || "null") : null;
  const userName = (storedUser == null ? void 0 : storedUser.name) || "Utilisateur inconnu";
  const hasToken = isBrowser && window.localStorage.getItem("token");
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const { data } = await axiosInstance.get(`${API_BASE_URL}/api/places/${id}`);
        setPlace(data.place);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!hasToken) return;
    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${hasToken}` } }
      );
      setPlace((prev) => ({
        ...prev,
        reviews: [...prev.reviews, data.data.at(-1)]
      }));
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleReplySubmit = async (reviewId) => {
    if (!hasToken) return;
    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews/${reviewId}/reply`,
        { comment: reply[reviewId], userName },
        { headers: { Authorization: `Bearer ${hasToken}` } }
      );
      setPlace((prev) => ({
        ...prev,
        reviews: prev.reviews.map((r) => r._id === reviewId ? data.data : r)
      }));
      setReply((p) => ({ ...p, [reviewId]: "" }));
      setReplyVisible((p) => ({ ...p, [reviewId]: false }));
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  if (!place) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        place.title,
        " - AtypikHouse"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Découvrez ${place.title}, situé à ${place.address}. Hébergement unique pour un séjour inoubliable.`
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: place.title }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: `Réservez ${place.title} sur AtypikHouse. Parfait pour ${place.maxGuests} invités.`
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `https://votre-domaine.com/places/${id}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 overflow-x-hidden px-8 pt-20", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: place.title }),
      /* @__PURE__ */ jsx(AddressLink, { placeAddress: place.address }),
      /* @__PURE__ */ jsx(PlaceGallery, { place }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "my-4 text-2xl font-semibold", children: "Description" }),
          /* @__PURE__ */ jsx("p", { children: place.description }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2", children: [
            "Capacité max : ",
            place.maxGuests,
            " personnes"
          ] }),
          /* @__PURE__ */ jsx(PerksWidget, { perks: place.perks })
        ] }),
        /* @__PURE__ */ jsx(BookingWidget, { place })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "-mx-8 border-t bg-white px-8 py-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl font-semibold", children: "Informations supplémentaires" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 mt-2 text-sm leading-5 text-gray-700", children: place.extraInfo })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Avis" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: ((_a2 = place.reviews) == null ? void 0 : _a2.length) ? place.reviews.map((review) => {
          var _a3, _b;
          return /* @__PURE__ */ jsxs("div", { className: "mb-4 rounded border p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a3 = review.user) == null ? void 0 : _a3.name) || userName }),
              /* @__PURE__ */ jsxs("span", { className: "ml-4", children: [
                "Note : ",
                review.rating,
                " / 5"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { children: review.comment }),
            (_b = review.replies) == null ? void 0 : _b.map((rep) => {
              var _a4;
              return /* @__PURE__ */ jsxs("div", { className: "mt-4 ml-4 border-l-2 pl-4", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: (_a4 = rep.user) == null ? void 0 : _a4.name }),
                " : ",
                rep.comment
              ] }, rep._id);
            }),
            hasToken && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700",
                  onClick: () => setReplyVisible((p) => ({ ...p, [review._id]: !p[review._id] })),
                  children: "Répondre"
                }
              ),
              replyVisible[review._id] && /* @__PURE__ */ jsxs(
                "form",
                {
                  className: "mt-4",
                  onSubmit: (e) => {
                    e.preventDefault();
                    handleReplySubmit(review._id);
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        rows: 2,
                        className: "w-full rounded border p-2",
                        placeholder: "Répondre à cet avis",
                        value: reply[review._id] || "",
                        onChange: (e) => setReply((p) => ({ ...p, [review._id]: e.target.value }))
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700",
                        children: "Envoyer"
                      }
                    )
                  ]
                }
              )
            ] })
          ] }, review._id);
        }) : /* @__PURE__ */ jsx("p", { children: "Aucun avis pour l’instant." }) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-8 text-2xl font-semibold", children: "Laisser un avis" }),
        hasToken ? /* @__PURE__ */ jsxs("form", { onSubmit: handleReviewSubmit, children: [
          /* @__PURE__ */ jsxs("label", { className: "block font-semibold", children: [
            "Note",
            /* @__PURE__ */ jsxs(
              "select",
              {
                required: true,
                value: rating,
                onChange: (e) => setRating(e.target.value),
                className: "mt-1 block w-full rounded border p-2",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Sélectionnez une note" }),
                  [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxs("option", { value: n, children: [
                    n,
                    " étoile",
                    n > 1 && "s"
                  ] }, n))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "mt-4 block font-semibold", children: [
            "Commentaire",
            /* @__PURE__ */ jsx(
              "textarea",
              {
                required: true,
                rows: 4,
                value: comment,
                onChange: (e) => setComment(e.target.value),
                className: "mt-1 block w-full rounded border p-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700",
              children: "Envoyer"
            }
          )
        ] }) : /* @__PURE__ */ jsx("p", { className: "italic", children: "Veuillez vous connecter pour laisser un avis." })
      ] })
    ] })
  ] });
}
const SingleBookedPlace = () => {
  var _a2, _b, _c;
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/bookings");
      const filteredBooking = data.booking.filter(
        (booking2) => booking2._id === id
      );
      setBooking(filteredBooking[0]);
    } catch (error) {
      console.error("Erreur : ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getBookings();
  }, [id]);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        ((_a2 = booking == null ? void 0 : booking.place) == null ? void 0 : _a2.title) ? `Réservation - ${booking.place.title}` : "Détails de la réservation",
        " - AtypikHouse"
      ] }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Consultez les détails de votre réservation pour ${((_b = booking == null ? void 0 : booking.place) == null ? void 0 : _b.title) || "un lieu unique"}.`
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Détails de la réservation - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Consultez vos informations de réservation sur AtypikHouse."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `https://votre-domaine.com/bookings/${id}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountNav, {}),
      (booking == null ? void 0 : booking.place) ? /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl", children: booking.place.title }),
        /* @__PURE__ */ jsx(
          AddressLink,
          {
            className: "my-2 block",
            placeAddress: (_c = booking.place) == null ? void 0 : _c.address
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl md:text-2xl", children: "Informations sur votre réservation" }),
            /* @__PURE__ */ jsx(BookingDates, { booking })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: "Prix total" }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center text-3xl", children: /* @__PURE__ */ jsxs("span", { children: [
              booking.price,
              "€"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(PlaceGallery, { place: booking.place })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Aucune donnée disponible" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Nous n'avons pas pu trouver les détails de cette réservation." })
      ] })
    ] })
  ] });
};
const NotFoundPage = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "404 - Page non trouvée | AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre exploration."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, follow" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "404 - Page non trouvée" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Erreur 404 - La page demandée n'existe pas ou a été déplacée. Cliquez pour retourner à l'accueil."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: "https://votre-domaine.com/404" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-2 pt-40", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "text-base font-semibold text-black",
          role: "alert",
          "aria-label": "Erreur 404",
          children: "404"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-semibold tracking-tight text-black sm:text-5xl", children: "Oups ! Nous ne trouvons pas la page que vous recherchez." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-600", children: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée." }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-center gap-x-3", children: /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "rounded-[10px] bg-gray-900 p-2 px-20 hover:bg-gray-700",
          "aria-label": "Retour à l'accueil",
          children: /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: "Accueil" })
        }
      ) }) })
    ] }) })
  ] });
};
const OwnerBenefitsPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Devenez propriétaire sur AtypikBookings | Louez votre bien" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Générez des revenus en louant votre logement atypique sur AtypikBookings. Grande visibilité, paiements sécurisés et assistance 24/7." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "location saisonnière, hébergement atypique, louer bien immobilier, propriétaires, Airbnb alternatif" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://atypikbookings.com/owner-benefits" })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-gray-800 mb-4", children: "🎉 Devenez propriétaire sur AtypikBookings" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-2xl", children: "Rentabilisez votre hébergement atypique en le louant sur AtypikBookings. Cabanes, yourtes, igloos, maisons flottantes... Notre plateforme vous permet de trouver des locataires en toute simplicité et sécurité." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "📈 Augmentez vos revenus" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Publiez votre bien et commencez à percevoir des revenus en accueillant des voyageurs du monde entier." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "🔍 Grande visibilité" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Votre logement sera mis en avant auprès de milliers d'utilisateurs chaque mois." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "💰 Paiements sécurisés" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Recevez vos paiements rapidement et en toute sécurité grâce à notre système intégré." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "p-6 border rounded-lg shadow-lg bg-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-3", children: "📞 Assistance 24/7" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Une équipe dédiée est disponible à tout moment pour vous accompagner et répondre à vos questions." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/register",
        className: "bg-primary text-white px-6 py-3 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-primary-dark transition",
        "aria-label": "S'inscrire pour devenir propriétaire",
        children: "🚀 Je deviens hôte dès maintenant"
      }
    ) })
  ] });
};
const AdminDashboard = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Tableau de Bord Administrateur - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez les utilisateurs, équipements, propriétés et commentaires depuis le tableau de bord administrateur."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-center text-gray-800 mb-12", children: "Tableau de Bord Administrateur" }),
      /* @__PURE__ */ jsxs("nav", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/users",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-blue-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2.25c-2.762 0-7.5 1.44-7.5 4.25v.75h15v-.75c0-2.81-4.738-4.25-7.5-4.25z"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Gérer les utilisateurs" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/equipments",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-green-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M6 18.75V5.25c0-1.35 1.125-2.25 2.25-2.25h7.5c1.125 0 2.25.9 2.25 2.25v13.5"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Gérer les équipements" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/properties",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-yellow-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M19.5 15v4.5a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25v-4.5M4.5 10.5L12 4.5l7.5 6M12 4.5v10.5"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Gérer les propriétés" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/comments",
            className: "bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "h-12 w-12 mx-auto text-red-500 mb-4",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M3 8.25h18M3 12h18M3 15.75h18M5.25 8.25v10.5M18.75 8.25v10.5"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-800", children: "Modérer les commentaires" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const API_BASE_URL2 = "http://localhost:4000";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL2}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => setUsers(response.data.data)).catch((error) => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, [API_BASE_URL2]);
  const handleDelete = (userId) => {
    const adminUser = users.find((user) => user._id === userId && user.isAdmin);
    if (adminUser) {
      alert("Vous ne pouvez pas supprimer l'utilisateur administrateur principal.");
      return;
    }
    const token = localStorage.getItem("token");
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      axios.delete(`${API_BASE_URL2}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => setUsers(users.filter((user) => user._id !== userId))).catch((error) => console.error("Erreur lors de la suppression :", error));
    }
  };
  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Êtes-vous sûr de vouloir changer le rôle de cet utilisateur ?")) {
      axios.put(
        `${API_BASE_URL2}/api/admin/update-user-role/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((response) => {
        setUsers(
          users.map(
            (user) => user._id === userId ? { ...user, role: response.data.data.role } : user
          )
        );
      }).catch((error) => console.error("Erreur lors du changement de rôle :", error));
    }
  };
  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditedName(user.name);
    setEditedEmail(user.email);
  };
  const handleSave = (userId) => {
    const token = localStorage.getItem("token");
    axios.put(
      `${API_BASE_URL2}/api/admin/update-user/${userId}`,
      { name: editedName, email: editedEmail },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      setUsers(
        users.map(
          (user) => user._id === userId ? { ...user, name: editedName, email: editedEmail } : user
        )
      );
      setEditingUserId(null);
    }).catch((error) => console.error("Erreur lors de la mise à jour :", error));
  };
  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) && (roleFilter ? user.role === roleFilter : true)
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Gestion des Utilisateurs - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez les utilisateurs inscrits sur AtypikHouse. Modifiez leurs informations ou supprimez leurs comptes."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Utilisateurs" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-2 md:flex-row md:gap-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Rechercher par nom...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "p-2 border rounded w-full md:w-1/3"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: roleFilter,
            onChange: (e) => setRoleFilter(e.target.value),
            className: "p-2 border rounded w-full md:w-1/3",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Tous les rôles" }),
              /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
              /* @__PURE__ */ jsx("option", { value: "modérateur", children: "Modérateur" }),
              /* @__PURE__ */ jsx("option", { value: "utilisateur", children: "Utilisateur" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Nom" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Email" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Rôle" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: filteredUsers.length > 0 ? filteredUsers.map((user) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: editedName,
              onChange: (e) => setEditedName(e.target.value),
              className: "p-1 border rounded"
            }
          ) : user.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: editedEmail,
              onChange: (e) => setEditedEmail(e.target.value),
              className: "p-1 border rounded"
            }
          ) : user.email }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: user.role,
              onChange: (e) => handleRoleChange(user._id, e.target.value),
              className: "p-1 border rounded",
              disabled: user.isAdmin,
              children: [
                /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
                /* @__PURE__ */ jsx("option", { value: "modérateur", children: "Modérateur" }),
                /* @__PURE__ */ jsx("option", { value: "utilisateur", children: "Utilisateur" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: editingUserId === user._id ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 mr-2",
                onClick: () => handleSave(user._id),
                children: "Enregistrer"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700",
                onClick: () => setEditingUserId(null),
                children: "Annuler"
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2",
                onClick: () => handleEdit(user),
                children: "Modifier"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700",
                onClick: () => handleDelete(user._id),
                children: "Supprimer"
              }
            )
          ] }) })
        ] }, user._id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-4 py-2 text-center", children: "Aucun utilisateur trouvé." }) }) })
      ] })
    ] })
  ] });
};
const basePerks = [
  // Base perks avec icônes déjà configurées
  {
    name: "wifi",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-wifi" })
    // Exemple avec Font Awesome
  },
  {
    name: "parking",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-parking" })
  },
  {
    name: "tv",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-tv" })
  },
  {
    name: "pets",
    icon: /* @__PURE__ */ jsx("i", { className: "fas fa-paw" })
  }
];
const AdminPerks = () => {
  const [perks, setPerks] = useState([]);
  const [newPerk, setNewPerk] = useState("");
  const API_BASE_URL2 = "http://localhost:4000";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL2}/api/admin/perks`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      const fetchedPerks = response.data.data;
      const perksWithIcons = fetchedPerks.map((perk) => {
        const foundPerk = basePerks.find((p) => p.name === perk.name);
        return foundPerk ? { ...perk, icon: foundPerk.icon } : perk;
      });
      setPerks(perksWithIcons);
    }).catch((error) => console.error("Erreur lors de la récupération des perks :", error));
  }, [API_BASE_URL2]);
  const handleAddPerk = () => {
    if (!newPerk.trim()) {
      alert("Le nom du perk est obligatoire.");
      return;
    }
    const token = localStorage.getItem("token");
    axios.post(
      `${API_BASE_URL2}/api/admin/perks`,
      { name: newPerk },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((response) => {
      setPerks([...perks, { name: newPerk, icon: null }]);
      setNewPerk("");
    }).catch((error) => console.error("Erreur lors de l’ajout du perk :", error));
  };
  const handleDeletePerk = (perkName) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce perk ?")) {
      return;
    }
    const token = localStorage.getItem("token");
    axios.delete(`${API_BASE_URL2}/api/admin/perks/${perkName}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setPerks(perks.filter((perk) => perk.name !== perkName));
    }).catch((error) => console.error("Erreur lors de la suppression du perk :", error));
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Perks" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Nom du perk...",
          value: newPerk,
          onChange: (e) => setNewPerk(e.target.value),
          className: "p-2 border rounded mr-2"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleAddPerk,
          className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700",
          children: "Ajouter"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Nom" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: perks.length > 0 ? perks.map((perk) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-2 text-center flex items-center justify-center", children: [
          perk.icon && /* @__PURE__ */ jsx("span", { className: "mr-2", children: perk.icon }),
          /* @__PURE__ */ jsx("span", { children: perk.name })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-2 text-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDeletePerk(perk.name),
            className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
            children: "Supprimer"
          }
        ) })
      ] }, perk.name)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "2", className: "px-4 py-2 text-center", children: "Aucun perk disponible." }) }) })
    ] })
  ] });
};
const AdminProperties = () => {
  const [places, setPlaces] = useState([]);
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [editedPlace, setEditedPlace] = useState({});
  const API_BASE_URL2 = "http://localhost:4000";
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL2}/api/admin/places`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => setPlaces(response.data.data)).catch((error) => console.error("Erreur lors de la récupération des propriétés :", error));
  }, [API_BASE_URL2]);
  const handleEditPlace = (place) => {
    setEditingPlaceId(place._id);
    setEditedPlace({ ...place });
  };
  const handleSavePlace = (placeId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir sauvegarder les modifications ?")) return;
    const token = localStorage.getItem("token");
    axios.put(`${API_BASE_URL2}/api/admin/places/${placeId}`, editedPlace, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      setPlaces(
        (prevPlaces) => prevPlaces.map(
          (place) => place._id === placeId ? response.data.data : place
        )
      );
      setEditingPlaceId(null);
    }).catch((error) => console.error("Erreur lors de la sauvegarde :", error));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlace((prevPlace) => ({ ...prevPlace, [name]: value }));
  };
  const handleDeletePlace = (placeId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) return;
    const token = localStorage.getItem("token");
    axios.delete(`${API_BASE_URL2}/api/admin/places/${placeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== placeId));
    }).catch((error) => console.error("Erreur lors de la suppression :", error));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Gestion des Propriétés - AtypikHouse" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Gérez les propriétés disponibles sur AtypikHouse. Modifiez, ajoutez ou supprimez les propriétés facilement."
        }
      ),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto mt-8 p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Gestion des Propriétés" }),
      places.length > 0 ? places.map((place) => /* @__PURE__ */ jsx("div", { className: "mb-8 p-4 border rounded", children: editingPlaceId === place._id ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "title",
            value: editedPlace.title,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Titre"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "address",
            value: editedPlace.address,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Adresse"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "description",
            value: editedPlace.description,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Description"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: "price",
            value: editedPlace.price,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Prix par nuit (€)"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            name: "maxGuests",
            value: editedPlace.maxGuests,
            onChange: handleInputChange,
            className: "p-2 border rounded mb-2 w-full",
            placeholder: "Nombre maximum d'invités"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleSavePlace(place._id),
            className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2",
            children: "Enregistrer"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setEditingPlaceId(null),
            className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700",
            children: "Annuler"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: place.title }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Adresse : ",
          place.address
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Description : ",
          place.description
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Prix : ",
          place.price,
          " € par nuit"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Nombre maximum d'invités : ",
          place.maxGuests
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleEditPlace(place),
            className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2",
            children: "Modifier"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDeletePlace(place._id),
            className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
            children: "Supprimer"
          }
        )
      ] }) }, place._id)) : /* @__PURE__ */ jsx("p", { className: "text-center", children: "Aucune propriété disponible." })
    ] })
  ] });
};
const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL2 = "http://localhost:4000";
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `${API_BASE_URL2}/api/admin/places/reviews`
        );
        setComments(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [API_BASE_URL2]);
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) return;
    try {
      await axiosInstance.delete(`${API_BASE_URL2}/api/admin/reviews/${commentId}`);
      setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };
  const handleDeleteReply = async (reviewId, replyId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) return;
    try {
      await axiosInstance.delete(
        `${API_BASE_URL2}/api/admin/reviews/${reviewId}/replies/${replyId}`
      );
      setComments(
        (prevComments) => prevComments.map(
          (comment) => comment._id === reviewId ? {
            ...comment,
            replies: comment.replies.filter((reply) => reply._id !== replyId)
          } : comment
        )
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la réponse :", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 px-8 pt-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold", children: "Modération des Commentaires" }),
    /* @__PURE__ */ jsx("div", { className: "mt-8", children: comments.length > 0 ? comments.map((comment) => {
      var _a2, _b;
      return /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 border rounded", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a2 = comment.user) == null ? void 0 : _a2.name) || "Utilisateur inconnu" }),
            /* @__PURE__ */ jsxs("span", { className: "ml-4 text-gray-500", children: [
              "Note : ",
              comment.rating,
              " / 5"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDeleteComment(comment._id),
              className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
              children: "Supprimer"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2", children: comment.comment }),
        ((_b = comment.replies) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 ml-4 border-l-2 pl-4", children: comment.replies.map((reply) => {
          var _a3;
          return /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: ((_a3 = reply.user) == null ? void 0 : _a3.name) || "Utilisateur inconnu" }),
              ": ",
              reply.comment
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDeleteReply(comment._id, reply._id),
                className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
                children: "Supprimer"
              }
            )
          ] }, reply._id);
        }) })
      ] }, comment._id);
    }) : /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Aucun commentaire pour l'instant." }) })
  ] });
};
const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  }
  location.pathname.startsWith("/admin");
  const isCommentsRoute = location.pathname === "/admin/comments";
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/login" });
  }
  if (user.isAdmin) {
    return children;
  }
  if (user.role === "modérateur" && isCommentsRoute) {
    return children;
  }
  return /* @__PURE__ */ jsx(Navigate, { to: "/not-authorized" });
};
function App({ initialData = {} }) {
  const location = useLocation();
  const initialPlaces = initialData.places || [];
  useEffect(() => {
    if (typeof window !== "undefined") {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getItemFromLocalStorage("token")}`;
    }
  }, []);
  return /* @__PURE__ */ jsx(GoogleOAuthProvider, { clientId: "113386016415-fpi8agr1d3smcvau618ntc8ma25kitbt.apps.googleusercontent.com", children: /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsxs(PlaceProvider, { initialPlaces, children: [
    /* @__PURE__ */ jsx(Routes, { location, children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(Layout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(IndexPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(RegisterPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/owner-benefits", element: /* @__PURE__ */ jsx(OwnerBenefitsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account", element: /* @__PURE__ */ jsx(ProfilePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places", element: /* @__PURE__ */ jsx(PlacesPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places/new", element: /* @__PURE__ */ jsx(PlacesFormPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/places/:id", element: /* @__PURE__ */ jsx(PlacesFormPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/place/:id", element: /* @__PURE__ */ jsx(PlacePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/account/bookings", element: /* @__PURE__ */ jsx(BookingsPage, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/account/bookings/:id",
          element: /* @__PURE__ */ jsx(SingleBookedPlace, {})
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/admin/dashboard", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminDashboard, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/users", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminUsers, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/equipments", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminPerks, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/properties", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminProperties, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "/admin/comments", element: /* @__PURE__ */ jsx(ProtectedAdminRoute, { children: /* @__PURE__ */ jsx(AdminComments, {}) }) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(ToastContainer, { autoClose: 2e3, transition: Slide })
  ] }) }) });
}
async function render(url) {
  let initialData = {};
  if (url === "/") {
    try {
      const api = process.env.API_BASE_URL || "http://localhost:4000";
      const { data } = await axios.get(`${api}/api/places`);
      initialData.places = data.places;
    } catch (e) {
      console.error("❌ SSR - erreur chargement places:", e.message);
      initialData.places = [];
    }
  }
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, { initialData }) })
  );
  return {
    html: appHtml,
    initialPlaces: initialData.places
  };
}
export {
  render
};
