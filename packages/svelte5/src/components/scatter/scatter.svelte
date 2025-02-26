<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Scatter, type ScatterConfigInterface, type NumericAccessor } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic
  
  // props using runes
  const props = $props<{ data?: Datum[], x: NumericAccessor<Datum>, y: NumericAccessor<Datum> | NumericAccessor<Datum>[], [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<ScatterConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ x: props.x, y: props.y, ...props })

  // component declaration
  let component = $state<Scatter<Datum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new Scatter<Datum>(config)
    return () => component?.destroy()
  })
  
  $effect(() => {
    component?.setData(props.data)
    component?._render();
  })
  
  $effect(() => {
    if (!arePropsEqual(prevConfig, config)) {
      component?.setConfig(config)
      prevConfig = config
    }
  })

  // component accessor
  function getComponent (): Scatter<Datum> { return component }

</script>

<vis-component use:lifecycle={component}/>

