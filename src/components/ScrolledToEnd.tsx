import { Component, JSX, onCleanup, onMount } from "solid-js"

type props = {
    children: JSX.Element,
    onScrolledToEnd: () => void,
}

export const ScrolledToEnd: Component<props> = ({ children, onScrolledToEnd }) => {
    let divToLoadMore: HTMLDivElement | undefined;
    let observer: IntersectionObserver | undefined;

    const checkIsIntersecting: IntersectionObserverCallback = (event) => {
        const element = event[0];
        if (element.isIntersecting) {
            onScrolledToEnd();
        }
    }

    onMount(() => {
        if (divToLoadMore) {
            observer = new IntersectionObserver(checkIsIntersecting);
            observer.observe(divToLoadMore)
        }
    });

    onCleanup(() => {
        observer?.disconnect();
    });

    return (
        <>
            {children}
            <div ref={divToLoadMore}></div>
        </>
    )
}