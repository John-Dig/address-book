//Business Logic for AddressBook
//AddressBook Constructor
function AddressBook() {
  this.contacts = {};
  this.currentId = 0; //is a changing element in one of the address books
};

//AddressBook method for adding Contacts|| contact is the object passed in
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.aId();
  this.contacts[contact.id] = contact;
};

//AddressBook method for assigning unique id
AddressBook.prototype.aId = function() {
  this.currentId += 1;
  return this.currentId;
};

//AddressBook method for finding contacts
AddressBook.prototype.findC = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

//AddressBook method for deleting contacts
AddressBook.prototype.deleteC = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true
};

//optional AddressBook method for Updating contacts
AddressBook.prototype.updateC = function(id,fName, lName, phNumber) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  console.log(this.contacts[id]);
  console.log(this.fName);
  this.contacts[id].fName = fName;
  this.contacts[id].lName = lName;
  this.contacts[id].phNumber = phNumber;
}

// Business Logic for Contacts
// Contact Constructor
function Contact(fName, lName, phNumber) {
  this.fName = fName;
  this.lName = lName;
  this.phNumber = phNumber;
};
//#region main 
//Contact method for returning full name of the contact it is called on
Contact.prototype.fName = function() {
  return this.fName + " " + this.lName;
};

// fake console
//let addressBook = new AddressBook;
let contactA = new Contact("Richard", "Pants", "911-9112-911");
let contactB = new Contact("Sam", "Runs", "1800-433-8888");
let contactC = new Contact("You", "Rork", "555-5543")
addressBook.addContact(contactA);
addressBook.addContact(contactB);
addressBook.addContact(contactC);
//#endregion

//User Interface Logic ---------
let addressBook = new AddressBook;

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactdDiv.append(ul);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  addressBook.addContact(newContact);
  console.log(addressBook.contacts);
}

window.addEventListener("load", function(){
  this.document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
});