let backBtn = document.querySelector('.back-btn')


document.addEventListener("DOMContentLoaded", () => {
    let currentUrlStr = window.location.href;
    let currentUrl = new URL(currentUrlStr);
    let common = currentUrl.searchParams.get("common");
    const countryContainer = document.querySelector(".country-container")
   
    searchCountries(common)
    function displayCountries(element) {
        const { name: { common, nativeName }, subregion, languages, currencies, tld,
            population, region, borders,
            flags: { svg },
            capital } = element[0]

        countryContainer.innerHTML = ""
        countryContainer.innerHTML +=

            `
            <div class="image-container">
            <img class="flag" src="${svg}" alt="" />
        </div>
        <div class="info-container">
            <div>
                <h2>${common}</h2>
            </div>
            <div class="info">
                <div class="info-1">
                    <p><b>Native Name:</b> ${Object.values(nativeName)[0].official}</p>
                    <p><b>Population:</b> ${population.toLocaleString("en-US")}</p>
                    <p><b>Region:</b> ${region}</p>
                    <p><b>Capital:</b> ${capital}</p>
                    <p><b>Top Level Domain:</b> ${tld}</p>
                </div>
                <div class="info-2">
                    <p><b>Currencies:</b> ${Object.values(currencies)[0].name}</p>
                    <p><b>Subregion:</b> ${subregion}</p>
                    <p><b>Currencies:</b> ${Object.values(languages).join(', ')}</p>
                </div>
            </div>
            <div class="border-countries">
                <p class=border-title><b>Border Countries:</b></p>
         <div class="border-btn"></div>
            </div>
        </div>
                `
        borderCountries(borders)
    }
    async function borderCountries(border) {
        let borderBtn = document.querySelector('.border-btn')
        try {
            border.forEach(async code => {
                const data = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
                const results = await data.json()
            
                const {
                    name: { common }
                } = results[0]
                borderBtn.innerHTML +=
                    `
<a href="detail.html?common=${common}"><button class="border-country-btns">${common}</button></a>
`
            })
        } catch (error) {
            console.log(error)
        }
    }



    async function searchCountries(name) {

        const data = await fetch(`https://restcountries.com/v3.1/name/${name}`)
        const results = await data.json()

        displayCountries(results)
    }


    let btn = document.querySelector(".dark-btn");
let link = document.querySelector("#theme-dark");

btn.addEventListener("click",() =>{ ChangeTheme(); });

function ChangeTheme()
{

    let lightTheme = "detail.css";
    let darkTheme = "details-dark.css";

    let currTheme = link.getAttribute("href");
    let theme = "";

    if(currTheme == lightTheme)
    {
        btn.textContent = 'Light Mode'
      currTheme = darkTheme;
      theme = "details-dark";
    }
    else
    {  
        btn.textContent = 'Dark Mode'
      currTheme = lightTheme;
      theme = "detail";
    }

    link.setAttribute("href", currTheme);

    // Save(theme);
}
// ChangeTheme()

})






