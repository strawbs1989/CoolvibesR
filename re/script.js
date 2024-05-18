function validateForm() {
    const toField = document.getElementById('email');
    const toValue = toField.value;

    
    return true;
}

async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => { object[key] = value });
    const json = JSON.stringify(object);

    try {
        const response = await fetch('/re/saverequest.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

        if (response.ok) {
            window.location.href = '/re/success.html';
        } else {
            alert('There was a problem with your submission. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
    }
}

async function fetchRequests() {
    try {
        const response = await fetch('/re/request.json');
        const requests = await response.json();
        const requestList = document.getElementById('requestList');

        requestList.innerHTML = '';  // Clear existing content

        requests.forEach(request => {
            const listItem = document.createElement('li');
            listItem.textContent = `From: ${request.from}, To: ${request.email}, DJ: ${request.djs}, Message: ${request.message}, Song: ${request.songrequest}`;
            requestList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);

    fetchRequests();  // Fetch requests when the page loads
});
