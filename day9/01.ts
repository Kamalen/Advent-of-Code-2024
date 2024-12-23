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

        let freeSpaceIndex = findFirstFreeSpaceIndex(editedDisk)
        let fileChunk = editedDisk[i]
        editedDisk[i] = '.'
        editedDisk[freeSpaceIndex] = fileChunk

        if(checkIfSpaceIsStillDefragmented(editedDisk)) {
            break;
        }
    }

    return editedDisk
}

export function findFirstFreeSpaceIndex(diskRepresentation: string[]): number {
    return diskRepresentation.findIndex(c => c === '.')
}

export function checkIfSpaceIsStillDefragmented(diskRepresentation: string[]) {
    const regex = /[0-9]+\.+[0-9]+/
    return !regex.test(diskRepresentation.join(''))
}

let diskRepresentation = representDisk(line)
let defragmentedDisk = defragmentDisk(diskRepresentation)

console.log("=================")
console.log(calculateChecksum(defragmentedDisk))