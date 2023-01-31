import fs from "node:fs";
import { stringify } from "yaml";

const dbId = "30931a8ad3ff4abe9fab3e9c5a8312b9";
const feedPath = (feedId) => `./src/content/feeds/${feedId}.md`;
const feeds = [];

const url = `https://api.notion.com/v1/databases/${dbId}/query`;
const options = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    accept: 'application/json',
    'Notion-Version': '2022-06-28',
    'content-type': 'application/json'
  },
  body: JSON.stringify({page_size: 100})
};

fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
        for (const item of json.results ?? []) {
            feeds.push(
                {
                    id: item.id,
                    title: item.properties.Name.title[0].plain_text,
                    author: item.properties.Author.rich_text[0].plain_text,
                    htmlLink: item.properties.htmlLink.url,
                    feedLink: item.properties.feedLink.url,
                    tags: item.properties.Tags.multi_select.map((tag) => tag.name),
                }
            );
        }
        feeds.forEach((feed) => {
          fs.writeFileSync(
              feedPath(feed.id),
`---
${stringify({
    id: feed.id,
    title: feed.title,
    author: feed.author,
    htmlLink: feed.htmlLink,
    feedLink: feed.feedLink,
    tags: feed.tags,
})}---
`
          );
      });
    });

const feedFiles = fs.readdirSync("./src/content/feeds");
fs.writeFileSync(
    "./src/content/feeds.ts",
    `export enum FeedIDsType { ${feedFiles
        .map((v) => `"${v}" = "${v}"`)
        .join(", ")} }`
);
