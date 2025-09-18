$(document).ready(function() {
    $('#email').on('input', function() {
      var email = $('#email').val();
      console.log('Checking email:', email); 
  
      $.ajax({
        url: '/checkEmail',
        data: { email: email },
        success: function(data) {
          console.log('Response received:', data); 
          if (data.exists) {
            $('#register-button').prop('disabled', true);
            $('#register-button').css({
              'background-color': '#ff7f6e',
              'color': 'black'
            });
            $('#email').css('background-color', '#ffc0b8');
            $('#email-error').text('Email already registered!').css('color', 'red');
          } else {
            $('#register-button').prop('disabled', false);
            $('#email').css('background-color', '#d7ffb8');
            $('#register-button').css({
              'background-color': '',
              'color': ''
            });
            $('#email-error').text('Email is available!').css('color', 'green');
          }
        },
        error: function(err) {
          console.log('AJAX error:', err); 
        }
      });
    });
  });

