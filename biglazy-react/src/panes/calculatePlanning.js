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

export function calculatePlanning(protocol, startDate) {
    if(!protocol) return []
    let total = []
    let reevaluations = []
    for(const evaluation of protocol.evaluations) {
        const reevaluationDate = moment(startDate).add((protocol.dayOneEquals*evaluation.dayAfter), 'days').startOf('day')
        reevaluations.push(reevaluationDate.unix())
    }  

    let cycles = protocol.evaluations[protocol.evaluations.length-1].dayAfter ? protocol.evaluations[protocol.evaluations.length - 1].dayAfter*2 : 1
    for(let i=0;i<cycles;i++) {
        let newDate = moment(startDate).add(i*protocol.dayOneEquals, 'days').startOf('day')
        let days = calculateDays(protocol.days, newDate)
        total = total.concat(days)
    }
    total = total.map((day, index) => {
        const reevaluationIndex = reevaluations.indexOf(day.date.unix())
        if(reevaluationIndex != -1) {
            day.type = "Reevaluation"
            day.evaluation = protocol.evaluations[reevaluationIndex]
        } 
        day.id = index
        return day
    })     
    total = total.filter((day) => day.type === "Reevaluation" || day.careMode != "Home")
    return total.sort((d1, d2) => d1.date.unix() - d2.date.unix())
}