import { Component, For, createEffect, createSignal, onMount } from "solid-js";
import { TableInfo } from "../search/table";
import { ScrolledToEnd } from "./ScrolledToEnd";
import { TableStore } from "../search/tableStore";

type param = { table: TableStore, onSelectSearch: (index: string[]) => void }

export const Table: Component<param> = ({ table, onSelectSearch }) => {
    let tableHead: HTMLTableRowElement;

    function updateSelected() {
        const ret = [];
        const inputs = tableHead.querySelectorAll("input");

        inputs.forEach(it => it.checked ? ret.push(it.value) : null);
        onSelectSearch(ret)
    }

    return (
        <ScrolledToEnd onScrolledToEnd={() => table.showMore()}>
            <table>
                <thead>
                    <tr ref={tableHead}>
                        <For each={table.tableFullData.header} >
                            {(title, index) => <th><input type="checkbox" name="search-title-select" value={title} checked={true} onChange={() => updateSelected()} />{title}</th>}
                        </For>
                    </tr>
                </thead>
                <tbody>
                    <For each={table.rowsToDisplay()} fallback={<div>Ничего не найдено...</div>}>
                        {(rows) =>
                            <tr>
                                <For each={rows}>
                                    {(row) => <td>{row}</td>}
                                </For>
                            </tr>
                        }
                    </For>
                    <tr></tr>
                </tbody>
            </table>
        </ScrolledToEnd>
    )
} 