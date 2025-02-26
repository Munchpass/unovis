<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { LeafletMap, LeafletMapConfigInterface, GenericDataRecord, MapLibreStyleSpecs } from '@unovis/ts'
  import { onMount } from 'svelte'
  
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type Datum = $$Generic<GenericDataRecord>
  
  // props using runes
  const props = $props<{ data?: Datum[], style: MapLibreStyleSpecs | string | undefined, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<LeafletMapConfigInterface<Datum> | undefined>(undefined)
  const config = $derived({ style: props.style, ...props })

  // component declaration
  let component = $state<LeafletMap<Datum> | undefined>(undefined)
  let ref = $state<HTMLDivElement | undefined>(undefined)

  onMount(() => {
    component = new LeafletMap<Datum>(ref, config, data)
    return () => component?.destroy()
  })
  
  $effect(() => {
    component?.setData(props.data)
  })
  
  $effect(() => {
    if (!arePropsEqual(prevConfig, config)) {
      component?.setConfig(config)
      prevConfig = config
    }
  })

  // component accessor
  function getComponent (): LeafletMap<Datum> { return component }

</script>

<vis-leaflet-map bind:this={ref}/>

<style>
  vis-leaflet-map {
    display:block;
    position:relative;
  }
</style>
