import type { CollectionEntry } from "astro:content";
import { Icon } from "solid-heroicons";
import { clipboardDocument } from "solid-heroicons/outline";

export default function FeedsTable(props: { feeds: CollectionEntry<"feeds">[] }) {
    return <>
        <div class="relative overflow-x-auto shadow-sm sm:rounded-lg">
            <table class="w-full text-left text-gray-600 text-lg">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Author
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Site Link
                        </th>
                        <th scope="col" class="px-6 py-3">
                            RSS Link
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Topics
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.feeds.map(({ data }) => (
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {data.title}
                            </th>
                            <td class="px-6 py-4">
                                {data.author}
                            </td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center">
                                    <a href={data.htmlLink} class="underline">{data.htmlLink}</a> 
                                    <span onClick={() =>  navigator.clipboard.writeText(data.htmlLink)} class="cursor-pointer">
                                        <Icon path={clipboardDocument} style="width: 24px; color: gray-700" class="ml-2 hover:text-gray-500 active:text-gray-400"></Icon>
                                    </span>
                                </span>
                            </td>
                            <td class="px-6 py-4">
                            <span class="inline-flex items-center">
                                    <a href={data.htmlLink} class="underline">{data.feedLink}</a> 
                                    <span onClick={() =>  navigator.clipboard.writeText(data.feedLink)} class="cursor-pointer">
                                        <Icon path={clipboardDocument} style="width: 24px; color: gray-700" class="ml-2 hover:text-gray-500 active:text-gray-400"></Icon>
                                    </span>
                                </span>
                            </td>
                            <td class="px-6 py-4">
                               {data.tags.map((tag) => (
                                   <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-base font-medium bg-gray-50 text-gray-800 ml-2 mt-2">
                                       {tag}
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </>;
}