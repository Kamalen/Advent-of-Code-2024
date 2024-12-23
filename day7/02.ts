import { readExample, readInput } from '../common'

// let lines: string[] = readExample('day7')
let lines: string[] = readInput('day7')

interface Equation {
    result: number
    operators: number[]
}

type Operation = (a: number, b: number) => number

const add = (a: number, b: number) => a + b
const multiply = (a: number, b: number) => a * b
const concat = (a: number, b: number) => parseInt(a.toString() + b.toString(), 10)

const operators = [add, multiply, concat]

function buildOperatorsCombinaison(size: number): Operation[][] {
    if(size === 1) {
        return [
            [add],
            [multiply],
            [concat]
        ]
    }

    const result: Operation[][] = []
    const combinaisons = buildOperatorsCombinaison(size - 1)
    for(let i = 0; i < combinaisons.length; i++) {
        for(let j = 0; j < operators.length; j++) {
            result.push([ ...combinaisons[i], operators[j] ])
        }
    }
    return result
}

function isEquationValid(equation: Equation): boolean {
    const combinaisons = buildOperatorsCombinaison(equation.operators.length - 1)

    return combinaisons.some(combinaison => {
        let result = computeEquation(equation, combinaison)
        return result === equation.result
    })
}

function computeEquation(equation: Equation, operations: Operation[]): number {
    return operations.reduce((acc, operation, index) => {
        return operation(acc, equation.operators[index+1])
    }, equation.operators[0])
}

const equations = lines.map(line => {
    const splitted = line.split(':')

    const result = parseInt(splitted[0], 10)
    const operators = splitted[1].trim().split(' ').map(x => parseInt(x, 10))

    return {result, operators}
})

let result = 0
equations.forEach(equation => {
  if (isEquationValid(equation)) {
      result += equation.result
  }
})

console.log(result)