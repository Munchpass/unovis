import { ConfigProperty, GenericParameter } from '@unovis/shared/integrations/types'

export function getComponentCode(
  componentName: string,
  generics: GenericParameter[] | undefined,
  requiredProps: ConfigProperty[],
  importStatements: { source: string; elements: string[] }[],
  dataType: string | null = 'Data',
  elementSuffix = 'component',
  isStandAlone = false,
  styles?: string[]
): string {
  const genericsStr = generics ? `<${generics?.map((g) => g.name).join(', ')}>` : ''
  const configType = `${componentName}ConfigInterface${genericsStr}`
  const typeDefs = generics ? generics.map((g) => `type ${g.name} = $$Generic${g.extends ? `<${g.extends}>` : ''}`) : []

  // Build prop types for $props()
  const propTypes = requiredProps.map((c) => `${c.name}: ${c.type}`).join(', ')
  const propTypeDef = dataType
    ? `{ data?: ${dataType}, ${propTypes}${requiredProps.length ? ', ' : ''}[key: string]: any }`
    : `{ ${propTypes}${requiredProps.length ? ', ' : ''}[key: string]: any }`

  const componentType = [componentName, genericsStr].join('')
  const constructorArgs = isStandAlone
    ? `ref, ${componentName === 'BulletLegend' ? '{ ...config, renderIntoProvidedDomNode: true }' : 'config'}${dataType ? ', data' : ''}`
    : 'config'

  return `<script lang="ts">
  // !!! This code was automatically generated. You should not change it !!!
  ${importStatements.map((s) => `import { ${s.elements.join(', ')} } from '${s.source}'`).join('\n  ')}
  import { onMount${isStandAlone ? '' : ', getContext'} } from 'svelte'
  ${!isStandAlone ? "\n  import type { Lifecycle } from '../../types/context'" : ''}
  import { arePropsEqual } from '../../utils/props'
  ${typeDefs.length ? `// type defs\n  ${typeDefs.join('\n  ')}` : ''}
  
  // props using runes
  const props = $props<${propTypeDef}>()
  
  // config as reactive state
  let prevConfig = $state<${configType} | undefined>(undefined)
  const config = $derived({${requiredProps.map((c) => ` ${c.name}: props.${c.name},`).join('')} ...props })

  // component declaration
  let component = $state<${componentType} | undefined>(undefined)
  ${isStandAlone ? 'let ref = $state<HTMLDivElement | undefined>(undefined)' : `let lifecycle = getContext<Lifecycle>('${elementSuffix}')`}

  onMount(() => {
    component = new ${componentType}(${constructorArgs})
    return () => component?.destroy()
  })
  
  ${dataType ? '$effect(() => {\n    component?.setData(props.data)\n  })' : ''}
  
  $effect(() => {
    if (!arePropsEqual(prevConfig, config)) {
      component?.${componentName === 'BulletLegend' ? 'update' : 'setConfig'}(config)
      prevConfig = config
    }
  })

  // component accessor
  function getComponent (): ${componentName}${genericsStr} { return component }

</script>

<vis-${elementSuffix} ${isStandAlone ? 'bind:this={ref}' : 'use:lifecycle={component}'}/>
${isStandAlone ? `\n<style>\n  vis-${elementSuffix} {\n    ${styles?.join(';\n    ')};\n  }\n</style>` : ''}
`
}
