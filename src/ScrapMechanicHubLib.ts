import { join, dirname, basename, extname } from 'path'
import path from 'path'
// import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash'
import fs from 'fs'
import * as util from './util'

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
    let content = new ContentLoader(contentPath).load()
    console.log(content)
  }
}

class ContentLoader {

  private content = new Content()
  constructor(private contentPath: string) {

  }

  load(): Content {
    this.loadMetadata()
    this.loadObjects()
    return this.content
  }

  private loadMetadata() {
    let raw = fs.readFileSync(join(this.contentPath, 'description.json'))
    let data = JSON.parse(raw.toString()) as any
    this.content.name = data.name
    this.content.type = data.type
    this.content.description = data.description
    this.content.fileId = data.fileId
    this.content.creatorId = data.creatorId
    this.content.version = data.version
    this.content.customIcons = data.custom_icons

    let preview = fs.readdirSync(this.contentPath)
      .map(file => path.parse(file))
      .filter(file => file.name === 'preview'
        && util.isImage(file.ext)
        && fs.statSync(join(this.contentPath, file.base)).isFile())
      console.log(preview)
    if (preview.length >= 1) {
      this.content.preview = preview[0].base
    }
  }

  private loadObjects() {
    
  }
}

enum ContentType {
  Survival = 'Survival',
  CustomGame = 'Custom Game'
}

const CONTENT_TYPE = {
  CustomGame: 'Custom Game',
  BlocksAndParts: 'Blocks and Parts',
  Unknown: 'Unknown'
}

class Content {
  name: string
  type: string
  description: string
  fileId: string
  creatorId: string
  version: string
  customIcons: boolean

  preview: string
}

interface Resource {

  getUuid(): string
}