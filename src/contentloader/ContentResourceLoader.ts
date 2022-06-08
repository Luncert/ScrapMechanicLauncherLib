import path from "path";
import fs from 'fs';
import { LazyLoadingResource, Resource } from "./Resource";

const pathSeparator = '/'

export class ContentResourceLoader {

    constructor(private contentPath: string) {

    }

    load(resName: string): Resource {
        let resPath = path.join(this.contentPath, resName)
        let raw = fs.readFileSync(resPath)
        return new Resource(resName, this.contentPath, raw)
    }

    list(p: string) {
        let basePath = path.join(this.contentPath, p)
        return fs.readdirSync(basePath)
            .map(fileName => {
                let stat = fs.statSync(path.join(basePath, fileName));
                return new LazyLoadingResource(fileName, basePath, stat.isFile())
            })
    }

    /**
     * Lookup resources.
     * Res: https://github.com/cimc-raffles/ant-path-matcher/blob/master/index.js.
     * @param p Ant style path pattern
     */
    lookup(p: string) {
    }
}
