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
  private contentDir: string

  constructor(private gamePath: string) {
    // this.db = new LowWithLodash(new JSONFile(join(DATA_DIR, 'db.json')))
    this.contentDir = join(gamePath, '../../workshop/content/387990/')
  }

  loadContent(contentId: string) {
    let contentPath = join(this.contentDir, contentId)
    let content = loadContent(contentPath)
    console.log(content)
  }
}
