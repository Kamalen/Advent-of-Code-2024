import { readExample, readInput } from '../common'

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

function recombineAndCheckReports(report: ACReport) {
    let subreports = report.map((_, index) => {
        return report.toSpliced(index, 1)
    })

    return subreports.some(subreport => checkReport(subreport))
}

let numbersOfGoodReports = 0

lanes.forEach(lane => {
    let report = lane.split(" ").map(x => parseInt(x))
    console.log(report, recombineAndCheckReports(report))
    if (recombineAndCheckReports(report)) {
        numbersOfGoodReports ++
    }
})

console.log(numbersOfGoodReports)
