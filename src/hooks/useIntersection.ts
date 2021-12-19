import { useEffect } from 'react';

interface Observer extends Partial<IntersectionObserver> {
    disconnect(): void;
    observe(target: Element): void;
    takeRecords(): IntersectionObserverEntry[];
    unobserve(target: Element): void;
}

interface Entry {
    target: any;
    intersectionRatio: number;
    isIntersecting: boolean;
}

let listenerCallbacks = new WeakMap();

let observer: Observer;

function handleIntersections(entries: Entry[]) {
    entries.forEach(entry => {
        if (listenerCallbacks.has(entry.target)) {
            let cb = listenerCallbacks.get(entry.target);

            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                listenerCallbacks.delete(entry.target);
                cb();
            }
        }
    });
}

function getIntersectionObserver() {
    if (observer === undefined) {
        observer = new IntersectionObserver(handleIntersections, {
            rootMargin: '100px',
            threshold: 0.15,
        });
    }
    return observer;
}

export function useIntersection(elem: any, callback: () => void) {
    useEffect(() => {
        let target = elem.current;
        let observer = getIntersectionObserver();
        listenerCallbacks.set(target, callback);
        observer.observe(target);

        return () => {
            listenerCallbacks.delete(target);
            observer.unobserve(target);
        };
    }, []);
}