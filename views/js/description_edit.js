const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

$(document).ready(() => $.get('/description_content', params, (data, status) => {
    tinymce.activeEditor.on('init', (e) => {
        tinymce.activeEditor.setContent(data.text);
    });
}));
