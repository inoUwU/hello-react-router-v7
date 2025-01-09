import { Link, Outlet } from "react-router";

export default function Sidemenu() {
	const menuItems = [
		{ name: "記事一覧", href: "/" },
		{ name: "人気記事", href: "/popular" },
		{ name: "記事検索", href: "/search" },
	];

	return (
		<div>
			<aside className="fixed top-0 left-0 w-64 z-40 h-full bg-white shadow-lg text-white">
				<div>
					<nav>
						{menuItems.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className="flex items-center px-4 text-gray-700 hover:bg-gray-100"
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>
			</aside>
			<Outlet />
		</div>
	);
}
