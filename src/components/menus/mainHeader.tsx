import styles from './mainHeader.module.scss';
import { Show, For } from "solid-js";
import { A } from "solid-start";
import { themeInfo } from '../../lib/store';

export default function MainHeader ( ) {
    return (
        <Show 
        when={themeInfo().storeKey != ''}
        fallback={<></>}
        >
            <header class={styles.header} style={`background:${themeInfo().styles.header.bgStyles.backgroundColor}`}>
                <A href="/">
                    <div class={styles.logo}>
                        <Show 
                        when={themeInfo().content.header.logo != ''}
                        fallback={<h1 style={`color:${[themeInfo().styles.header.textStyles.color]}`}>Brownie Bits</h1>}>
                            <img src={themeInfo().content.header.logo} height={themeInfo().styles.header.logo.maxHeight}/>
                        </Show>
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
    )
}