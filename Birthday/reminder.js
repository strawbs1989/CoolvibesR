// Execute the following code when the window has finished loading
        window.onload = function() {
            // Retrieve saved birthdays from local storage 
            // or an empty array if not available
            const savedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    
            // Get the element with the ID 'birthdayList'
            const birthdayList = document.getElementById('birthdayList');

            // Iterate over each saved birthday and create a birthday item for display
            savedBirthdays.forEach(birthday => {
                // Create a birthday item using the createBirthdayItem function
                const birthdayItem = createBirthdayItem(birthday.name, birthday.date);
        
                // Append the birthday item to the birthdayList element
                birthdayList.appendChild(birthdayItem);
            });
        };

        // Function to add a birthday to the list
        function addBirthday() {
            // Get the input fields and the birthdayList element from the HTML
            const nameInput = document.getElementById('name');
            const dateInput = document.getElementById('date');
            const birthdayList = document.getElementById('birthdayList');

            // Retrieve the values entered by the user for name and date
            const name = nameInput.value;
            const date = dateInput.value;

            // Check if both name and date are provided by the user
            if (name && date) {
                // Create a birthday item using the createBirthdayItem function
                const birthdayItem = createBirthdayItem(name, date);
        
                // Append the new birthday item to the birthdayList element
                birthdayList.appendChild(birthdayItem);

                // Save the updated list of birthdays to local storage
                saveBirthdays();

                // Clear the input fields after successfully adding a birthday
                nameInput.value = '';
                dateInput.value = '';
            }
        }

        // Function to create a birthday item based on provided name and date
        function createBirthdayItem(name, date) {
            // Create a new list item element
            const birthdayItem = document.createElement('li');
    
            // Add the CSS class 'birthdayItem' to the created list item
            birthdayItem.className = 'birthdayItem';

            // Set the inner HTML of the list item with name, date, and two buttons (Edit and Remove)
            birthdayItem.innerHTML = `<strong>${name}</strong>'s birthday on ${date}
                               <button class="editButton" onclick="editBirthday(this)">Edit</button>
                               <button class="removeButton" onclick="removeBirthday(this)">Remove</button>`;

            // Return the created birthday item
            return birthdayItem;
        }

        // Function to remove a birthday item
        function removeBirthday(button) {
            // Get the parent list item of the clicked button
            const listItem = button.parentNode;

            // Get the parent list (birthdayList) of the list item
            const birthdayList = listItem.parentNode;

            // Remove the list item from the birthdayList
            birthdayList.removeChild(listItem);

            // Save the updated list of birthdays to local storage
            saveBirthdays();
        }

        // Function to edit a birthday item
        function editBirthday(button) {
            // Get the parent list item of the clicked button
            const listItem = button.parentNode;

            // Extract the name and date information from the list item
            const name = listItem.querySelector('strong').innerText;
            const date = listItem.innerText.split("on")[1].trim();

            // Get the input fields for name and date from the HTML
            const nameInput = document.getElementById('name');
            const dateInput = document.getElementById('date');

            // Set the input values to the extracted name and date
            nameInput.value = name;
            dateInput.value = date;

            // Remove the current item after clicking "Edit"
            removeBirthday(button);
        }   

        // Function to save the list of birthdays to local storage
        function saveBirthdays() {
            // Get the birthdayList element from the HTML
            const birthdayList = document.getElementById('birthdayList');

            // Create an array to store birthday data
            const birthdays = [];

            // Iterate over each child node (birthday item) in the birthdayList
            birthdayList.childNodes.forEach(item => {
                // Extract the name and date information 
                // from the current birthday item
                const name = item.querySelector('strong').innerText;
                const date = item.innerText.split("on")[1].trim();

                // Add an object with name and date to the birthdays array
                birthdays.push({ name, date });
            });

            // Save the array of birthdays to local storage as a JSON string
            localStorage.setItem('birthdays', JSON.stringify(birthdays));
        }