document.addEventListener("DOMContentLoaded", e => {// JavaScript function to handle the photo selection and display
  function onPhotoSelected(event) {
    // Get the file from the input
    const file = event.target.files[0];

    // Create a FileReader to read the file
    const reader = new FileReader();

    // Set up onload event for the FileReader
    reader.onload = function (e) {
      // Get the image element
      const img = document.getElementById('profileImage');
      // Set the src of the image element to the file's data URL
      img.src = e.target.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }

  // Event listener for the Edit Profile button
  document.getElementById('editProfileButton').addEventListener('click', function () {
    // Show edit fields when Edit Profile button is clicked
    const editFields = document.querySelector('.edit-fields');
    editFields.style.display = 'block';
  });

  // Event listener for the Save button
  document.getElementById('saveProfileButton').addEventListener('click', function () {
    // Save profile changes when Save button is clicked
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Perform actions to save new username and password
    // For demonstration purposes, we'll just log them to the console
    console.log('New Username:', newUsername);
    console.log('New Password:', newPassword);

    // Clear input fields and hide edit fields
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    const editFields = document.querySelector('.edit-fields');
    editFields.style.display = 'none';
  });

  // Event listener for the photo input change
  document.getElementById('photoInput').addEventListener('change', onPhotoSelected);
})