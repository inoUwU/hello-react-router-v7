import {
	type RouteConfig,
	index,
	route,
	layout,
	prefix,
} from "@react-router/dev/routes";

export default [
	layout("layouts/sidemenu.tsx", [
		index("routes/home.tsx"),
		route("popular", "routes/popular.tsx"),
		route("search", "routes/search.tsx"),
	]),
	...prefix("v1", [
		...prefix("system", [route("health", "routes/health.tsx")]),
	]),
] satisfies RouteConfig;
