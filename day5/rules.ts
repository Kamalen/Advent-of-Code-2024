
let rules: {left: number, right: number}[] = []

export function buildRules(rulesLines: string[]) {
    rules = rulesLines.map(rule => {
        const split = rule.split('|')
        return {left: parseInt(split[0]), right: parseInt(split[1])}
    })
}

/**
 * Check in the rules that v1 can be before v2, meaning there is no rule that v2 should be before v1
 */
export function isPriorityRespected(v1: number, v2: number) {
    const rulesAboutV2 = rules.filter(rule => rule.left === v2)
    // If no rule about v2, it can be anywhere
    if (rulesAboutV2.length === 0) {
        return true
    }
    const ruleAboutPair = rulesAboutV2.find(rule => rule.right === v1)
    return !ruleAboutPair
}

export function sorter(v1: number, v2: number) {
    const ascendingRule = rules.find(rule => rule.left === v1 && rule.right === v2)
    if (ascendingRule) {
        return -1
    }
    const descendingRule = rules.find(rule => rule.right === v1 && rule.left === v2)
    if (descendingRule) {
        return 1
    }
    else {
        return 0
    }
}

export function checkUpdateValidity(update: number[]): boolean {
    for (let j = 0; j < update.length; j++) {
        for(let i = j; i < update.length; i++) {
            if (!isPriorityRespected(update[j], update[i])) {
                return false
            }
        }
    }

    return true
}