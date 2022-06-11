import { join } from 'path'
// import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash'
import { loadContent } from './ContentLoader'

// 2815418786
const DATA_DIR = join(__dirname, 'data')

// Extend Low class with a new `chain` field
// class LowWithLodash<T> extends Low<T> {
//   chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
// }

export class ScrapMechanicHub {

  // private db: Low
  private gamePath: string
  private contentDir: string

  constructor() {
    // this.db = new LowWithLodash(new JSONFile(join(DATA_DIR, 'db.json')))
  }

  public loadGame(gamePath: string, logger: ActionLogger) {
    this.gamePath = gamePath
    this.contentDir = join(gamePath, '../../workshop/content/387990/')
    logger.write('hello')
    setTimeout(() => 
    logger.close(true), 1000)
  }

  public loadContent(contentId: string) {
    let contentPath = join(this.contentDir, contentId)
    return loadContent(contentPath)
  }
}

export interface ActionLogger {
  write(data: string): void
  close(actionSuccess: boolean): void
}