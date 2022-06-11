import { Content, ContentLoader } from "../ContentLoader";
import { Optional } from "../util";
import { ContentResourceLoader } from "./ContentResourceLoader";

export class ObjectLoader implements ContentLoader {
    
    load(content: Content, resourceLoader: ContentResourceLoader): Optional<string> {
        let shapeSetsIndex = resourceLoader.lookupOne('Objects/Database/shapesets.*')
        if (shapeSetsIndex.isEmpty()) {
            return Optional.of('shapesets not found')
        }
        content.objects = shapeSetsIndex.get().getObject().shapeSetList
        return Optional.empty()
    }
}
