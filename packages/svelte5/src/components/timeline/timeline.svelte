<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Timeline, type TimelineConfigInterface, type NumericAccessor } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic
  
  // props using runes
  const props = $props<{ data?: Datum[], x: NumericAccessor<Datum>, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<TimelineConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ x: props.x, ...props })

  // component declaration
  let component = $state<Timeline<Datum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new Timeline<Datum>(config)
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
  function getComponent (): Timeline<Datum> { return component }

</script>

<vis-component use:lifecycle={component}/>

