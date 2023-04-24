import { Component, For, Show, createEffect, createSignal, onMount } from "solid-js";
import { TableInfo } from "../search/table";
import { ScrolledToEnd } from "./ScrolledToEnd";
import { TableStore } from "../search/tableStore";

type param = { table: TableStore }

export const Table: Component<param> = ({ table }) => {
    return (
        <ScrolledToEnd onScrolledToEnd={() => table.showMore()}>
            <div class="overflow-x-auto">
                <div class="w-full">
                    <div class="bg-white shadow-md rounded my-6">
                        <table class="min-w-max w-full table-auto">
                            <thead>
                                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <For each={table.tableFullData.header} >
                                        {(title) =>
                                            <th class="py-3 px-6 text-left">
                                                {title}
                                            </th>}
                                    </For>
                                </tr>
                            </thead>
                            <tbody class="text-gray-600 text-sm font-light">
                                <For each={table.rowsToDisplay()} >
                                    {(rows, index) =>
                                        <tr class={`border-b border-gray-200 ${index() % 2 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                            <For each={rows}>
                                                {(row) => <td class="py-3 px-6 text-left whitespace-nowrap">{row}</td>}
                                            </For>
                                        </tr>
                                    }
                                </For>
                            </tbody>
                        </table>
                        <Show when={!table.rowsToDisplay()?.length}>
                            <NoTableData />
                        </Show>
                    </div>
                </div>
            </div>
        </ScrolledToEnd>
    )
}


const NoTableData: Component = () => {
    return (
        <div class="w-full text-center p-4 text-gray-600">
            Ничего не найдено
        </div>
    )
}