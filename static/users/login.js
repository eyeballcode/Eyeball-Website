const submitButton = document.getElementById('submit');

function getValue(id) {
    return document.getElementById(id).value;
}

function setValue(id, value) {
    document.getElementById(id).value = value;
}

function showError(text) {
    document.getElementById('login-error').textContent = text;
};

document.addEventListener('DOMContentLoaded', event => {
    submitButton.addEventListener('click', event => {
        var fields = ['username', 'password'];
        var formFields = {};
        for (let field of fields) {
            formFields[field] = getValue(`f${field}`);
        }
        if (formFields.username === '') showError('Please enter a username');
        else if (formFields.password === '') showError('Please enter a password');
        else {
            ajax({
                method: 'POST',
                form: {
                    username: formFields.username,
                    password: formFields.password
                },
                url: '/users/login'
            }).then(data => {
                setValue('username', formFields.username);
                setValue('password', formFields.password);
                document.getElementById('real-login-form-wrapper').querySelector('form').submit();
            }).catch(data => {
                showError(data.Reason);
            });
        }
    });
});
