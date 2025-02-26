<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Tooltip, type TooltipConfigInterface } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  
  
  // props using runes
  const props = $props<{ [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<TooltipConfigInterface | undefined>(undefined)
  const config = $derived({ ...props })

  // component declaration
  let component = $state<Tooltip | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('tooltip')

  onMount(() => {
    component = new Tooltip(config)
    return () => component?.destroy()
  })
  
  
  
  $effect(() => {
    if (!arePropsEqual(prevConfig, config)) {
      component?.setConfig(config)
      prevConfig = config
    }
  })

  // component accessor
  function getComponent (): Tooltip { return component }

</script>

<vis-tooltip use:lifecycle={component}/>

