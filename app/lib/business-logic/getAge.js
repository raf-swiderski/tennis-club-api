function getAge(birthDate) { // format: '1996-06-26' => 25
    const yearInMs = 3.15576e+10 // One year in milliseconds
    return Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)
}

module.exports = getAge;