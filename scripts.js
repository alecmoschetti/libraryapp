//global variables go here

let myLibrary = [];
const main = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const addBookButton = document.querySelector("#addBook");
const modalClose = document.querySelector(".close");
const form = document.querySelector("form");
const submit = document.querySelector(`button[type="submit"]`);
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const userScoreDiv = document.querySelector(".userScore");


//object declarations, classes, and constructor functions go here

function Book(title, author, read, rating) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
}

Book.prototype.changeRead = function(bool) {
    (bool === true) ? this.read = undefined : this.read = "on";
};

//global helper functions here

function addBookToLibrary() {
    if (titleInput.value === "" || authorInput.value === "") { //making sure we have these required inputs filled out
        alert("Please fill out all required inputs to submit your book");
    } else {
    let formData = new FormData(form); /* learned this from this thread https://stackoverflow.com/questions/41431322/how-to-convert-formdatahtml5-object-to-json*/
    let obj = Object.fromEntries(formData);
    let book = new Book(obj.title, obj.author, obj.readstatus, obj.rating); //using object destructuring to pull our form data object property values to pass as arguments to our constructor function
    myLibrary.push(book); //pushing our newly created book object into the myLibrary array
    }
    setStorage(myLibrary);
    getScore(myLibrary);
}

function displayBooks(arr) {
    main.innerHTML = ''; //makes sure we start over again and not add repeats
    arr.forEach(obj => {
        let {title, author, read, rating} = obj; //object destructuring to create variables from each book object values in our array to pass as arguments to my makeCards function
        makeCards(title, author, read, rating); //see function makeCards below -- again these arguments are variables storing the book object property values for each book in the array
    });
}

function makeCards(title, author, read, rating) {
    let card = document.createElement("div"); //making our card container div
    card.classList.add("card"); //adding class to it
    card.dataset.book = title; //setting a unique dataset for the card div equal to the specific book's title
    if (read === undefined) { //specific template literal to fill our card if read checkbox was unchecked. it leaves out the rating score 
        read = `nope <i class="mi-ban"></i>`; /* sets the read variable to nope and then the no symbol */
        card.innerHTML = `
        <div class="cardContent">
            <div class="bookInfo">
                <p>${title}</p>
                <p>${author}</p>
                <p>Read: ${read}</p> 
            </div>
            <div class="bookButtons">
                <button class="edit"><i class="mi-eye"></i></button>
                <button class="delete"><i class="mi-delete"></i></button>
            </div>  
        </div>`;
    } else if (read === "on") { //template literal to fill our card if read checkbox was checked. will include the rating score
        read = `yep <i class="mi-check"></i>`;
        card.innerHTML = `
        <div class="cardContent">
            <div class="bookInfo">
                <p>${title}</p>
                <p>${author}</p>
                <p>Read: ${read}</p>
                <p>Rating: ${rating}</p>
            </div>
            <div class="bookButtons">
                <button class="edit"><i class="mi-eye-off"></i></button>
                <button class="delete"><i class="mi-delete"></i></button>
            </div>  
        </div>`;
    }
    main.appendChild(card); //appending our child to the DOM inside the main element
}

function setStorage(arr) {
    localStorage.setItem("myLibrary", JSON.stringify(arr));
} 

function getStorage() {
    if (!localStorage.myLibrary) {
        displayBooks(myLibrary);
    } else {
        let objects = localStorage.getItem("myLibrary");
        objects = JSON.parse(objects);
        let flattened = objects.reduce((acc, val) => acc.concat(val), []);
        flattened.forEach(object => myLibrary.push(new Book(object.title, object.author, object.read, object.rating)));
        displayBooks(myLibrary);
        getScore(myLibrary);
    }
}

function getScore(arr) {
    let filtered = arr.filter(book => (book.read === "on"));
    let booksRead = filtered.length;
    const averageLife = 72.63;
    const averageBooksPerYear = 12;
    const averageReaderReads = (averageLife * averageBooksPerYear);
    const averageScore = (averageReaderReads/134021533) * 100;
    let userScore = (booksRead/134021533) * 100;
    let delta = averageReaderReads - booksRead;
    let moreOrLess = (delta > 0) ? `${delta} less` : `${delta} more`;
    userScoreDiv.innerHTML = `
        <h3>You've read ${booksRead} books of 134,021,533 books in existence</h3>
        <h4>Your book score: ${userScore}%</h4>
        <h4>Average person book score: ${averageScore}%</h4>
        <h4>You've read ${moreOrLess} books than the average reader in their lifetime</h4>`;
}
//event handing goes here

//modal window event listeners
addBookButton.addEventListener("click", () => {
    overlay.classList.toggle("hidden");
});

modalClose.addEventListener("click", () => {
    overlay.classList.toggle("hidden");
});

submit.addEventListener('click', (e) => {
    e.preventDefault(); //making sure the form doesn't try to post input values anywhere so we can grab them and manipulate them ourselves
    addBookToLibrary(); //see function definition above -- adds book to our myLibrary array
    form.reset(); //built in js function to clear form elements
    displayBooks(myLibrary); //see function definition above -- passing our myLibrary array as an arg to the function
});

main.addEventListener("focusin", (e) => {
        let deleteButton = document.querySelectorAll(".delete"); //since this doesn't exist until affter the previous function call, I declare this variable now instead of global scope
        deleteButton.forEach(button => button.addEventListener("click", (e) => { //adds a click event for each delete button that runs the below arrow function
            let target; //ternary operator below incase user clicks on button vs. i element in button; essentially makes sure we're gonna grab the right parentnode
            (e.target.classList.contains("delete")) ? target = e.target.parentNode.parentNode.parentNode : target = e.target.parentNode.parentNode.parentNode.parentNode; //grabbing the final ancestor the card element
            let attr = target.dataset.book; //grabbing the card that was clicked custom book dataset attribute
            let index; //initializing variable to use inside the forEach loop below
            myLibrary.forEach(book => {
                if (book.title == attr) { //when cycling through the array, if the book object title property equals our target card attribute
                    index = myLibrary.indexOf(book); //set the index variable to equal the indexOf that object in our array
                    if (index > -1) myLibrary.splice(index, 1); //remove our book from the array
                    main.removeChild(target); //remove our card from the DOM
                    setStorage(myLibrary);
                    getScore(myLibrary);
                }});
        }));
        let editButton = document.querySelectorAll(".edit");
        editButton.forEach(button => button.addEventListener("click", (e) => {
            let target;
            (e.target.classList.contains("edit")) ? target = e.target.parentNode.parentNode.parentNode : target = e.target.parentNode.parentNode.parentNode.parentNode;
            let attr = target.dataset.book; //grabbing the card that was clicked custom book dataset attribute
            myLibrary.forEach(book => {
                if (book.title == attr) { //when cycling through the array, if the book object title property equals our target card attribute
                    (book.read === "on") ? book.changeRead(true) : book.changeRead(false);
                    displayBooks(myLibrary);
                    setStorage(myLibrary);
                    getScore(myLibrary);
                }});
        }));
});

//any other scripts

getStorage();




