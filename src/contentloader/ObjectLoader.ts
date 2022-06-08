import { Content, ContentLoader } from "../ContentLoader";
import { Optional } from "../util";

export class ObjectLoader implements ContentLoader {
    
    load(content: Content): Optional<string> {
        throw new Error("Method not implemented.");
    }
}