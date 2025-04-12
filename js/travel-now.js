const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-button");
const searchInput = document.getElementById("search-input");
const recommendationsContainer = document.getElementById("recommendations");

const url = "../travel_recommendation_api.json"
const recommendations = [];

const getRecommendation = () => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        recommendations.push(json)
    });
};
getRecommendation();

const createElements = (place, searchValue) => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const h3 = document.createElement("h3");
        
        if (searchValue === "countries") {
            const country = recommendations[0][searchValue][place].cities;
            for (city in country) {
                img.src=`../images/${country[city].imageUrl}`
                h3.textContent = country[city].name
                p.textContent = country[city].description
            }
        } else {
            img.src=`../images/${recommendations[0][searchValue][place].imageUrl}`
            h3.textContent = recommendations[0][searchValue][place].name
            p.textContent = recommendations[0][searchValue][place].description
        }
        
        div.classList.add("card")
        div.appendChild(img)
        div.appendChild(h3)
        div.appendChild(p)
        recommendationsContainer.appendChild(div);
}

const searchRecommendations = () => {
    const searchValue = searchInput.value.toLowerCase().trim()
    recommendationsContainer.innerHTML = ""
    if (searchValue.includes("beach")) {
        for(beach in recommendations[0]["beaches"]) {
            const beaches = "beaches"
            createElements(beach, beaches)
        } 
    }
    if (searchValue.includes("temple")) {
        for(temple in recommendations[0]["temples"]) {
            const temples = "temples"
            createElements(temple, temples)
        }
    }
    if (searchValue.includes("count")) {
        for(countriesArray in recommendations[0]["countries"]) {
            const countries = "countries"
            createElements(countriesArray, countries)    
        }
    }
}

const clearRecommendations = () => {
    const child = document.querySelector(".card")
    recommendationsContainer.innerHTML = ""
}

searchButton.addEventListener("click", () => searchRecommendations())
clearButton.addEventListener("click", () => clearRecommendations())