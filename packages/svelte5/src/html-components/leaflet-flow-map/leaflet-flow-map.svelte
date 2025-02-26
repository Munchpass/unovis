<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { LeafletFlowMap, type LeafletFlowMapConfigInterface, type GenericDataRecord, type MapLibreStyleSpecs } from '@unovis/ts'
  import { onMount } from 'svelte'
  
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type PointDatum = $$Generic<GenericDataRecord>
  type FlowDatum = $$Generic<GenericDataRecord>
  
  // props using runes
  const props = $props<{ data?: { points: PointDatum[]; flows?: FlowDatum[] }, style: MapLibreStyleSpecs | string | undefined, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<LeafletFlowMapConfigInterface<PointDatum, FlowDatum> | undefined>(undefined)
  const config = $derived({ style: props.style, ...props })

  // component declaration
  let component = $state<LeafletFlowMap<PointDatum, FlowDatum> | undefined>(undefined)
  let ref = $state<HTMLDivElement | undefined>(undefined)

  onMount(() => {
    component = new LeafletFlowMap<PointDatum, FlowDatum>(ref, config, data)
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
  function getComponent (): LeafletFlowMap<PointDatum, FlowDatum> { return component }

</script>

<vis-leaflet-flow-map bind:this={ref}/>

<style>
  vis-leaflet-flow-map {
    display:block;
    position:relative;
  }
</style>
