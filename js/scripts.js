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

// Business Logic for Contacts
// Contact Constructor
function Contact(fName, lName, phNumber) {
  this.fName = fName;
  this.lName = lName;
  this.phNumber = phNumber;
};

//Contact method for returning full name of the contact it is called on
Contact.prototype.fName = function() {
  return this.fName + " " + this.lName;
};

// fake console
let addressBook = new AddressBook;
let contactA = new Contact("Richard", "Pants", "911-9112-911");
let contactB = new Contact("Sam", "Runs", "1800-433-8888");
let contactC = new Contact("You", "Rork", "555-5543")
addressBook.addContact(contactA);
addressBook.addContact(contactB);
