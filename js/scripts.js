// Business Logic for AddressBook ---------
//AddressBook constructor
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
//adding method to AddressBook
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();             
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1; 
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = {};
  this.currentId = 0;
  this.email = email;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//adding method to Contact
Contact.prototype.addAddress = function(address) {
  address.id = this.assignId();
  this.addresses[address.id] = address;
};

Contact.prototype.assignId = function() {
  this.currentId += 1; 
  return this.currentId;
};

Contact.prototype.findAddress = function(id) {
  if (this.addresses[id] !== undefined) {
    return this.addresses[id];
  }
  return false;
};
//Address constructor
function Address(type, location){
  this.type = type;
  this.location = location;
} 


Address.prototype.toString = function(){
  return this.type + ": " + this.location;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  removeAddressLinesDisplay();
  const contact = addressBook.findContact(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".email").innerText = contact.email;
  document.querySelector("button.delete").setAttribute("id", contact.id);

  let addressId = 1;
  while(contact.findAddress(addressId)){
    addAddressLine(addressId, contact);
    addressId++;
  }
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function addAddressLine(addressIdToAdd, contactPassIn){ //new
  const contact = contactPassIn;
  const addressLine = document.createElement("li");
  addressLine.setAttribute("id", "address" + addressIdToAdd);
  addressLine.innerText = contact.findAddress(addressIdToAdd).toString();
  document.querySelector(".addresses").append(addressLine);
}

function removeAddressLinesDisplay(){
  while(document.querySelector(".addresses").firstChild){
    document.querySelector(".addresses").removeChild(document.querySelector(".addresses").firstChild);
  }
}

function Address(type, location){
  this.type = type;
  this.location = location;
} 


function submitAddresses(passedInContact){
  let addressId = 0;
  while(document.getElementById("new-address" + addressId)){
    const addressLocation = document.getElementById("new-address" + addressId).value //the address's location
    const addressName = document.getElementById("new-address-name" + addressId).value
    let newAddress = new Address(addressName, addressLocation);
    passedInContact.addAddress(newAddress);
    addressId++;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail = document.querySelector("input#new-email").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
  submitAddresses(newContact);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  document.querySelector("input#new-email").value = null;
  removeExtraAddressLines(); //new
  addNewAddressInputForm(); //new
  
}

function removeExtraAddressLines(){ //new
  while(document.getElementById("address-input-area").firstChild){
    document.getElementById("address-input-area").removeChild(document.getElementById("address-input-area").firstChild);
  }
}

function addNewAddressInputForm(){ //new 
  let addressId = 0;
  while(document.getElementById("new-address" + addressId)){
    addressId++;
  }
  const newAddressNameLabel = document.createElement("label");
  const newAddressNameInput = document.createElement("input");
  newAddressNameLabel.setAttribute("for", "new-address-name");
  newAddressNameLabel.innerText = "Address " + (addressId+1) + " Name";
  newAddressNameInput.setAttribute("type", "text");
  newAddressNameInput.setAttribute("class", "form-control");
  newAddressNameInput.setAttribute("id", "new-address-name" + addressId);
  newAddressNameInput.setAttribute("name", "new-address-name");
  
  document.getElementById("address-input-area").append(newAddressNameLabel);
  document.getElementById("address-input-area").append(newAddressNameInput);
  
  const newAddressLocationLabel = document.createElement("label");
  const newAddressLocationInput = document.createElement("input");
  newAddressLocationLabel.setAttribute("for", "new-address");
  newAddressLocationLabel.innerText = "Address";
  newAddressLocationInput.setAttribute("type", "text");
  newAddressLocationInput.setAttribute("class", "form-control");
  newAddressLocationInput.setAttribute("id", "new-address" + addressId);
  newAddressLocationInput.setAttribute("name", "new-address");
  
  document.getElementById("address-input-area").append(newAddressLocationLabel);
  document.getElementById("address-input-area").append(newAddressLocationInput);
  
}
window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
  addNewAddressInputForm();
  document.querySelector("button.addAddressLine").addEventListener("click", addNewAddressInputForm) //new
});

//<label for="new-address">Address</label>
//<input type="text"  class="form-control" id="new-address" name="new-address">