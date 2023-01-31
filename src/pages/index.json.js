import { getCollection } from "astro:content";
import lunr from "lunr";
import { URL } from "node:url";

const feedsPromise = getCollection("feeds").then((feeds) => ({
    feeds,
    index: lunr(function () {
        this.ref("id");
        this.field("title");
        this.field("author");
        this.field("htmlLink");
        this.field("feedLink")
        this.field("tags");

        feeds.forEach((feed) => {
            this.add({
                title: feed.data.title,
                author: feed.data.author,
                htmlLink: feed.data.htmlLink,
                feedLink: feed.data.feedLink,
                tags: feed.data.tags,
                id: feed.id,
            });
        });
    })
}));

export async function get({ request }) {
    const feedIndex = await feedsPromise;

    const q = new URL(request.url).searchParams.get("q")?.toLowerCase();

    const feeds = feedIndex.index
        .search(q ?? "")
        .map((res) => {
            const id = res.ref;
            return feedIndex.feeds.find((feed) => feed.id === id);
        })
        .filter((a) => a)
        .sort(
            (a, b) => b.data.title - a.data.title
        );

    return new Response(JSON.stringify(feeds.slice(0, 10)), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}