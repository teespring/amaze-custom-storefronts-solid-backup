export default function CapitalizeFirstLetter(sentence: string) {
    const wordArray = sentence.split(' ');
    const capitalizedArray = wordArray.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    return capitalizedArray.join(' ')
}