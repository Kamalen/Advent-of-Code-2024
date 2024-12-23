import { readFileSync } from 'node:fs'

export function readInputPure(day: string): string {
    console.log(`========= Reading input ${day} ===============`)
    let file: string = readFileSync(`./${day}/input.txt`, 'utf8')

    return file
}

export function readExamplePure(day: string): string {
    console.log(`========= Reading example ${day} ===============`)
    let file: string = readFileSync(`./${day}/example.txt`, 'utf8')

    return file
}

export function readInput(day: string): string[] {
    console.log(`========= Reading input ${day} ===============`)
    let file: string = readFileSync(`./${day}/input.txt`, 'utf8')
    let lanes: string[] = file.split('\n')

    return lanes
}
export function readExample(day: string): string[] {
    console.log(`========= Reading example ${day} ===============`)
    let file: string = readFileSync(`./${day}/example.txt`, 'utf8')
    let lanes: string[] = file.split('\n')

    return lanes
}