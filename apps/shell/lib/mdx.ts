import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type MDXData = {
  content: string
  data: Record<string, any>
}

/**
 * Lê um arquivo MDX de um diretório específico e retorna conteúdo + metadados.
 * @param basePath Caminho base (ex: EXPEDITIONS_PATH)
 * @param slug Nome do arquivo sem extensão
 */
export function getContentFile (basePath: string, slug: string): MDXData | null {
  const filePath = path.join(basePath, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(fileContent)

  return { content, data }
}

/**
 * Lista todos os slugs (sem extensão) de um diretório de conteúdo.
 * @param basePath Caminho base (ex: EXPEDITIONS_PATH)
 */
export function getAllSlugs (basePath: string): string[] {
  if (!fs.existsSync(basePath)) return []

  return fs
    .readdirSync(basePath)
    .filter(file => file.endsWith('.mdx'))
    .map(file => path.basename(file, '.mdx'))
}

/**
 * Retorna todos os conteúdos de um diretório com slug + frontmatter
 * @param basePath Caminho base (ex: EXPEDITIONS_PATH)
 */
export function getAllContent (
  basePath: string
): { slug: string; data: Record<string, any> }[] {
  if (!fs.existsSync(basePath)) return []
  return fs
    .readdirSync(basePath)
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = path.basename(file, '.mdx')
      const fileContent = fs.readFileSync(path.join(basePath, file), 'utf-8')
      const { data } = matter(fileContent)
      return { slug, data }
    })
}
