import { MetadataLoader } from './contentloader/MetadataLoader'
import { ObjectLoader } from './contentloader/ObjectLoader'

const CONTENT_TYPE = {
  CustomGame: 'Custom Game',
  BlocksAndParts: 'Blocks and Parts',
  Unknown: 'Unknown'
}

export class Content {
  rootPath: string

  name: string
  type: string
  description: string
  fileId: string
  creatorId: string
  version: string
  customIcons: boolean

  preview: string
}

export interface ContentLoader {

  load(content: Content): void
}

const loaders = [
  new MetadataLoader(),
  new ObjectLoader()
]

export function loadContent(contentPath: string): Content | string {
  let content = new Content()
  content.rootPath = contentPath

  for (let loader of loaders) {
    let errorMessage = loader.load(content)
    if (errorMessage.isPresent()) {
      return errorMessage.get()
    }
  }

  return content
}
