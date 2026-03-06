const form = document.getElementById("contactForm");
const contactsList = document.getElementById("contactsList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

function saveContacts() {
localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {

contactsList.innerHTML = "";

contacts.forEach((contact, index) => {

const li = document.createElement("li");

li.innerHTML = `
<div class="contactInfo">
<strong>${contact.name} ${contact.surname}</strong><br>
📞 ${contact.phone}<br>
✉️ ${contact.email}
</div>

<div class="buttons">
<button class="edit">Edit</button>
<button class="delete">Delete</button>
</div>
`;

const deleteBtn = li.querySelector(".delete");
const editBtn = li.querySelector(".edit");

deleteBtn.addEventListener("click", () => {
deleteContact(index);
});

editBtn.addEventListener("click", () => {
editContact(index);
});

contactsList.appendChild(li);

});

}

form.addEventListener("submit", function(e) {

e.preventDefault();

const name = document.getElementById("name").value;
const surname = document.getElementById("surname").value;
const phone = document.getElementById("phone").value;
const email = document.getElementById("email").value;

const contact = {
name,
surname,
phone,
email
};

if (editIndex === null) {

contacts.push(contact);

} else {

contacts[editIndex] = contact;
editIndex = null;

}

saveContacts();
renderContacts();

form.reset();

});

function deleteContact(index) {

contacts.splice(index, 1);

saveContacts();
renderContacts();

}

function editContact(index) {

const contact = contacts[index];

document.getElementById("name").value = contact.name;
document.getElementById("surname").value = contact.surname;
document.getElementById("phone").value = contact.phone;
document.getElementById("email").value = contact.email;

editIndex = index;

}

renderContacts();