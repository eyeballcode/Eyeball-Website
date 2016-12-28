document.addEventListener('DOMContentLoaded', event => {
    document.getElementById('logout').addEventListener('click', event => {
        ajax({
            method: 'POST',
            url: '/users/logout'
        }).then(d => {
            location.reload();
        });
    }, false);
});
