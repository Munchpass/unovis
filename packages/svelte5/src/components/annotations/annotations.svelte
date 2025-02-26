<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  import { Annotations, type AnnotationsConfigInterface, type AnnotationItem } from '@unovis/ts'
  import { onMount, getContext } from 'svelte'
  
  import type { Lifecycle } from '../../types/context'
  import { arePropsEqual } from '../../utils/props'
  
  
  // props using runes
  const props = $props<{ items: AnnotationItem[] | undefined, [key: string]: any }>()
  
  // config as reactive state
  let prevConfig = $state<AnnotationsConfigInterface | undefined>(undefined)
  const config = $derived({ items: props.items, ...props })

  // component declaration
  let component = $state<Annotations | undefined>(undefined)
  let lifecycle = getContext<Lifecycle>('annotations')

  onMount(() => {
    component = new Annotations(config)
    return () => component?.destroy()
  })
  
  
  
  $effect(() => {
    if (!arePropsEqual(prevConfig, config)) {
      component?.setConfig(config)
      prevConfig = config
    }
  })

  // component accessor
  function getComponent (): Annotations { return component }

</script>

<vis-annotations use:lifecycle={component}/>

