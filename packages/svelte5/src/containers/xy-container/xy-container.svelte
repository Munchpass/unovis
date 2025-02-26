<script lang="ts">
  import { run } from 'svelte/legacy';

  import { XYContainer, XYComponentCore, XYContainerConfigInterface, Tooltip, Crosshair, Axis, Annotations } from '@unovis/ts'
  import { onMount, setContext } from 'svelte'

  type Datum = $$Generic
  

  // Props
  interface Props {
    data?: Datum[];
    class?: string;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { data = undefined, class: className = '', children, ...rest }: Props = $props();
  /**
   * CSS class string. Requires `:global` modifier to take effect. _i.e._
   * ```css
   * div :global(.chart) { }
   * ```
   * @example
   * <div>
   *     <VisXYContainer class='chart'>
   *        ...
   *     <VisXYContainer>
   * </div>
   *
   * @see {@link https://svelte.dev/docs/svelte-components#styles}
  */
  

  let chart: XYContainer<Datum> = $state()
  const config: XYContainerConfigInterface<Datum> = $state({
    components: [],
    crosshair: undefined,
    tooltip: undefined,
    xAxis: undefined,
    yAxis: undefined,
    annotations: undefined,
  })
  let ref: HTMLDivElement = $state()

  run(() => {
    chart?.setData(data, true)
  });

  let animationFrame = 0;
	const updateContainer = async () => {
    // due to the order of events when a component is removed update container can be called
    // while a component is being destroyed. This can lead to an error because we trigger an update
    // with a destroyed component.
		config.components = config.components?.filter((e) => !e.isDestroyed());

		// we can't use animation frames in a non-browser environment
		if (typeof requestAnimationFrame === 'undefined') {
			chart?.updateContainer({
				...config,
				...(rest as XYContainerConfigInterface<Datum>)
			});

			return;
		}

		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}

		// this prevent multiple renders from happening in a single frame
		// when a component is first rendered the components will be pushed 1 by 1
		// so we don't want to rerender every time a component is added
		animationFrame = requestAnimationFrame(() => {
			chart?.updateContainer({
				...config,
				...(rest as XYContainerConfigInterface<Datum>)
			});
      animationFrame = 0;
		});
	};

  run(() => {
    config;
    rest;
    updateContainer()
  });

  onMount(() => {
    chart = new XYContainer(ref, config, data)
    return () => chart.destroy()
  })

  setContext('component', () => ({
    update: (c: XYComponentCore<Datum>) => {
      if (config.components?.includes(c)) return
      config.components = [...config.components, c]
    },
    destroy: () => { config.components = config.components.filter(c => !c.isDestroyed()) },
  }))
  setContext('axis', (e: HTMLElement & { __type__?: 'x' | 'y'}) => ({
    update: (c: Axis<Datum>) => {
      if (config[`${e.__type__}Axis`] === c) return
      e.__type__ = c.config.type as 'x' | 'y'
      config[`${e.__type__}Axis`] = c
    },
    destroy: () => { config[`${e.__type__}Axis`] = undefined },
  }))
  setContext('crosshair', () => ({
    update: (c: Crosshair<Datum>) => {
      if (config.crosshair === c) return
      config.crosshair = c
    },
    destroy: () => { config.crosshair = undefined },
  }))
  setContext('tooltip', () => ({
    update: (t: Tooltip) => {
      if (config.tooltip === t) return
      config.tooltip = t
    },
    destroy: () => { config.tooltip = undefined },
  }))
  setContext('annotations', () => ({
    update: (a: Annotations) => {
      if (config.annotations === a) return
      config.annotations = a
    },
    destroy: () => { config.annotations = undefined },
  }))
</script>

<vis-xy-container bind:this={ref} class={`unovis-xy-container ${className}`}>
  {@render children?.()}
</vis-xy-container>


<style>
  .unovis-xy-container {
    display: block;
    position: relative;
    width: 100%;
  }
</style>
