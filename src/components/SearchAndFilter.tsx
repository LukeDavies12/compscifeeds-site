import type { CollectionEntry } from 'astro:content';
import { createSignal, createEffect } from 'solid-js';
import FeedsTable from './FeedsTable';

type FeedData = CollectionEntry<"feeds">;

export default function SearchAndFilter() {
    const [search, setSearch] = createSignal("");
    const [feeds, setFeeds] = createSignal<FeedData[]>([]);

    function handleSearch(event: { currentTarget: { value: any; }; }) {
        setSearch(event.currentTarget.value);
    }

    createEffect(() => {
        fetch(`/index.json?q=${encodeURIComponent(search())}`)
            .then((res) => res.json())
            .then((data) => {
                setFeeds(data);
            });
    }); 

    return <>
        <div class="flex flex-col">
            <input
                class="w-full text-lg px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 focus:bg-gray-200 placeholder:text-gray-700 focus:outline-none mb-12"
                type="text"
                placeholder="Search by Title, Author, and Topics..."
                value={search()}
                onInput={handleSearch}
            />
        </div>
        <FeedsTable feeds={feeds()} />
    </>;
}