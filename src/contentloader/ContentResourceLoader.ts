import path from "path";
import fs from 'fs';
import { LazyLoadingResource, Resource } from "./Resource";
import { search } from "./AntPathMatcher";
import { Optional } from "../util";

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

    list(p: string, filter?: (res: LazyLoadingResource) => boolean): LazyLoadingResource[] {
        let basePath = path.join(this.contentPath, p)
        let r = fs.readdirSync(basePath)
            .map(fileName => {
                let stat = fs.statSync(path.join(basePath, fileName));
                return new LazyLoadingResource(fileName, basePath, stat.isFile())
            })
        return filter ? r.filter(filter) : r
    }

    /**
     * Lookup resources.
     * @param p Ant style path pattern
     */
    lookup(p: string, filter?: (res: LazyLoadingResource) => boolean): LazyLoadingResource[] {
        let r = search(p, this.contentPath).map(absPath => {
            let stat = fs.statSync(absPath)
            let parsedPath = path.parse(absPath)
            return new LazyLoadingResource(parsedPath.base, parsedPath.dir, stat.isFile())
        })
        return filter ? r.filter(filter) : r

    }

    lookupOne(p: string, filter?: (res: LazyLoadingResource) => boolean): Optional<LazyLoadingResource> {
        let r = this.lookup(p)
        if (filter) {
            r = r.filter(filter)
        }
        return r.length > 0 ? Optional.of(r[0]) : Optional.empty()
    }
}
