<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Crosshair, type CrosshairConfigInterface, type NumericAccessor } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic
  
  // props using runes
  const props = $props<{ data?: Datum[], x: NumericAccessor<Datum>, y: NumericAccessor<Datum> | NumericAccessor<Datum>[], [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<CrosshairConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ x: props.x, y: props.y, ...props })

  // component declaration
  let component = $state<Crosshair<Datum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('crosshair')

  onMount(() => {
    component = new Crosshair<Datum>(config)
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
  function getComponent (): Crosshair<Datum> { return component }

</script>

<vis-crosshair use:lifecycle={component}/>

