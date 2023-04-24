import { Component, For, Setter, createSignal } from "solid-js";
import { ClickedOutside } from "./ClickedOutside";
import ExpandMore from "../assets/svg/expand_more_FILL0_wght300_GRAD0_opsz24.svg";

interface dropProps {
    searchFields: string[],
    setSearchFields: Setter<string[]>,
    label: string,
}

export const DropDownMenu: Component<dropProps> = ({ searchFields, setSearchFields, label }) => {
    let tableHead: HTMLUListElement;
    const [show, setShow] = createSignal(false);

    function updateSelected() {
        const ret = [];
        const inputs = tableHead.querySelectorAll("input");

        inputs.forEach(it => it.checked ? ret.push(it.value) : null);
        setSearchFields(ret);
    }

    function onClickedOutside() {
        if (show()) {
            setShow(false);
        }
    }

    return (
        <ClickedOutside onClickedOutside={onClickedOutside}>
            <div class='relative'>
                <button onClick={() => setShow(!show())} class="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                    {label}
                    <ExpandMore class="w-4 h-4 ml-1" />
                </button>
                <div id="dropdown-search-city" class={`${!show() ? "hidden" : ""} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-12 animate-in fade-in`}>
                    <ul ref={tableHead} class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-2">
                        <For each={searchFields}>
                            {
                                (header) => (
                                    <li>
                                        <label>
                                            <div class="cursor-pointer inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                                <input class='mr-4' type="checkbox" name="search-title-select" value={header} checked={true} onChange={() => updateSelected()} />
                                                <div class="flex-grow">{header}</div>
                                            </div>
                                        </label>
                                    </li>
                                )
                            }
                        </For>
                    </ul>
                </div >
            </div>
        </ClickedOutside>
    )


}