/* Before we start, please use the following HTML in your codepen or
   environment of your choice to continue this assignment

   <!-- We start by creating the basics for a table -->

	<table>
		<thead>
			<tr>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
*/

/* Assume we have a non-normalized dataset to start with */

const data = [
	{
		id: 1,
		name: 'ROBERT',
		kaas: false,
		coords: {
			lat: "52.3676",
			long: "4.9041"
		}
	},
	{
		id: "2",
		name: 'viNcent',
		kaas: "true",
		coords: {
			lat: "52.3676",
			long: "4.9041"
		}
	},
	{
		id: 3,
		name: 'laura',
		kaas: true,
		coords: {
			lat: "52.3676",
			long: "4.9041"
		}
	},
]

/* This assignment builds on the earlier assignment we did today. Create a table
   containing the above dataset, this time though, the dataset is a bit scuffed.
   We need to normalize the data by addressing the following issues:

   1) The id is not always a number, convert it to an integer / number first.
   2) The name isn't normalized, random capitals appear. Change this string in a
   first letter capital and lowercase after that
   3) "kaas" is not always a boolean. Convert it to a string so we can print it in HTML
   4) "coords" is an object. If you try and print this, you'll get [object Object] or something.
   We'll have to loop over the object and print a custom string using template literals.
*/

function generateTable() {
	// Step 1: Select the table, table heading, and table body and save them to variables
	const table = document.querySelector('table');
	const thead = table.querySelector('thead tr');
	const tbody = table.querySelector('tbody');
  
	// Step 2: Generate table headers
	const keys = Object.keys(data[0]);
	keys.forEach((key) => {
	  const th = document.createElement('th');
	  th.textContent = key;
	  thead.appendChild(th);
	});
  
	// Step 3: Loop over the data and create table rows with data points
	data.forEach((item) => {
	  const tr = document.createElement('tr');
  
	  // Loop through the keys and create table data cells for each key
	  keys.forEach((key) => {
		const td = document.createElement('td');
		let value = item[key];
  
		// Normalize the data based on the key
		if (key === "id") {
		  // Convert "id" to a number
		  value = parseInt(value);
		} else if (key === "name") {
		  // Normalize "name" to have the first letter capitalized and the rest in lowercase
		  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
		} else if (key === "kaas") {
		  // Convert "kaas" to a string for HTML display
		  value = String(value);
		} else if (key === "coords") {
		  // Loop over the "coords" object and generate a custom string
		  value = `Latitude: ${item.coords.lat}, Longitude: ${item.coords.long}`;
		}
  
		td.textContent = value;
		tr.appendChild(td);
	  });
  
	  tbody.appendChild(tr);
	});
  
	// Append the table heading and body to the table element
	table.appendChild(thead);
	table.appendChild(tbody);
  }
  
  generateTable();
  