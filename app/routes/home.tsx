import type { Route } from "./+types/home";
import type { ArticleJson } from "~/domain/Article";
import { Article } from "~/domain/Article";

export async function loader({ params }: Route.LoaderArgs) {
	const token = process.env.PERSONAL_TOKEN;
	const res = await fetch("https://qiita.com/api/v2/authenticated_user/items", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const articleJson: ArticleJson[] = await res.json();
	const articles = articleJson.map(
		(json) =>
			new Article(
				json.title,
				json.body,
				json.likes_count,
				json.stocks_count,
				json.created_at,
			),
	);
	return { articles };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { articles } = loaderData;
	console.log(articles);
	return (
		<div>
			<div className="flex sm:ml-64">
				<h1>記事一覧</h1>
			</div>
			<div className="container mx-auto px-4 py-8">
				{articles.map((article) => (
					<p key={article.url}>{article.title}</p>
				))}
			</div>
		</div>
	);
}
