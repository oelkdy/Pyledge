

$(document).ready(function() {
    // Password validation
    $('#password, #confirmPassword').on('input', function() {
      var password = $('#password').val();
      var confirmPassword = $('#confirmPassword').val();
  
      if (password.length < 6) {
        $('#password').css('background-color', '#ffc0b8');
        $('#password-error').text('Password must be at least 6 characters!').css('color', 'red');
      } else {
        $('#password').css('background-color', '#d7ffb8');
        $('#password-error').text('');
      }
  
      if (password !== confirmPassword) {
        $('#confirmPassword').css('background-color', '#ffc0b8');
        $('#confirmPassword-error').text('Passwords do not match!').css('color', 'red');
      } else if (confirmPassword.length >= 6) {
        $('#confirmPassword').css('background-color', '#d7ffb8');
        $('#confirmPassword-error').text('Passwords match!').css('color', 'green');
      } else {
        $('#confirmPassword').css('background-color', '');
        $('#confirmPassword-error').text('');
      }
    });
  });