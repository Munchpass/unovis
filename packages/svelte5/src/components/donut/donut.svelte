<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Donut, type DonutConfigInterface, type NumericAccessor } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic
  
  // props using runes
  const props = $props<{ data?: Datum[], value: NumericAccessor<Datum>, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<DonutConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ value: props.value, ...props })

  // component declaration
  let component = $state<Donut<Datum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new Donut<Datum>(config)
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
  function getComponent (): Donut<Datum> { return component }

</script>

<vis-component use:lifecycle={component}/>

