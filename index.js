let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.querySelector(".spinner");
let resultContainer = document.querySelector(".search-results-container");

let searchInput = searchInputEl.value;
console.log(searchInput);



// let option = {
//     method: 'GET'
// }

// fetch(url, option)
// .then(function(response){
//     console.log(response.json);
// })
// .then(function(jsonData){
//     console.log(jsonData);
// })

let createAndAppendProfile = function(profiles)
{
    console.log(profiles);
    let {avatar_url, name, followers, following, public_repos, bio} = profiles;
    console.log(followers)
    console.log(following)
    spinnerEl.classList.add("d-none");
    let divElement = document.createElement("div");
    divElement.classList.add("profile-card-container");
    let imgElement = document.createElement('img');
    imgElement.classList.add("profile-image");
    imgElement.src = avatar_url;
    divElement.appendChild(imgElement);

    let detailsContainer = document.createElement('div');
    detailsContainer.classList.add("details-container");
    let header = document.createElement("h1");
    header.classList.add("profile-name");
    header.textContent = name;
    detailsContainer.appendChild(header);
    divElement.appendChild(detailsContainer)
    resultContainer.appendChild(divElement);

    let bioElement = document.createElement("p");
    bioElement.textContent = "Bio: " + bio;
    bioElement.classList.add("profile");
    detailsContainer.appendChild(bioElement);

    let listContainer = document.createElement('ul');
    listContainer.classList.add("list-container-profile");
    detailsContainer.appendChild(listContainer);

    

    
    let itemList1 = document.createElement('li');
    itemList1.classList.add("item-list-container");
    let paragraphEl = document.createElement("p");
    paragraphEl.classList.add("profile-description");
    paragraphEl.textContent = "Respositories";
    let countEl = document.createElement('p');
    countEl.textContent = public_repos;
    itemList1.appendChild(countEl);
    itemList1.appendChild(paragraphEl);
    listContainer.appendChild(itemList1);

    let itemList2 = document.createElement('li');
    itemList2.classList.add("item-list-container");
    let paragraphE2 = document.createElement("p");
    paragraphE2.classList.add("profile-description");
    paragraphE2.textContent = "Following";
    let countE2 = document.createElement('p');
    countE2.textContent = following;
    itemList2.appendChild(countE2);
    itemList2.appendChild(paragraphE2);
    listContainer.appendChild(itemList2);
    

    let itemList3 = document.createElement('li');
    itemList2.classList.add("item-list-container");
    let paragraphE3 = document.createElement("p");
    paragraphE3.classList.add("profile-description");
    paragraphE3.textContent = "Follower";
    let countE3 = document.createElement('p');
    countE3.textContent = followers;
    itemList3.appendChild(countE3);
    itemList3.appendChild(paragraphE3);
    listContainer.appendChild(itemList3);

    

}


function searchGithub(e)
{
    if (e.key === "Enter")
    {
        let userName = searchInputEl.value;
        if (userName === "") alert("Please Enter Valid UserName");
        // console.log(userName);
        spinnerEl.classList.remove('d-none');
        resultContainer.textContent = "";
        searchInputEl.value = "";
        let url = "https://api.github.com/users/" + userName;
        let options = {
            method: "GET"
        };
        fetch(url, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            // console.log(jsonData.status);
            // console.log(jsonData.message);

            if (jsonData.status === "404")
            {
                spinnerEl.classList.add("d-none");
                let createImage = document.createElement("img");
                createImage.src = "https://res.cloudinary.com/ddc7e5e7s/image/upload/v1735109073/error-404-not-found-text-design-vector_oiiceg.jpg";
                createImage.classList.add("error-image");
                resultContainer.appendChild(createImage);
            }
            else{
                createAndAppendProfile(jsonData);
                console.log(jsonData);
            }

            
        })

    }
}


searchInputEl.addEventListener("keydown", searchGithub)