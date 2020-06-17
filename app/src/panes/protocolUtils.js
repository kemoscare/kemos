export const getFormattedProducts = products =>
    products.reduce((p1, p2) => p1 + ', ' + p2)
export const getFormattedCycles = protocol =>
    protocol.evaluations
        .map(e => e.dayAfter)
        .reduce((d1, d2) => d1 + (d2 && ', ' + d2))
export function getProducts(protocol) {
    const products = protocol.days.flatMap(d => d.products)
    let uniqueProducts = []
    for (let product of products) {
        if (!uniqueProducts.includes(product)) {
            uniqueProducts.push(product)
        }
    }
    return uniqueProducts
}

function parseDay(dayElement) {
    const day = dayElement.day
    if (day.includes('-')) {
        const firstDay = parseInt(day.split('-')[0], 10)
        const lastDay = parseInt(day.split('-')[1], 10)
        let returnDays = []
        for (let i = firstDay; i <= lastDay; i++) {
            returnDays.push(i)
        }
        return returnDays
    } else if (day.includes(',')) {
        const firstDay = parseInt(day.split(',')[0], 10)
        const lastDay = parseInt(day.split(',')[1], 10)
        return [firstDay, lastDay]
    } else {
        return [parseInt(day, 10)]
    }
}

export function getDaysForProduct(protocol, product) {
    let daysOfInterest = []
    for (let day of protocol.days) {
        if (day.products.includes(product)) {
            daysOfInterest.push(...parseDay(day))
        }
    }
    const sortedDaysOfInterest = daysOfInterest.sort((a, b) => a - b)
    return sortedDaysOfInterest
}

export function getWrappedForProduct(protocol, product) {
    let wrapped = []
    let deliveredDays = getDaysForProduct(protocol, product)
    for (let day = 1; day <= protocol.dayOneEquals; day++) {
        wrapped.push({
            day: day,
            isDelivered: deliveredDays.includes(day),
        })
    }
    return wrapped
}
