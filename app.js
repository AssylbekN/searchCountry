const container = document.querySelector('.container')
let searchInput=document.querySelector('#search-input')
const filter = document.querySelector('#filter')



fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => {
       
        displayCountries(data)
    })


    function displayCountries(results) {
   
        container.innerHTML = ""
        results.forEach(element => {
        const { name: { common },
            population, region,
            flags: {png},
            capital} = element
    
        container.innerHTML +=
    
            `
            
                <div class="card">
                <img src="${png}" alt=""/>
               <a href="detail.html?common=${common}" > 
               <h2>${common}</h2> </a>
                <p><b>Population:</b> ${population.toLocaleString("en-US")}</p>
                <p><b>Region:</b> ${region}</p>
                <p><b>Capital:</b> ${capital}</p>
                </div>
                `
            });
    }

searchInput.addEventListener('input', (e) =>{
    e.preventDefault();
    const inputValue = searchInput.value
searchCountries(inputValue)
   
})
async function searchCountries(name){
    const data = await fetch(`https://restcountries.com/v3.1/name/${name}`)
const results = await data.json()
displayCountries(results)
}

filter.addEventListener('change', (e) =>{
    e.preventDefault();
    const selectValue = e.target.value
selectRegion(selectValue)
   
})
async function selectRegion(region){
    const data = await fetch(`https://restcountries.com/v3.1/region/${region}`)
const results = await data.json()
displayCountries(results)
}



let btn = document.querySelector(".dark-btn");
let link = document.querySelector("#theme-dark");

btn.addEventListener("click",() =>{ ChangeTheme(); });

function ChangeTheme()
{

    let lightTheme = "style.css";
    let darkTheme = "style-dark.css";

    let currTheme = link.getAttribute("href");
    let theme = "";

    if(currTheme == lightTheme)
    {
        btn.textContent = 'Light Mode'
      currTheme = darkTheme;
      theme = "style-dark";
    }
    else
    {  
        btn.textContent = 'Dark Mode'
      currTheme = lightTheme;
      theme = "style";
    }

    link.setAttribute("href", currTheme);

    //Save(theme);
}

