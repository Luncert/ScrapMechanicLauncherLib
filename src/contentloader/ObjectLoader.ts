import { Content, ContentLoader } from "../ContentLoader";
import { Optional } from "../util";
import { ContentResourceLoader } from "./ContentResourceLoader";

export class ObjectLoader implements ContentLoader {
    
    load(content: Content, resourceLoader: ContentResourceLoader): Optional<string> {
        let shapeSetsIndex = resourceLoader.lookupOne('Objects/Database/shapesets.*').getObject();
        content.objects = shapeSetsIndex.shapeSetList
        return Optional.empty()
    }
}
