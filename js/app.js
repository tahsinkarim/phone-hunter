const loadPhone = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.innerHTML = ''
    //Display 20 phones only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,20);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }
    
    //If no phones found
    const noPhone = document.getElementById('no-found-message')
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone =>{
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card p-4 h-100">
            <img src="${phone.image}" class="card-img-top mx-auto" alt="..." style="width:150px">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    This is a longer card with supporting text below 
                    as a natural lead-in to additional content.
                </p>
                <button data-bs-toggle="modal" data-bs-target="#phoneDetailModal"  onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(div)
    });
    //Hide loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function(){
    //Show loader
    processSearch(10)
})

//Enter
document.getElementById('search-field').addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        processSearch(10)
    }
})

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}


document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails= async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data)
}

const displayPhoneDetail = phone =>{
    const phoneDetailModalLabel = document.getElementById('phoneDetailModalLabel')
    phoneDetailModalLabel.innerText = phone.name

    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Informatio n'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    `
}

