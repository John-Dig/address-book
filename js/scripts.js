//Business Logic for AddressBook
//AddressBook Constructor
function AddressBook() {
  this.contacts = {};
}

//AddressBook method for adding Contacts|| contact is the object passed in
AddressBook.prototype.addContact = function(contact) {
  this.contacts[contact.fName] = contact;
};

// Business Logic for Contacts
// Contact Constructor
function Contact(fName, lName, phNumber) {
  this.fName = fName;
  this.lName = lName;
  this.phNumber = phNumber;
}

//Contact method for returning full name of the contact it is called on
Contact.prototype.fName = function() {
  return this.fName + " " + this.lName;
};

