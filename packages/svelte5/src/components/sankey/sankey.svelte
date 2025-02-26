<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Sankey, type SankeyConfigInterface, type SankeyInputNode, type SankeyInputLink } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type N = $$Generic<SankeyInputNode>
  type L = $$Generic<SankeyInputLink>
  
  // props using runes
  const props = $props<{ data?: { nodes: N[]; links?: L[] }, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<SankeyConfigInterface<N, L> | undefined>(undefined)
  const config = $derived({ ...props })

  // component declaration
  let component = $state<Sankey<N, L> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new Sankey<N, L>(config)
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
  function getComponent (): Sankey<N, L> { return component }

</script>

<vis-component use:lifecycle={component}/>

