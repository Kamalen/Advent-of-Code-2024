import { readInput } from '../common'

let lanes: string[] = readInput('day2')

type ACReport = number[]

function checkReport(report: ACReport): boolean {
    let isAsc = report[0] < report[1]

    for (let j = 1; j < report.length; j++) {
        // Check difference
        let differenceOk = Math.abs(report[j] - report[j-1]) < 4
        let directionOk = isAsc ? report[j-1] < report[j] : report[j-1] > report[j]

        if (!differenceOk || !directionOk) return false
    }

    return true
}

let numbersOfGoodReports = 0

lanes.forEach(lane => {
    let report = lane.split(" ").map(x => parseInt(x))
    console.log(report, checkReport(report))
    if (checkReport(report)) {
        numbersOfGoodReports ++
    }
})

console.log(numbersOfGoodReports)
