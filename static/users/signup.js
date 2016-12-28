const submitButton = document.getElementById('submit');

function getValue(id) {
    return document.getElementById(id).value;
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function showError(text) {
    document.getElementById('signup-error').textContent = text;
};

document.addEventListener('DOMContentLoaded', event => {
    submitButton.addEventListener('click', event => {
        var fields = ['username', 'password', 'password2', 'email'];
        var formFields = {};
        for (let field of fields) {
            formFields[field] = getValue(`f${field}`);
        }
        if (formFields.username === '') showError('Please enter a username');
        else if (formFields.password === '') showError('Please enter a password');
        else if (formFields.password2 === '') showError('Please re-enter the password');
        else if (formFields.password !== formFields.password2) showError('Please ensure the passwords match');
        else if (formFields.email === '') showError('Please enter an email');
        else {
            ajax({
                method: 'POST',
                form: {
                    username: formFields.username,
                    email: formFields.email,
                    password: formFields.password
                },
                url: '/users/signup'
            }).then(data => {
                setValue('username', formFields.username);
                setValue('password', formFields.password);
                setValue('email', formFields.email);
                document.getElementById('real-signup-form-wrapper').querySelector('form').submit();
            }).catch(data => {
                showError(data.Reason);
            });
        }
    });
});
