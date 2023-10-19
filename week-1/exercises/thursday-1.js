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

/* Assume we have a normalized dataset to start with */

const data = [
	{
		id: 1,
		name: 'Robert',
		kaas: true,
	},
	{
		id: 2,
		name: 'Vincent',
		kaas: false,
	},
	{
		id: 3,
		name: 'Laura',
		kaas: true,
	},
]

/* We only need one function for this, in further exercises, we can try and splitting them
   but for now, we'll only use a single function
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
		td.textContent = item[key];
		tr.appendChild(td);
	  });
  
	  tbody.appendChild(tr);
	});
  
	// Append the table heading and body to the table
	table.appendChild(thead);
	table.appendChild(tbody);
  }
  
  generateTable();
  