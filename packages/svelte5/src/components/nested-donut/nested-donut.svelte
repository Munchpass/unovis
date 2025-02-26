<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { NestedDonut, type NestedDonutConfigInterface, type StringAccessor } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic
  
  // props using runes
  const props = $props<{ data?: Datum[], layers: StringAccessor<Datum>[], [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<NestedDonutConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ layers: props.layers, ...props })

  // component declaration
  let component = $state<NestedDonut<Datum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new NestedDonut<Datum>(config)
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
  function getComponent (): NestedDonut<Datum> { return component }

</script>

<vis-component use:lifecycle={component}/>

