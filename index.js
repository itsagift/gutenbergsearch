
/*const request = async () => {
    let word = "cats";
    let req = await fetch(`https://api.artic.edu/api/v1/artworks/search?${encodeURIComponent(`params={"q":"${word}","query":{"term":{"is_public_domain":true)}}}`)}`);
    let res = await req.json();
    console.log(res)
}   */
const list = document.getElementById("list");
const colors = ["#4E937A", "#849483", "#B4656F", "#948392", "#C7F2A7"];
const colors2 = ["#264653", "#2A9D8F", "#E9C46A", "#F4A261"];
const themes = [
    {
        name: "light",
        background: "white",
        books: ["#F38181", "#FCE38A", "#EAFFD0", "#95E1D3"]
    },
    {
        name: "blue",
        background: "white",
        books: ["#F38181", "#FCE38A", "#EAFFD0", "#95E1D3"]
    },
    {
        name: "dark",
        background: "black",
        books: ["#F38181", "#FCE38A", "#EAFFD0", "#95E1D3"]
    }
]
const toggleButton = document.getElementById("toggle_theme");
const radios = document.querySelectorAll('input');
const html = document.querySelector('html');

radios.forEach(function(radio) {
    radio.addEventListener('change', setTheme);
});
function setTheme(name){
    if (this.checked) {
        selectedTheme = themes.filter(theme => theme.name === this.value);
  } else {
        selectedTheme = themes.filter(theme => theme.name === name);
  }
  console.log(selectedTheme[0].background);
  html.style.backgroundColor = selectedTheme[0].background;
  return selectedTheme;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive
}

const request = async () => {
    let req = await fetch("https://gutendex.com/books");
    let res = await req.json();
    let bookList = res.results;
    console.log(bookList)
    bookList.forEach((book) => {
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        let bookAuthors = book.authors;
        div.setAttribute("class", "book");
        div.style.backgroundColor = selectedTheme[0].books[1]
        h3.innerText = book.title;
        list.append(div)
        div.append(h3)
        bookAuthors.forEach((author) => {
            const myArray = author.name.split(",");
            let newArray = myArray.reverse().join(" ");
            let p = document.createElement("p")
            p.innerText = newArray;
            div.append(p)
        })
        
    })
} 
setTheme("light")
request()
