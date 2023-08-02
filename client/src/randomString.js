function getRandomString() {
    const strings = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'];
    // console.log("String length " + strings.length);
    const randomIndex = Math.floor( 0 + Math.random() * strings.length);
    // console.log(randomIndex);
    return strings[randomIndex];
}

export default getRandomString;