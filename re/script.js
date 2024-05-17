function validateForm() {
    const toField = document.getElementById('email');
    const toValue = toField.value;

    const lowercasePattern = /^[a-z]{4,8}$/;
    if (!lowercasePattern.test(toValue)) {
        alert("The 'To' field must be lowercase and 4-8 characters in length.");
        return false;
    }
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
        const response = await fetch('https://formspree.io/f/mleqvkqk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });

        if (response.ok) {
            window.location.href = 'success.html';
        } else {
            alert('There was a problem with your submission. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
    }
}
