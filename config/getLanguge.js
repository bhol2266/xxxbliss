import countrylist from '../JsonData/CountryList.json'


export function getLanguge(countryName) {
    var lang = ''

    countrylist.forEach(obj => {
        if (obj.CountryName === countryName) {
            lang = obj.language
        }
    })

    if (lang.length === 0) {
        lang = 'indian'
    }
    return lang


}
