
var imageExtensions = new Set([
  'tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'gif', 'png', 'eps'
])

export function isImage(fileExtension: string) {
  return imageExtensions.has(fileExtension.replace(/^\./, ''))
}

export class Optional<T> {

  constructor(private data: T) {
  }

  static of(t: any): Optional<any> {
    return new Optional(t)
  }

  static empty(): Optional<any> {
    return OPTIONAL_EMPTY
  }

  isPresent(): boolean {
    return !this.isEmpty()
  }

  isEmpty(): boolean {
    return this.data == null || this.data == undefined
  }

  get(): T {
    return this.data
  }
}

const OPTIONAL_EMPTY = new Optional(null)