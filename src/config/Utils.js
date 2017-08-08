export function speakersList(speakers: Array<any>) {
    let newSpeakers = [];
    let myMap = new Map();

    speakers.forEach(function (element)  {
        let char = element.name.charAt(0).toUpperCase()
        myMap.get(char) ? array = myMap.get(char) : array = []
        array.push(element)
        myMap.set(char, array)
    });

    myMap.forEach(function (value, key) {
        let val = {[key]: value}
        newSpeakers.push(val)
    })

    return newSpeakers
}