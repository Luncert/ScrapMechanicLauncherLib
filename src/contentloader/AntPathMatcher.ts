import fs from "fs"
import path from "path"

const ASTERISK = '*'
const QUESTION = '?'
const PATH_SEPARATOR = '/'

// https://github.com/azagniotov/ant-style-path-matcher/blob/master/src/main/java/io/github/azagniotov/matcher/AntPathMatcher.java

function tokenizePath(path: string) {
    return path.split(PATH_SEPARATOR).filter(x => x).map(x => x.trim())
}

export function search(pattern: string, basePath: string): string[] {
    return searchInner(tokenizePath(pattern), 0, basePath)
}

function searchInner(pattern: string[], cursor: number, basePath: string): string[] {
    if (cursor >= pattern.length) {
        return [basePath]
    }

    let part = pattern[cursor]

    if (matchDoubleAsterisk(part)) {
        return iterateAll(pattern, cursor + 1, basePath)
    }

    let r: string[] = []
    try {
        fs.readdirSync(basePath).filter(fileName => matchPart(part, fileName))
            .forEach(fileName => r.push(...searchInner(pattern, cursor + 1, path.join(basePath, fileName))))
    } catch (e: any) {
        if (!(e.message as string).includes('ENOTDIR')) {
            throw e
        }
    }
    

    return r
}

function iterateAll(pattern: string[], cursor: number, basePath: string): string[] {
    let r: string[] = []
    r.push(...searchInner(pattern, cursor, basePath))

    try {
        for (let item of fs.readdirSync(basePath)) {
            r.push(...iterateAll(pattern, cursor, path.join(basePath, item)))
        }
    } catch (e: any) {
        if (!(e.message as string).includes('ENOTDIR')) {
            throw e
        }
    }
    return r
}

function matchDoubleAsterisk(part: string) {
    return part.charAt(0) == ASTERISK && part.charAt(1) == ASTERISK
}

/**
 * e.g abc*.dd? -> abc123.ddx
 * @param fileName 
 * @param part 
 */
function matchPart(part: string, fileName: string): boolean {
    if (part.length == 0) {
        return fileName.length == 0
    }

    let start = part.charAt(0)

    if (start == ASTERISK) {
        if (part.charAt(1) == ASTERISK) {
            throw new Error('invalid ant style path pattern **')
        }
        if (matchPart(part.substring(1), fileName)) {
            return true
        } else {
            return matchPart(part, fileName.substring(1))
        }
    } else if (start != QUESTION && start != fileName.charAt(0)) {
        return false
    }

    return matchPart(part.substring(1), fileName.substring(1))
}