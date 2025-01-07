function timeConverter(value){
    let splittedTime = value.split(":");
    if(splittedTime[0] > 12){
        let convertedHour = splittedTime[0] - 12;
        return `${convertedHour}:${splittedTime[1]} PM`
    }else if(splittedTime[0] == 12){
        return `${value} PM`
    }else{
        return `${value} AM`
    }
}

function checkPrayerTime(){
    let city = document.getElementById("cityName").value
    let country = document.getElementById("countryName").value

    // Check if the city name is entered in the country field
    if (city && !country) {
        alert("Please enter the country name.");
        return; // Exit the function if the alert is shown
    }

    if (!city && country) {
        alert("Please enter the city name.");
        return; // Exit the function if the alert is shown
    }

    axios.get(`https:api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}&method=1`)
    .then((responce) => {
        console.log(responce.data.data);
        let date = responce.data.data.date
        let timeZone = city
        let timing = responce.data.data.timings
        document.querySelector("#date").innerHTML = date.readable
        document.querySelector("#hjri").innerHTML =`${date.hijri.date} سَنَة هِجْرِيَّة`
        document.querySelector("#fajr").innerHTML = `Fajr: ${timeConverter(timing.Fajr)}`
        document.querySelector("#dhuhr").innerHTML = `Dhuhr: ${timeConverter(timing.Dhuhr)}`
        document.querySelector("#asr").innerHTML = `Asr: ${timeConverter(timing.Asr)}`
        document.querySelector("#maghrib").innerHTML = `Maghrib: ${timeConverter(timing.Maghrib)}`
        document.querySelector("#isha").innerHTML = `Isha: ${timeConverter(timing.Isha)}`
        document.querySelector("#sunrise").innerHTML = `Sunrise: ${timeConverter(timing.Sunrise)}`
        document.querySelector("#sunset").innerHTML = `Sunset: ${timeConverter(timing.Sunset)}`
        document.querySelector("#citysName").innerHTML = timeZone.toUpperCase();
    })
    .catch((error) => {
        console.log(error);
    })
}