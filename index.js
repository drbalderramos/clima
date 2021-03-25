const URL ='https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '2e327e5b48f974bf629dd4a6c1c72534';
let inputCity;

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const citys = document.querySelector('#citys');
const app = document.querySelector('#app');

form.addEventListener('submit', e => {
    e.preventDefault();
    inputCity = input.value.toLowerCase();
    fetchData(URL, inputCity);
})

const fetchData = async (URL, city) => {
        try {
            const dataCity = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`).then((RES_JSON) => RES_JSON.json());
            console.log(dataCity);

            const {main, name, sys, weather} = dataCity;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            //console.log(icon);

            const li = document.createElement("li");
            li.classList.add("city");

            const markup = `<h2 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
              <img class="city-icon" src="${icon}" alt="${
            weather[0]["description"]
          }">
              <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
          `;
          li.innerHTML = markup;
          citys.appendChild(li);


        } catch (error) {
            console.error(error);
        }
}
            
            