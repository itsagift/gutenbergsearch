/*const request = async () => {
    let word = "cats";
    let req = await fetch(`https://api.artic.edu/api/v1/artworks/search?${encodeURIComponent(`params={"q":"${word}","query":{"term":{"is_public_domain":true)}}}`)}`);
    let res = await req.json();
    console.log(res)
}   */
const list = document.getElementById("list");


const request = async () => {
    let req = await fetch("https://gutendex.com/books");
    let res = await req.json();
    let bookList = res.results;

    bookList.forEach((book) => {
        let div = document.createElement("div")
        let h3 = document.createElement("h3")
        let bookAuthors = book.authors
        div.setAttribute("class", "book")
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

request()
