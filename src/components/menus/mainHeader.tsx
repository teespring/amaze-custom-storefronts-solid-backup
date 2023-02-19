import styles from './mainHeader.module.scss';
import { Show, For } from "solid-js";
import { A } from "solid-start";

export default function MainHeader ( props: {
    styles: {
        bgStyles: {backgroundColor: string},
        logo: {maxHeight: string},
        template: number,
        textStyles: {color: string},
    },
    logo?: string
    storeName: string
    collections: { 
        name: number, 
        slug: string,
        collections?: { 
            name: number, 
            slug: string, 
        }[]
    }[]
  } ) {
    return (
        <header class={styles.header} style={`background:${props.styles.bgStyles.backgroundColor}`}>
            <A href="/">
                <div class={styles.logo}>
                    <Show 
                    when={props.logo != ''}
                    fallback={<h1 style={`color:${[props.styles.textStyles.color]}`}>{props.storeName}</h1>}>
                        <img src={props.logo} height={props.styles.logo.maxHeight}/>
                    </Show>
                </div>
            </A>
            <nav class={styles.nav}>
                
            <For each={props.collections}>
                {collection => {
                    return <li>
                    <A href={`/${collection.name}`}>
                    {collection.name}
                    </A>
                    </li>
                }}
            </For>
            </nav>
        </header>
    )
}