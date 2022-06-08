import { ContentResourceLoader } from './contentloader/ContentResourceLoader'
import { MetadataLoader } from './contentloader/MetadataLoader'
import { ObjectLoader } from './contentloader/ObjectLoader'

const CONTENT_TYPE = {
  CustomGame: 'Custom Game',
  BlocksAndParts: 'Blocks and Parts',
  Unknown: 'Unknown'
}

export class Content {
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

  load(content: Content, resourceLoader: ContentResourceLoader): void
}

const loaders = [
  new MetadataLoader(),
  new ObjectLoader()
]

export function loadContent(contentPath: string): Content | string {
  let content = new Content()
  let resourceLoader = new ContentResourceLoader(contentPath)

  for (let loader of loaders) {
    let errorMessage = loader.load(content, resourceLoader)
    if (errorMessage.isPresent()) {
      return errorMessage.get()
    }
  }

  return content
}
