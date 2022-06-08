import path from "path";
import fs from 'fs';
import { LazyLoadingResource, Resource } from "./Resource";
import { search } from "./AntPathMatcher";

export class ContentResourceLoader {

    constructor(private contentPath: string) {
    }

    load(resName: string): Resource {
        if (resName.startsWith('$CONTENT_DATA')) {
            resName = resName.substring(13)
        }
        let resPath = path.join(this.contentPath, resName)
        let parsedPath = path.parse(resPath)
        let raw = fs.readFileSync(resPath)
        return new Resource(parsedPath.base, parsedPath.dir, raw)
    }

    list(p: string): LazyLoadingResource[] {
        let basePath = path.join(this.contentPath, p)
        return fs.readdirSync(basePath)
            .map(fileName => {
                let stat = fs.statSync(path.join(basePath, fileName));
                return new LazyLoadingResource(fileName, basePath, stat.isFile())
            })
    }

    /**
     * Lookup resources.
     * @param p Ant style path pattern
     */
    lookup(p: string): LazyLoadingResource[] {
        return search(p, this.contentPath).map(absPath => {
            let stat = fs.statSync(absPath)
            let parsedPath = path.parse(absPath)
            return new LazyLoadingResource(parsedPath.base, parsedPath.dir, stat.isFile())
        })
    }

    lookupOne(p: string): LazyLoadingResource {
        let r = this.lookup(p)
        return r.length > 0 ? r[0] : null
    }
}
