import path from "path"
import fs from "fs"

export class Resource {

    private parsedResName: path.ParsedPath
    constructor(protected resName: string, protected basePath: string, protected raw: Buffer) {
        this.parsedResName = path.parse(resName)
    }

    getName(): string {
        return this.parsedResName.name
    }

    getFullName(): string {
        return this.parsedResName.base
    }

    getExtension(): string {
        return this.parsedResName.ext
    }

    getBinary() {
        return this.raw
    }

    getObject() {
        return JSON.parse(this.getBinary().toString())
    }
}

export class LazyLoadingResource extends Resource {

    constructor(resName: string, basePath: string, private loadable: boolean) {
        super(resName, basePath, null)
    }

    getBinary(): Buffer {
        if (this.raw == null) {
            let resPath = path.join(this.basePath, this.getFullName())
            if (!this.loadable) {
                throw new Error(`resource ${resPath} not loadable`)
            }
            this.raw = fs.readFileSync(resPath)
        }
        return this.raw
    }

    isLoadable(): boolean {
        return this.loadable
    }
}