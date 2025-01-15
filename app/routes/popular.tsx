import { Article, type ArticleJson } from "~/domain/Article";
import type { Route } from "./+types/popular";
export async function loader({ params }: Route.LoaderArgs) {
	const token = process.env.PERSONAL_TOKEN;
	console.log(token);
	const res = await fetch("https://qiita.com/api/v2/items?page=1&per_page=20", {
		headers: {
			"Content-Type": "application/json",
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

export default function Popular({ loaderData }: Route.ComponentProps) {
	const { articles } = loaderData;
	return (
		<div>
			<div className="flex sm:ml-64">
				<h1>人気記事一覧</h1>
			</div>
			<div className="container mx-auto px-4 py-8">
				{articles.map((article) => (
					<p key={article.url}>{article.title}</p>
				))}
			</div>
		</div>
	);
}
