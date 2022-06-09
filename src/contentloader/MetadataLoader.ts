import {
  Content,
  ContentLoader
} from "../ContentLoader";
import { Optional, isImage } from '../util';
import { ContentResourceLoader } from "./ContentResourceLoader";

export class MetadataLoader implements ContentLoader {

  load(content: Content, resourceLoader: ContentResourceLoader): Optional<string> {
    let res = resourceLoader.load('description.json')
    let data = JSON.parse(res.getBinary().toString()) as any
    content.name = data.name
    content.type = data.type
    content.description = data.description
    content.fileId = data.fileId
    content.creatorId = data.creatorId
    content.version = data.version
    content.customIcons = data.custom_icons

    let preview = resourceLoader.lookupOne('preview.*', res => res.isLoadable() && isImage(res.getExtension()))
    if (preview.isPresent()) {
      content.preview = preview.get().getFullName()
    }

    return Optional.empty()
  }
}