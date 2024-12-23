import { readInput } from '../common'

let lanes: string[] = readInput('day1')

let list1: number[] = []
let list2: number[] = []

lanes.forEach(lane => {
    let elems = lane.split('   ')
    list1.push(parseInt(elems[0]))
    list2.push(parseInt(elems[1]))
})

let sortedList1: number[] = list1.sort((a, b) => a - b)
let sortedList2: number[] = list2.sort((a, b) => a - b)

let acc = 0
for (let i = 0; i < sortedList1.length; i++) {
    console.log(i, '//', acc, ' -- ', sortedList1[i], ' --- ', sortedList2[i])
    acc += Math.abs(sortedList1[i] - sortedList2[i])
}

console.log(acc)
