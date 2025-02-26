<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Graph, type GraphConfigInterface, type GraphInputNode, type GraphInputLink } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type N = $$Generic<GraphInputNode>
  type L = $$Generic<GraphInputLink>
  
  // props using runes
  const props = $props<{ data?: { nodes: N[]; links?: L[] }, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<GraphConfigInterface<N, L> | undefined>(undefined)
  const config = $derived({ ...props })

  // component declaration
  let component = $state<Graph<N, L> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new Graph<N, L>(config)
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
  function getComponent (): Graph<N, L> { return component }

</script>

<vis-component use:lifecycle={component}/>

