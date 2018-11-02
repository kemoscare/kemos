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
    .filter((day) => {return day.careMode != "Home"})
    .map((day) => {
        if(day.day === 1 || day.day === 0) {
            return { date: startDate, type: "Traitement",...day}
        } else {
            return { date: startDate.add(day.day - 1, 'days'), type: "Traitement", ...day}
        }
    })
    return rdv
}

export function calculatePlanning(protocol, startDate) {
    let total = []
    let reevaluations = []
    for(const evaluation of protocol.evaluations) {
        const reevaluationDate = moment(startDate).add((protocol.dayOneEquals*evaluation.dayAfter), 'days').startOf('day')
        reevaluations.push(reevaluationDate.unix())
    }  
    for(let i=0;i<protocol.evaluations[0].dayAfter*2;i++) {
        let newDate = moment(startDate).add(i*protocol.dayOneEquals, 'days').startOf('day')
        let days = calculateDays(protocol.days, newDate)
        total = total.concat(days)
    }
    total = total.map((day, index) => {
        if(reevaluations.includes(day.date.unix())) {
            day.type = "Reevaluation"
            day.evaluation = protocol.evaluations[0]
        } 
        day.id = index
        return day
    })     
    return total.sort((d1, d2) => d1.date.unix() - d2.date.unix())
}