<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Axis, type AxisConfigInterface } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic
  
  // props using runes
  const props = $props<{ data?: Datum[], [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<AxisConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ ...props })

  // component declaration
  let component = $state<Axis<Datum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('axis')

  onMount(() => {
    component = new Axis<Datum>(config)
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
  function getComponent (): Axis<Datum> { return component }

</script>

<vis-axis use:lifecycle={component}/>

