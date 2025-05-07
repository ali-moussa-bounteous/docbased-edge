export default function decorate(block) {
  const formBlock = document.querySelector('.customform.block');

  if (formBlock) {
    // Create a form element
    const form = document.createElement('form');
    form.action = 'https://utilityapi.com/api/v2/forms/form_uid/test-submit';
    form.method = 'POST';

    // Iterate over each child div to create form fields
    const fields = formBlock.querySelectorAll(':scope > div');
    fields.forEach((field) => {
      const [labelDiv, nameDiv, typeDiv] = field.querySelectorAll(':scope > div > p');
      const label = labelDiv.textContent.trim();
      const name = nameDiv.textContent.trim();
      const type = typeDiv.textContent.trim();

      // Create a label element
      const labelElement = document.createElement('label');
      labelElement.textContent = label;
      labelElement.htmlFor = name;

      // Create an input element
      const input = document.createElement('input');
      input.name = name;
      input.id = name;
      input.type = type;

      // Create a group for checkboxes and radios
      if (type === 'checkbox' || type === 'radio') {
        const group = document.createElement('div');
        group.className = type === 'checkbox' ? 'checkbox-group' : 'radio-group';
        group.appendChild(labelElement);
        group.appendChild(input);
        form.appendChild(group);
      } else {
        // Append label and input directly for other types
        form.appendChild(labelElement);
        form.appendChild(input);
      }
    });

    // Add a submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    // Replace the original block content with the form
    formBlock.innerHTML = '';
    formBlock.appendChild(form);

    // Handle form submission
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(form.action, {
          method: form.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Form submitted successfully!');
        } else {
          alert('Failed to submit the form.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
      }
    });
  }

}

document.addEventListener('DOMContentLoaded', () => {

});