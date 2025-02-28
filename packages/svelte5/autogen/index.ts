import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { exec } from 'child_process'
import { dirname } from 'path'

// Components
import { getComponentList } from '@unovis/shared/integrations/components'

// Types
import { SvelteComponentInput } from '@unovis/shared/integrations/types'

// Utils
import { getImportStatements, kebabCase, getConfigSummary } from '@unovis/shared/integrations/utils'

// Component Code
import { getComponentCode } from './component'

const skipProperties = ['width', 'height']
const components = getComponentList() as SvelteComponentInput[]

const exports: string[] = []

for (const component of components) {
  const { configProperties, configInterfaceMembers, generics, statements } = getConfigSummary(component, skipProperties)
  const importStatements = getImportStatements(component.name, statements, configInterfaceMembers, generics)
  const isStandAlone = component.isStandAlone
  const componentCode = getComponentCode(
    component.name,
    generics,
    configProperties,
    importStatements,
    component.dataType,
    isStandAlone ? kebabCase(component.name) : component.elementSuffix,
    isStandAlone,
    component.svelteStyles,
  )

  const nameKebabCase = component.kebabCaseName ?? kebabCase(component.name)
  const file = `${nameKebabCase}.svelte`
  const path = `${isStandAlone ? 'html-' : ''}components/${nameKebabCase}`
  const pathComponentBase = `src/${path}`
  const pathComponent = `${pathComponentBase}/${file}`

  try {
    // Create directory if it doesn't exist
    if (!existsSync(pathComponentBase)) {
      mkdirSync(pathComponentBase, { recursive: true })
    }

    writeFileSync(pathComponent, componentCode)
    exec(`npx eslint ${pathComponent} --fix`, (error) => {
      if (error) {
        console.error(`Error linting ${pathComponent}:`, error)
      }
    })
  } catch (error) {
    console.error(`Error generating ${component.name}:`, error)
  }

  exports.push(`export { default as Vis${component.name} } from './${path}/${file}'`)

  // eslint-disable-next-line no-console
  console.log(`${component.name} generated`)
  // eslint-disable-next-line no-console
  console.log(`  ${pathComponent}`)
}

try {
  writeFileSync('src/components.ts', exports.join('\n'))
} catch (error) {
  console.error('Error writing components.ts:', error)
}
