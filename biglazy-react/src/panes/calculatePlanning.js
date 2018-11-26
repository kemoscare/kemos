import moment from 'moment'

function parseDays(dayElements) {
    let days = dayElements.flatMap((dayElement) => {
        let { day } = dayElement
        if(day.length > 2) {
            let firstDay = parseInt(day.split("-")[0], 10)
            let lastDay = parseInt(day.split("-")[1], 10)
            let days = []
            for(let i = firstDay;i<lastDay+1;i++) {
                days.push({...dayElement, day: i})
            }
            return days;
        } else {
            return {...dayElement, day: parseInt(day, 10)}
        }
    })
    return days
}

function calculateDays(days, startDate) {
    let rdv = parseDays(days)
    .map((day) => {
        if(day.day === 1 || day.day === 0) {
            return { date: startDate, type: "Traitement",...day}
        } else {
            return { date: moment(startDate).add(day.day - 1, 'days'), type: "Traitement", ...day}
        }
    })
    return rdv
}

function evaluationSpan(protocol, cycleCount) {
    const span = Math.round((protocol.dayOneEquals - lastDay(protocol).day) / 2)
    if(span > 7) {
        return 7
    } else {
        return span
    }
}

function lastEvaluation(protocol, cycleCount) {
    const evaluationLength = protocol.evaluations.length - 1
    const evaluation = protocol.evaluations[evaluationLength].dayAfter ? protocol.evaluations[evaluationLength].dayAfter * cycleCount : 1 * cycleCount
    return evaluation
}

function lastDay(protocol) {
    let parsedDays = parseDays(protocol.days)
    const sorted = parsedDays.sort((d1, d2) => d1-d2).pop()
    return sorted
}

export function calculatePlanning(protocol, startDate, cycleCount) {
    if(!protocol) return []
    let total = []
    let reevaluations = []
    for(const evaluation of protocol.evaluations) {
        const dayAfter = evaluation.dayAfter || 1
        const span = evaluationSpan(protocol, cycleCount)
        const reevaluationDate = moment(startDate).add(((protocol.dayOneEquals-1)*dayAfter - span), 'days').startOf('day')
        total.push({date: reevaluationDate, type: "Reevaluation", ...evaluation})
    }

    const cycles = lastEvaluation(protocol, cycleCount)

    for(let i=0;i<cycles;i++) {
        let newDate = moment(startDate).add(i*(protocol.dayOneEquals - 1), 'days').startOf('day')
        let days = calculateDays(protocol.days, newDate)
        total = total.concat(days)
    }  

    const theoreticalCureDate = moment(startDate).add((protocol.dayOneEquals - 1)*cycles, 'days')
    total.push({date: theoreticalCureDate, type: "Traitement Suivant", ...protocol.days[0]})

    total = total.filter((day) => day.careMode != "Home")
    total = total.sort((d1, d2) => d1.date.unix() - d2.date.unix())
    total = total.map((day, index) => {day.id = index;return day})  
    return total; 
}