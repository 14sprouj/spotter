import {
	type RouteConfig,
	index,
	route
} from "@react-router/dev/routes";

export default [
  index("./pages/home.tsx"),
  route("about", "./pages/about.tsx"),

//  layout("./pages/auth/layout.tsx", [
    route("login", "./pages/auth/login.tsx"),
    route("register", "./pages/auth/register.tsx"),
//  ]),

//  ...prefix("concerts", [
//    index("./pages/concerts/home.tsx"),
//    route(":city", "./pages/concerts/city.tsx"),
//    route("trending", "./pages/concerts/trending.tsx"),
//  ]),
] satisfies RouteConfig;
