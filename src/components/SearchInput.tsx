import { Accessor, Component, For, Setter, createSignal, onCleanup, onMount } from "solid-js"
import SearchIcon from "../assets/svg/search_FILL0_wght300_GRAD0_opsz48.svg";
import ExpandMore from "../assets/svg/expand_more_FILL0_wght300_GRAD0_opsz24.svg";

interface props {
    searchFields: string[],
    setSearchFields: Setter<string[]>,
    setSearch: Setter<string>,
}

export const SearchInput: Component<props> = ({ searchFields, setSearch, setSearchFields }) => {
    return (
        <>
            <div class="flex relative">
                <DropDownMenu setSearchFields={setSearchFields} searchFields={searchFields} />
                <div class="relative w-full">
                    <SearchIcon class='absolute top-2 left-2 fill-gray-600' />
                    <input onInput={(event) => { setSearch(event.target.value) }} type="search" id="location-search" class="block p-2.5 pl-9 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Поиск по таблице" />
                </div>
            </div>
        </>
    )
}

interface dropProps {
    searchFields: string[],
    setSearchFields: Setter<string[]>,
}

const DropDownMenu: Component<dropProps> = ({ searchFields, setSearchFields }) => {
    let tableHead: HTMLUListElement;
    let dropdownRoot: HTMLDivElement;
    const [show, setShow] = createSignal(false);

    function updateSelected() {
        const ret = [];
        const inputs = tableHead.querySelectorAll("input");

        inputs.forEach(it => it.checked ? ret.push(it.value) : null);
        setSearchFields(ret);
    }

    function isClickedOutside(e: MouseEvent) {
        if (!dropdownRoot.contains(e.target) && show()) {
            setShow(false);
        }
    }

    onMount(() => {
        window.addEventListener('click', isClickedOutside);
    })

    onCleanup(() => {
        window.removeEventListener('click', isClickedOutside);
    }
    )

    return (
        <div ref={dropdownRoot}>
            <button onClick={() => setShow(!show())} class="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                Выбор полей
                <ExpandMore class="w-4 h-4 ml-1" />
            </button>
            <div id="dropdown-search-city" class={`${!show() ? "hidden" : ""} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-12`}>
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
    )


}