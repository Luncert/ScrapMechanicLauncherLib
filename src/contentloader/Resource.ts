
export class Resource {

    constructor(protected resName: string, protected basePath: string, protected raw: Buffer) {}

    getName() {
        return this.resName
    }

    getBinary() {
        return this.raw
    }
}

export class LazyLoadingResource extends Resource {

    constructor(resName: string, basePath: string, private loadable: boolean) {
        super(resName, basePath, null)
    }

    getBinary() {
        if (this.raw == null) {
            let resPath = path.join(this.basePath, this.resName)
            if (!this.loadable) {
                throw new Error(`resource ${resPath} not loadable`)
            }
            this.raw = fs.readFileSync(resPath)
        }
        return this.raw
    }
}