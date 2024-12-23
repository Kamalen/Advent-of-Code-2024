import { readInputPure } from '../common'
import { calculateChecksum } from './models'

// let line = readExamplePure('day9')
let line = readInputPure('day9')


function representDisk(line: string): string[] {
    let result = []

    let isFile = true
    let currentFileId = 0
    for(let c of line) {
        let count = parseInt(c)
        for (let j = 0; j < count; j++) {
            result.push(isFile ? currentFileId : '.')
        }

        if(isFile) {
            currentFileId++
        }

        isFile = !isFile
    }

    return result
}


export function defragmentDisk(diskRepresentation: string[]): string[] {
    let editedDisk = [...diskRepresentation]

    for(let i = editedDisk.length-1; i >= 0; i--) {
        if(editedDisk[i] === '.') {
            continue
        }
        // Find the whole file
        let j = i
        while(editedDisk[j] !== '.') {
            j--
        }
        let file = {start: j, end: i}
        let freeSpaceIndex = findFirstFreeSpaceIndexOfSuffisentSpace(editedDisk, file.end - file.start)

        if(freeSpaceIndex) {
            editedDisk[j] = replaceFreeSpaceWithFile(editedDisk, file)
        }
    }

    return editedDisk
}

export function findFirstFreeSpaceIndexOfSuffisentSpace(diskRepresentation: string[], size: number): { start: number, end: number } | null {
    for(let i = 0; i < diskRepresentation.length; i++) {
        if(diskRepresentation[i] === '.') {
            let j = i
            while(diskRepresentation[j] === '.') {
                j++
            }
            if (j-i >= size) {
                return {start: i, end: j}
            }
        }
    }
    return null
}

export function replaceFreeSpaceWithFile(fileRepresentation: string[], file: string[], startIndex: number, endIndex: number) {
    const start = fileRepresentation.slice(0, startIndex)
    const end = fileRepresentation.slice(endIndex, fileRepresentation.length)

    return [...start, ...file, ...end]
}

let diskRepresentation = representDisk(line)
let defragmentedDisk = defragmentDisk(diskRepresentation)

console.log("=================")
console.log(calculateChecksum(defragmentedDisk))