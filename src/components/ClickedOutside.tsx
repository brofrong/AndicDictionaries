import { Component, JSX, onCleanup, onMount } from "solid-js";

interface props {
    children: JSX.Element,
    onClickedOutside: () => void,
}

export const ClickedOutside: Component<props> = ({ children, onClickedOutside }) => {
    let rootElement: HTMLDivElement;

    function isClickedOutside(e: MouseEvent) {
        if (!rootElement.contains(e.target)) {
            onClickedOutside();
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
        <div ref={rootElement}>
            {children}
        </div>
    )
}