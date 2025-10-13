import path from 'path'
import { fileURLToPath } from 'url'

// const ROOT = process.cwd()
// path.join usa \ no Windows, e cwd pode ser diferente se executado em apps/shell, diferente de em development na raiz.

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOT = path.resolve(__dirname, '..')
// Agora sim: __dirname = C:\Users\xxx\meu-projeto\apps\shell\lib

export const CONTENT_PATH = path.join(ROOT, 'conteudo')

export const EXPEDITIONS_PATH = path.join(CONTENT_PATH, 'expedicoes')
export const CITIES_PATH = path.join(CONTENT_PATH, 'cidades')
export const PROJECTS_PATH = path.join(CONTENT_PATH, 'projetos')
