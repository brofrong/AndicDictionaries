import { Component, Setter, Show, createEffect, createSignal } from "solid-js";
import SettingsIcon from '../assets/svg/settings_FILL0_wght300_GRAD0_opsz24.svg';
import { ClickedOutside } from "./ClickedOutside";
import { DropDownMenu } from "./DropDownMenu";
import { TableStore } from "../search/tableStore";
import { difference } from 'lodash';

interface props {
    tableStore: TableStore,
}

export const Settings: Component<props> = ({ tableStore }) => {
    const [show, setShow] = createSignal(false);

    function onClickedOutside() {
        if (show()) {
            setShow(false);
        }
    }

    return (
        <div class="flex items-center cursor-pointer relative">
            <ClickedOutside onClickedOutside={onClickedOutside}>
                <SettingsIcon onClick={() => setShow(!show())} class={`w-6 h-6 fill-white transition-transform select-none ${show() && 'rotate-180'}`} />
                <Show when={show()}>
                    <SettingsModal tableStore={tableStore} setShow={setShow} />
                </Show>
            </ClickedOutside>
        </div>
    )
}

interface modalProps {
    setShow: Setter<boolean>,
    tableStore: TableStore,
}

const SettingsModal: Component<modalProps> = ({ setShow, tableStore }) => {
    const [headers, setHeaders] = createSignal<string[]>(tableStore.tableFullData.header);

    createEffect(() => {
        const toHide = difference(tableStore.tableFullData.header, headers());
        const hideIndexes = toHide.map((it) => tableStore.tableFullData.header.findIndex((h) => h === it));
        tableStore.setColumnsToHide(hideIndexes);
    })


    return (
        <div class="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl dark:bg-gray-700 animate-in fade-in">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Настройки
                </h3>
                <button onClick={() => setShow(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-6 space-y-6 border-b rounded-t dark:border-gray-600">
                <label for="steps-range" class="block font-medium text-gray-900 dark:text-white">Точность поиска: {tableStore.fuzzyAccuracy()}% </label>
                <span class="text-gray-400 text-sm">Снижение точности может значительно повысить время поиска! 🚦</span>
                <input onInput={(e) => tableStore.setFuzzyAccuracy(+e.target.value)} id="steps-range" type="range" min="0" max="100" value={tableStore.fuzzyAccuracy()} step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            </div>
            <div class="p-6 space-y-6 border-b rounded-t dark:border-gray-600">
                <label for="steps-range" class="block font-medium text-gray-900 dark:text-white">Колонки по будут отображаться в таблице</label>
                <span class="text-gray-400 text-sm">Если скрыть колонку, то по прежднему можно будет ввести поиск 😀</span>
                <DropDownMenu label="Выбор колонок для отображения" searchFields={tableStore.tableFullData.header} setSearchFields={setHeaders}></DropDownMenu>
            </div>
        </div>
    )
}