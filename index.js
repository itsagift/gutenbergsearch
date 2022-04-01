const list = document.getElementById("list");
const themeRadios = document.querySelectorAll(".radio_theme");
const genreRadios = document.querySelectorAll(".radio_genre");
const themeSelector = document.querySelector(".header_selector");
const radioContainer = document.querySelector(".header_radios");
const genreForm = document.querySelector(".genres_input");
const inputText = document.querySelector("#input_text");
const submitButton = document.querySelector(".submit_button");
const html = document.querySelector("html");
const body = document.querySelector("body");
let selectedTheme = "light";
let checked = "books";

themeSelector.addEventListener("click", dropDown);

function dropDown() {
    console.log(radioContainer.classList)
    if (radioContainer.classList.contains("invisible")) {
        radioContainer.classList.remove("invisible");
        } else {
        radioContainer.classList.add("invisible");
        }
}

genreForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(inputText.value)
    setGenreInput(inputText.value)
})

genreRadios.forEach(function(radio) {
    radio.addEventListener('change', setGenre);
});

function handleError(err) {
    console.log('Ohhhh nooo');
    console.log(err);
  }

function setGenreInput(name){
    if (name){
        console.log(name)
        fetch(`https://gutendex.com/books/?topic=${name}`).then(async response => {
            try {
             const data = await response.json()
             renderBooks(data.results);
           } catch(error) {
             alert("Oops!")
           }
          })
    }
    else {
        alert("Not a valid genre.")
    }
}

async function setGenre () {
    if (this.value) {
        let req = await fetch(`https://gutendex.com/books/?topic=${this.value}`);
        console.log(req)
        let res = await req.json();
        console.log(res)
        renderBooks(res.results);
    }
    else {
        let req = await fetch(`https://gutendex.com/books`);
        let res = await req.json();
        renderBooks(res.results);
    }
} 

themeRadios.forEach(function(radio) {
    radio.addEventListener('change', setTheme);
});

function setTheme(){
    if (this.checked) {
        selectedTheme = this.value;
    } 
    html.className='';
    html.classList.add(selectedTheme);
}

const renderBooks = (bookList) =>{
    list.innerHTML = '';
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    bookList.forEach((book) => {
        let div = document.createElement("div");
        let heart = document.createElement("div");
        let heartContainer = document.createElement("div");
        let heartLabel = document.createElement("div");
        let likeCount = 0;
        let h3 = document.createElement("h3");
        let img = document.createElement("img");
        let bookAuthors = book.authors;
        div.setAttribute("class", `book card_${getRandomInt(1,5)}`);
        h3.innerText = book.title;
        h3.setAttribute("class", "book_title");
        heartLabel.innerText = likeCount;
        heartContainer.setAttribute("class", "book_heart_container")
        heart.setAttribute("class", "book_heart");
        heart.addEventListener("click", (evt) => {
            if (heart.classList.contains("liked")) {
            heart.classList.remove("liked");
            likeCount = 0;
            } else {
            heart.classList.add("liked");
            likeCount = 1;
            }
            heartLabel.innerText = likeCount;
        });

        div.append(h3);
        bookAuthors.forEach((author) => {
            const myArray = author.name.split(",");
            let newArray = myArray.reverse().join(" ");
            let p = document.createElement("p")
            p.innerText = newArray;
            div.append(p)
        })
        heartContainer.append(heart, heartLabel)
        div.append(heartContainer);
        list.append(div)
    })
    
}
setGenre()
setTheme("light")

