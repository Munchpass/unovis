<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { StackedBar, type StackedBarConfigInterface, type NumericAccessor } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic
  
  // props using runes
  const props = $props<{ data?: Datum[], x: NumericAccessor<Datum>, y: NumericAccessor<Datum> | NumericAccessor<Datum>[], [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<StackedBarConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ x: props.x, y: props.y, ...props })

  // component declaration
  let component = $state<StackedBar<Datum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new StackedBar<Datum>(config)
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
  function getComponent (): StackedBar<Datum> { return component }

</script>

<vis-component use:lifecycle={component}/>

