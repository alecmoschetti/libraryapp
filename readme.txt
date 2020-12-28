*instructions*
1. All of your book objects are going to be stored in a simple array, 
so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. 
Your code should look something like this:

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

2. Write a function that loops through the array and displays each book on the page. 
You can display them in some sort of table, or each on their own “card”. 
It might help for now to manually add a few books to your array so you can see the display.

3. Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: 
author, title, number of pages, whether it’s been read and anything else you might want.

4. Add a button on each book’s display to remove the book from the library.

5. You will need to associate your DOM elements with the actual book objects in some way. 
One easy solution is giving them a data-attribute that corresponds to the index of the library array.

6. Add a button on each book’s display to change its read status.
To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

*optional*
-we haven’t learned any techniques for actually storing our data anywhere, 
so when the user refreshes the page all of their books will disappear! 
If you want, you are capable of adding some persistence to this library app using one of the following techniques:

1. localStorage (docs here) allows you to save data on the user’s computer. 
The downside here is that the data is ONLY accessible on the computer that it was created on. 
Even so, it’s pretty handy! 
Set up a function that saves the whole library array to localStorage every time a new book is created, 
and another function that looks for that array in localStorage when your app is first loaded. 
(make sure your app doesn’t crash if the array isn’t there!)

2. Firebase (check it out!) is an online database that can be set up relatively easily, 
allowing you to save your data to a server in the cloud! 
Teaching you how to use it is beyond the scope of this tutorial, 
but it is almost definitely within your skill set.

pseudocode below -------------------------------

Most of the code for each event is basically gonna live in a separate function
and they will all be triggered by the user clicking the submit button

so event listener on the submit button
event should fire that prevents the default submit actions and thus prevents the page reload

function triggers that will grab all the values that are in the form and stores them in an object(?)
it will then create a new book object using that newly created object (dot notation references)
once completed it will push that new book object into the myLibrary array.

clear the form so the user can exit and or fill out another series of values

function triggers that will populate the display of the cards element with each book in the library array
a loop will iterate over each book object to grab each book (foreach method maybe)?
inside that foreach method, a for of loop will run on the current selected book object
Each value will be stored as template literals and appended to the dom 

addeventlistener inside our submit one to listen for edit and delete buttons

grab the edit buttons in a querySelectorAll and run a foreach addeventlistener call on it


