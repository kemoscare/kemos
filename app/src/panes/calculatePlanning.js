import moment from 'moment'

function parseDays(dayElements) {
    let days = dayElements.flatMap(dayElement => {
        let { day } = dayElement
        if (day.length > 2) {
            if (day.includes('-')) {
                let firstDay = parseInt(day.split('-')[0], 10)
                let lastDay = parseInt(day.split('-')[1], 10)
                let days = []
                for (let i = firstDay; i < lastDay + 1; i++) {
                    days.push({ ...dayElement, day: i })
                }
                return days
            } else if (day.includes(',')) {
                let ids = day.split(',').map(str => parseInt(str, 10))
                return ids.map(id => {
                    return { ...dayElement, day: id }
                })
            }
        } else {
            return { ...dayElement, day: parseInt(day, 10) }
        }
    })
    return days
}

function calculateDays(days, startDate) {
    let rdv = parseDays(days).map(day => {
        if (day.day === 1 || day.day === 0) {
            return { date: startDate, type: 'Traitement', ...day }
        } else {
            return {
                date: moment(startDate).add(day.day - 1, 'days'),
                type: 'Traitement',
                ...day,
            }
        }
    })
    return rdv
}

function evaluationSpan(protocol) {
    const span = Math.round((protocol.dayOneEquals - lastDay(protocol).day) / 2)
    if (span > 7) {
        return 7
    } else {
        return span
    }
}

function lastEvaluation(protocol) {
    const evaluationLength = protocol.evaluations.length - 1
    const evaluation = protocol.evaluations[evaluationLength].dayAfter
        ? protocol.evaluations[evaluationLength].dayAfter
        : 1
    return evaluation
}

function lastDay(protocol) {
    let parsedDays = parseDays(protocol.days)
    const sorted = parsedDays.sort((d1, d2) => d1 - d2).pop()
    return sorted
}

export function calculatePlanning(protocol, startDate, showAtHomeTreatments) {
    if (!protocol) return []
    let total = []
    let reevaluations = []
    if (protocol.radio_radiochimiottt !== 'Radiochimiotherapie') {
        for (const evaluation of protocol.evaluations) {
            const dayAfter = evaluation.dayAfter || 1
            const span = evaluationSpan(protocol)
            const reevaluationDate = moment(startDate)
                .add((protocol.dayOneEquals - 1) * dayAfter - span, 'days')
                .startOf('day')
            total.push({
                date: reevaluationDate,
                type: 'Reevaluation',
                ...evaluation,
            })
        }
    }

    const cycles = lastEvaluation(protocol)

    for (let i = 0; i < cycles; i++) {
        let newDate = moment(startDate)
            .add(i * (protocol.dayOneEquals - 1), 'days')
            .startOf('day')
        let days = calculateDays(protocol.days, newDate)
        total = total.concat(days)
    }

    const theoreticalCureDate = moment(startDate).add(
        (protocol.dayOneEquals - 1) * cycles,
        'days'
    )

    if (!showAtHomeTreatments)
        total = total.filter(day => day.careMode != 'Home')
    total.push({
        date: theoreticalCureDate,
        type: 'Traitement Suivant',
        ...protocol.days[0],
    })
    total = total.sort((d1, d2) => d1.date.unix() - d2.date.unix())
    total = total.map((day, index) => {
        day.id = index
        return day
    })
    return total
}
