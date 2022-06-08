import {
  Content,
  ContentLoader
} from "../ContentLoader";
import path from 'path';
import fs from 'fs';
import { Optional, isImage } from '../util';
import { ContentResourceLoader } from "./ContentResourceLoader";

export class MetadataLoader implements ContentLoader {

  load(content: Content, resourceLoader: ContentResourceLoader): Optional<string> {
    let raw = resourceLoader.load('description.json')
    let data = JSON.parse(raw.toString()) as any
    content.name = data.name
    content.type = data.type
    content.description = data.description
    content.fileId = data.fileId
    content.creatorId = data.creatorId
    content.version = data.version
    content.customIcons = data.custom_icons

    resourceLoader.list('/')
      .filter(res => {
        let n = path.parse(res.getName())
        return n.name === 'preview'
      })

    let preview = resourceLoader.list('/')
      .map(file => path.parse(file))
      .filter(file => file.name === 'preview' &&
        isImage(file.ext) &&
        fs.statSync(path.join(content.rootPath, file.base)).isFile())
    if (preview.length >= 1) {
      content.preview = preview[0].base
    }

    return Optional.empty()
  }
}