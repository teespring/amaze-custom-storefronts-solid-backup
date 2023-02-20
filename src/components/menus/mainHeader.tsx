import styles from './mainHeader.module.scss';
import { Show, For, Suspense, createResource } from "solid-js";
import { A, useLocation } from "solid-start";
import { theme } from '../../lib/store';

const fetchJokes = async (id) => (await fetch(`https://official-joke-api.appspot.com/jokes/programming/ten`)).json();

export default function MainHeader ( ) {
    const location = useLocation();
    const [jokes] = createResource(fetchJokes);
    return (
        <>
        <span>{jokes.loading && "Loading..."}</span>
        <pre>{JSON.stringify(jokes(), null, 2)}</pre>
        </>
    )
}