import { createResource } from 'solid-js';
import { ThemeInfo } from './typeDefs';

const fetchTheme = async () => (await fetch('https://kxqd7cf966.execute-api.us-west-1.amazonaws.com/dev/themes?siteKey=browniebits')).json();
export const [theme] = createResource<ThemeInfo>(fetchTheme);


const fetchJokes = async () => (await fetch('https://official-joke-api.appspot.com/jokes/programming/ten')).json();
export const [jokes] = createResource(fetchJokes);