<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { TopoJSONMap, type TopoJSONMapConfigInterface } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type AreaDatum = $$Generic
  type PointDatum = $$Generic
  type LinkDatum = $$Generic
  
  // props using runes
  const props = $props<{ data?: {areas?: AreaDatum[]; points?: PointDatum[]; links?: LinkDatum[]}, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<TopoJSONMapConfigInterface<AreaDatum, PointDatum, LinkDatum> | undefined>(undefined)
  const config = $derived({ ...props })

  // component declaration
  let component = $state<TopoJSONMap<AreaDatum, PointDatum, LinkDatum> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new TopoJSONMap<AreaDatum, PointDatum, LinkDatum>(config)
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
  function getComponent (): TopoJSONMap<AreaDatum, PointDatum, LinkDatum> { return component }

</script>

<vis-component use:lifecycle={component}/>

