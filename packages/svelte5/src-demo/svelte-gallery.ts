// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import App from './svelte-gallery.svelte'
import { mount } from "svelte";

const index = mount(App, {
  target: document.body,
})

export { index }
