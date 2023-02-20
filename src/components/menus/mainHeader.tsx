import styles from './mainHeader.module.scss';
import { Show, For, Suspense } from "solid-js";
import { A, useLocation } from "solid-start";
import { theme } from '../../lib/store';


export default function MainHeader ( ) {
    const location = useLocation();
    return (
        <>
        <span>{theme.loading && "Loading..."}</span>
        <Suspense>
            <Show 
            when={location.pathname != '/checkout'}
            fallback={<></>}
            >
                
                <header class={styles.header} style={`background:#000000`}>
                    <A href="/">
                        <div class={styles.logo}>
                            <h1 style={`color:${[theme()?.styles.header.textStyles.color]}`}>Brownie Bits</h1>
                            {/* <Show 
                            when={themeInfo().content.header.logo != ''}
                            fallback={<h1 style={`color:${[themeInfo().styles.header.textStyles.color]}`}>Brownie Bits</h1>}>
                                <img src={themeInfo().content.header.logo} height={themeInfo().styles.header.logo.maxHeight}/>
                            </Show> */}
                        </div>
                    </A>
                    <nav class={styles.nav}>
                        
                    {/* <For each={props.collections}>
                        {collection => {
                            return <li>
                            <A href={`/${collection.name}`}>
                            {collection.name}
                            </A>
                            </li>
                        }}
                    </For> */}
                    </nav>
                </header>
            </Show>
        </Suspense>
        </>
    )
}