// Valitse shoplist-form
const shoplistForm = document.getElementById('shoplist-form');
// Valitse input boxi
const shoplistInput = document.getElementById('shoplist-input');
// Valitse <ul> ja class="shoplist-items"
const shoplistItems = document.getElementById('shoplist-items');

// array jokainen shopitems
let shopitems = [];

// Lisätääm eventListener form:iin
shoplistForm.addEventListener('submit', function(event) {
    // Estetään sivua lataamasta uudelleen täyttäessä form:ia
    event.preventDefault();
    addShoplist(shoplistInput.value); // Kutsutaan shoplistInput functiota, input boxin nykyisen arvon kanssa
});

// Funktio, jossa shoplist item lisätään 
function addShoplist(item) {

    // Jos kenttä ei ole tyhjä
    if (item !== '') {
        // luodaan shoplist item, jossa on id, name ja completed arvo.
        const shoplist = {
            id: Date.now(),
            name: item,
            completed: false
        };

        // Lisätään se shopitems array
        shopitems.push(shoplist);
        addToLocalStorage(shopitems); 

        // tyhjennetään input boxi
        shoplistInput.value = '';
        shoplistInput.style.border = "none";

        // Jos kenttä tyhjä, kutsutaan alert ja muutetaan input boxin reunat punaiseksi
    } else {
        alert("Field is empty");
        shoplistInput.style.border = "3px solid red";
    }
}

// Funktio joka lähettää shopitems:it näytölle
function renderShoplist(shopitems) {
    // Tyhjennetään kaikki <ul> sisältä 
    shoplistItems.innerHTML = '';

    // Käy läpi kaikki items shopitems:in sisältä
    shopitems.forEach(function(item) {
        // Tarkista onko item tehty "completed"
        const checked = item.completed ? 'checked': null;

    // Tehdään <li> elementti ja täytetään se
        // <li> </li>
        const li = document.createElement('li');
        // <li class="item"> </li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="1594003133171"> </li>
        li.setAttribute('data-key', item.id);
        /* <li class="item" data-key="1594003133171">
                <input class="checkbox" type="checkbox">
                Milk
                <button class="delete-button">X</button>
            </li> */
        // Jos item on valmis, lisätään "class" <li> jota kutsutaan "chekced", Se lisää line-through tyylin
        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
            `;
            // lopuksi <li> lisätään <ul>
            shoplistItems.append(li);
        });
}

// Funktio, joka lisää shopitems:it local storage:en
function addToLocalStorage(shopitems) {
    // Muuta array string:iksi ja säilytä se
    localStorage.setItem('shopitems', JSON.stringify(shopitems));
    // Lähetä ne näytölle
    renderShoplist(shopitems);
}

// funktio joka hakee kaiken local storagesta
function getFromLocalStorage() {
    const reference = localStorage.getItem('shopitems');
    // jos reference on olemassa
    if (reference) {
        // Muuta takaisin arrayksi ja säilytä se shopitems array:ssa
        shopitems = JSON.parse(reference);
        renderShoplist(shopitems);
    }
}

// Vaihda arvoa completed ja not completed välillä
function toggle(id) {
    shopitems.forEach(function(item) {
        if (item.id == id) {
            // vaihda arvo
            item.completed = !item.completed;
        }
    });

addToLocalStorage(shopitems);
}

// poista item listalta, jonka jälkeen päivitä local storage
function deleteShopItem(id) {
    // Filteröi <li> ja id ulos ja päivitä shopitems array
    shopitems = shopitems.filter(function (item) {
        return item.id != id;
    });

// päivitä localStorage
addToLocalStorage(shopitems);
}

// hae kaikki local storagesta
getFromLocalStorage();

// sen jälkeen lisää addEventListener <ul> yhd. class=shoplistItems
shoplistItems.addEventListener('click', function(event) {
    // tarkista onko "event" checkboxissa
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    // tarkista delete-button
    if (event.target.classList.contains('delete-button')) {
        deleteShopItem(event.target.parentElement.getAttribute('data-key'));
    }
});

// Tyhjennetään localStorgae ja näytöllä olevat itemit
resetBtn.addEventListener('click', function () {
    localStorage.clear();
    window.location.reload(true);
})