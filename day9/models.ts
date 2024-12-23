
export function calculateChecksum(diskRepresentation: string[]): number {
    return diskRepresentation.reduce((acc, c, index) => {
        let cVal = c === '.' ? 0 : parseInt(c)
        return acc + (cVal * index)
    }, 0)
}