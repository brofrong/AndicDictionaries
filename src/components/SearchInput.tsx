import { Accessor, Component, For, Setter, createSignal, onCleanup, onMount } from "solid-js"
import SearchIcon from "../assets/svg/search_FILL0_wght300_GRAD0_opsz48.svg";

import { ClickedOutside } from "./ClickedOutside";
import { DropDownMenu } from "./DropDownMenu";

interface props {
    searchFields: string[],
    setSearchFields: Setter<string[]>,
    setSearch: Setter<string>,
}

export const SearchInput: Component<props> = ({ searchFields, setSearch, setSearchFields }) => {
    return (
        <div class="flex flex-grow relative">
            <DropDownMenu label="Выбор полей" setSearchFields={setSearchFields} searchFields={searchFields} />
            <div class="relative w-full">
                <SearchIcon class='absolute top-2 left-2 fill-gray-600' />
                <input onInput={(event) => { setSearch(event.target.value) }} type="search" id="location-search" class="block p-2.5 pl-9 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Поиск по таблице" />
            </div>
        </div>
    )
}
