<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { ChordDiagram, ChordDiagramConfigInterface, ChordInputNode, ChordInputLink } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  // type defs
  type N = $$Generic<ChordInputNode>
  type L = $$Generic<ChordInputLink>
  
  // props using runes
  const props = $props<{ data?: { nodes: N[]; links?: L[] }, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<ChordDiagramConfigInterface<N, L> | undefined>(undefined)
  const config = $derived({ ...props })

  // component declaration
  let component = $state<ChordDiagram<N, L> | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('component')

  onMount(() => {
    component = new ChordDiagram<N, L>(config)
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
  function getComponent (): ChordDiagram<N, L> { return component }

</script>

<vis-component use:lifecycle={component}/>

