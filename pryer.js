
// ---- name of city  ----//
// search ISO 3166 code for emariate 2 character
// https://www.iso.org/obp/ui/#search

let all_country = [
        {"city": "Dammam",
        "country": "SA",
        "arCity" :  "الدمام"
        },
        {"city": "Ar Riyāḑ",
        "country": "SA",
        "arCity" :  "الرياض"
        },
        {"city": "Jeddah",
        "country": "SA",
        "arCity" :  "جدة"
        },
        {"city": "Abū Z̧aby",
        "country": "AE",
        "arCity" :  "أبوظبي"
        },
        {"city": "Ad Dawḩah",
        "country": "QA",
        "arCity" : "الدوحة"
        }
]

// --- value on select ---//
for ( let city of all_country )
        {
                const content = `<option>${city.arCity}</option>`
                document.getElementById("all-city").innerHTML += content
        }


// --- defult value for pryer time ---//
getPrayersTimeOfCity("Dammam","SA")
document.getElementById("city").innerHTML = "الدمام"


// ---- select name of city ----//
document.getElementById("all-city").addEventListener("change", function (){
        
        let indexSelecetCity = all_country.findIndex(item => item.arCity === this.value)

        let citySelect = all_country[indexSelecetCity].city
        let countrySelect = all_country[indexSelecetCity].country
        let arCitySelect = all_country[indexSelecetCity].arCity


        getPrayersTimeOfCity(citySelect ,countrySelect)
        // ---- title ----
        document.getElementById("city").innerHTML = arCitySelect
})

// ---- pryer time for city ----//
function getPrayersTimeOfCity(cityName, countryName){
        axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=${countryName}`)
        .then(function (response) {
                // ---- name of day & hijri date & gregorian date  ----   
                let  date = response.data.data.date
                let fullDate = {
                        "day-name":date.hijri.weekday.ar,
                        "ar-day": date.hijri.day,
                        "ar-month": date.hijri.month.ar,
                        "ar-year": date.hijri.year,
                        "en-day": date.gregorian.day,
                        "en-month": date.gregorian.month.en,
                        "en-year": date.gregorian.year
                }
                postDataInSite(fullDate)

                // ---- pryer time ----
                let time = response.data.data.timings
                let pryer_time = {
                        "fajr": time.Fajr,
                        "sunrise" : time.Sunrise,
                        "dhuhr" : time.Dhuhr,
                        "asr" : time.Asr,
                        "maghrib" : time.Maghrib,
                        "isha" : time.Isha,
                        "midnight" : time.Midnight,
                        "lastthird" : time.Lastthird,
                }
                postDataInSite(pryer_time)
        })
        .catch(function (error) {
            alert(error.response.data.error)
        })
}

// ---- document.getElementById no repeat ----//
function postDataInSite(data){
        for (const [key, value]  of Object.entries(data) )
                {
                        document.getElementById(key).innerHTML = value
                }    
}
