export const randomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)]
}

export default{
    randomItem: randomItem
}
