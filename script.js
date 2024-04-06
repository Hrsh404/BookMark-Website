// Function to add a new item to the cart and post to CRUDcrud
function addItem() {
  var WebsiteTitle = document.getElementById('WebsiteTitle').value;
  var WebsiteUrl = document.getElementById('WebsiteUrl').value;
  
  // Define the item data
  var itemData = {
      name: WebsiteTitle,
      WebsiteUrl: WebsiteUrl
  };

  // Use Fetch API to post the data to CRUDcrud
  fetch('https://crudcrud.com/api/5deb232b9a494d4eb056f8edc00907a3/products', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      displayItem(itemData); 
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

// Function to display item in the cart
function displayItem(item) {
  var newRow = document.createElement('tr');
  newRow.innerHTML = `
      <td>${item.name}</td>
      <td><a href="${item.WebsiteUrl}" target="_blank">${item.WebsiteUrl}</a></td>
      <td><button onclick="editItem(this)">Edit</button></td>
      <td><button onclick="deleteItem(this)">Delete</button></td>
  `;

  // Append the new row to the table
  document.getElementById('ALLBOOKMarks').appendChild(newRow);
}

// Function to edit item
function editItem(button) {
  var row = button.parentElement.parentElement;
  var WebsiteTitle = row.cells[0].innerText;
  var WebsiteUrl = row.cells[1].innerText;

  // Assuming that the editing will replace the existing item with a new one
  var updatedWebsiteTitle = prompt('Enter updated Website Title:', WebsiteTitle);
  var updatedWebsiteUrl = prompt('Enter updated Website URL:', WebsiteUrl);

  var updatedItemData = {
    name: updatedWebsiteTitle,
    WebsiteUrl: updatedWebsiteUrl
  };

  // Use Fetch API to update the data in CRUDcrud
  fetch('https://crudcrud.com/api/5deb232b9a494d4eb056f8edc00907a3/products', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItemData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Assuming you want to replace the existing row with the updated data
    row.cells[0].innerText = updatedWebsiteTitle;
    row.cells[1].innerHTML = `<a href="${updatedWebsiteUrl}" target="_blank">${updatedWebsiteUrl}</a>`;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Function to delete item
function deleteItem(button) {
  var row = button.parentElement.parentElement;
  var WebsiteTitle = row.cells[0].innerText;

  // Use Fetch API to delete the item from CRUDcrud
  fetch(`https://crudcrud.com/api/5deb232b9a494d4eb056f8edc00907a3/products?name=${WebsiteTitle}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Remove the row from the table
    row.remove();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
