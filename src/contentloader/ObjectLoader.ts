import { Content, ContentLoader } from "../ContentLoader";
import { Optional } from "../util";
import fs from 'fs';
import path from "path";
import { ContentResourceLoader } from "./ContentResourceLoader";

export class ObjectLoader implements ContentLoader {
    
    load(content: Content, resourceLoader: ContentResourceLoader): Optional<string> {
        // fs.readFileSync(path.join(content.rootPath, ''))
        throw new Error("Method not implemented.");
    }
}