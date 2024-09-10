const scriptURL = 'https://script.google.com/macros/s/AKfycbxDwWQGRIWm_IvInI9zI2kewuo4dcuin_G8atR06FsZ0dKbJ40ET6GjoaF-6b_vVVjV/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
