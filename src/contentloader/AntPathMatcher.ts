import fs from "fs"

const ASTERISK = '*'
const QUESTION = '?'
const BLANK = ' '
const ASCII_CASE_DIFFERENCE_VALUE = 32

// https://github.com/azagniotov/ant-style-path-matcher/blob/master/src/main/java/io/github/azagniotov/matcher/AntPathMatcher.java

function lookup(pattern: string, basePath: string) {
    let patternStart = pattern.charAt(0)
    let r: string[]
    if (patternStart == ASTERISK) {
        if (pattern.length == 1) {
            return fs.statSync(basePath).isDirectory() ? fs.readdirSync(basePath) : []
        } else {
            if (r = doubleAsteriskMatch(pattern, basePath)) {
                return r
            }
        }

        for (let start = 0; ; start++) {
            if (r = lookup(pattern.substring(1), basePath)) {
                return r
            }
        }

        return lookup(pattern.substring(1), );
    }

    let pointer = skipBlanks()
}

function doubleAsteriskMatch(pattern: string, basePath: string) {
    if (pattern.charAt(1) == ASTERISK && pattern.length > 2) {
        return lookup(pattern.substring(3), basePath)
    }

    return []
}