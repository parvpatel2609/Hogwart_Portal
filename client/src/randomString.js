function getRandomString() {
    const strings = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'];
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
}

export default getRandomString;