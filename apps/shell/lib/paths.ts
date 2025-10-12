import path from 'path'

const ROOT = process.cwd()

export const CONTENT_PATH = path.join(ROOT, 'apps/shell/conteudo')

export const EXPEDITIONS_PATH = path.join(CONTENT_PATH, 'expedicoes')
export const CITIES_PATH = path.join(CONTENT_PATH, 'cidades')
export const PROJECTS_PATH = path.join(CONTENT_PATH, 'projetos')
