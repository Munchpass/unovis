<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { BulletLegend, type BulletLegendConfigInterface, type BulletLegendItemInterface } from '@unovis/ts'
  import { onMount } from 'svelte'
  
  import { arePropsEqual } from '../../utils/props'
  
  
  // props using runes
  const props = $props<{ items: BulletLegendItemInterface[], [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<BulletLegendConfigInterface | undefined>(undefined)
  const config = $derived({ items: props.items, ...props })

  // component declaration
  let component = $state<BulletLegend | undefined>(undefined)
  let ref = $state<HTMLDivElement | undefined>(undefined)

  onMount(() => {
    component = new BulletLegend(ref, { ...config, renderIntoProvidedDomNode: true })
    return () => component?.destroy()
  })
  
  
  
  $effect(() => {
    if (!arePropsEqual(prevConfig, config)) {
      component?.update(config)
      prevConfig = config
    }
  })

  // component accessor
  function getComponent (): BulletLegend { return component }

</script>

<vis-bullet-legend bind:this={ref}/>

<style>
  vis-bullet-legend {
    display:block;
  }
</style>
