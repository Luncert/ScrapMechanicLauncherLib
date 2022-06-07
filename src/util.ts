
var imageExtensions = new Set([
  'tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'gif', 'png', 'eps'
])

export function isImage(fileExtension: string) {
  return imageExtensions.has(fileExtension.replace(/^\./, ''))
}