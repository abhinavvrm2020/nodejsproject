const cityName = document.getElementById('cityName');

const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');
const temp_real_val = document.getElementById('temp_real_val');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === "") {
        city_name.innerText = `Please enter City Name`;
        datahide.classList.add('data_hide');
    }else {
        console.log(cityVal);
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=8a29d599b7ccb96b7b33cd066afe9a32`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const arrData = [data];
            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            var inKelvin = arrData[0].main.temp;
            inKelvin -= 273;
            temp_real_val.innerText = Math.floor(inKelvin);
            const tempMood = arrData[0].weather[0].main;

            if(tempMood == "Clear") {
                temp_status.innerHTML = "<i class = 'fas  fa-sun' style = 'color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class = 'fas  fa-cloud' style = 'color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class = 'fas  fa-cloud-rain' style = 'color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class = 'fas  fa-sun' style = 'color: #eccc68;'></i>";
            }
            datahide.classList.remove('data_hide');
        } catch {
            city_name.innerText = `Please enter valid City Name`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click',getInfo);