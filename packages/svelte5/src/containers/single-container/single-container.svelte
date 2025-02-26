<script lang="ts">
  import { run } from 'svelte/legacy'

  import { ComponentCore, SingleContainer, SingleContainerConfigInterface, Tooltip, Annotations } from '@unovis/ts'
  import { arePropsEqual } from '../../utils/props'
  import { onDestroy, setContext } from 'svelte'

  // Generics
  type Data = $$Generic

  // Internal variables
  let chart: SingleContainer<Data> | undefined = $state()
  let ref: HTMLDivElement = $state()
  let component: ComponentCore<Data> = $state()
  let tooltip: Tooltip = $state()
  let annotations: Annotations = $state()

  // Props
  interface Props {
    data?: Data
    class?: string
    children?: import('svelte').Snippet
    [key: string]: any
  }

  let { data = undefined, class: className = '', children, ...rest }: Props = $props()
  /**
   * CSS class string. Requires `:global` modifier to take effect. _i.e._
   * ```css
   * div :global(.chart) { }
   * ```
   * @example
   * <div>
   *     <VisSingleContainer class='chart'>
   *        ...
   *     </VisSingleContainer>
   * </div>
   *
   * @see {@link https://svelte.dev/docs/svelte-components#styles}
   */

  let config: SingleContainerConfigInterface<Data> = $state()
  let propas = $derived(rest as SingleContainerConfigInterface<Data>)
  run(() => {
    config = { component, tooltip, annotations, ...propas }
  })

  // Helpers
  function initChart() {
    chart = new SingleContainer<Data>(ref, config, data)
  }
  function updateChart(forceUpdate = false) {
    if (forceUpdate) chart?.update(config, null, data)
    else if (shouldUpdate) chart?.updateContainer(config)
    shouldUpdate = false
  }

  // Reactive statements
  run(() => {
    chart?.setData(data)
  })
  let shouldUpdate
  run(() => {
    shouldUpdate = Object.keys(propas).some((k) => !arePropsEqual(chart?.config[k], propas[k]))
  })
  run(() => {
    if (shouldUpdate) updateChart()
  })
  run(() => {
    if (component) chart === undefined ? initChart() : updateChart(true)
  })

  // Lifecycle and contexts
  setContext('tooltip', () => ({
    update: (t: Tooltip) => {
      tooltip = t
    },
    destroy: () => {
      tooltip = undefined
    },
  }))

  setContext('component', () => ({
    update: (c: ComponentCore<Data>) => {
      component = c
    },
    destroy: () => {
      component = undefined
    },
  }))

  setContext('annotations', () => ({
    update: (a: Annotations) => {
      annotations = a
    },
    destroy: () => {
      annotations = undefined
    },
  }))

  onDestroy(() => chart?.destroy())
</script>

<vis-single-container bind:this={ref} class={`unovis-single-container ${className}`}>
  {@render children?.()}
</vis-single-container>

<style>
  .unovis-single-container {
    display: block;
    position: relative;
    width: 100%;
  }
</style>
