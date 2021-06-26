urlSearchParams = new URLSearchParams(window.location.search);
params = Object.fromEntries(urlSearchParams.entries());

$(document).ready(() => $.get('/reply_content', params, (data, status) => {
    tinymce.activeEditor.on('init', (e) => {
        tinymce.activeEditor.setContent(data.text);

        for (const file of data.files) {
            if (current_file_id === 0)
                tinymce.activeEditor.dom.add(tinymce.activeEditor.getBody(), 'div', { 'class': 'files', 'id': 'files' });

            tinymce.activeEditor.dom.add('files', 'div', { 'class': 'file', 'id': 'file' + current_file_id });

            tinymce.activeEditor.dom.add('file' + current_file_id, 'div', { 'class': 'file_name' }, file.name);

            let del_button = tinymce.activeEditor.dom.add('file' + current_file_id, 'div', { 'class': 'del_button' }, 'x');
            let id = 'file' + current_file_id;
            let file_id = file.id;
            tinymce.activeEditor.dom.bind(del_button, 'click',
                () => {
                    tinymce.activeEditor.dom.remove(id);
                    let form = document.getElementsByTagName('form')[0];
                    let old_file = document.createElement('input');
                    old_file.setAttribute("type", "hidden");
                    old_file.setAttribute("name", "old_files");
                    old_file.setAttribute("value", file_id);
                    form.appendChild(old_file);
                }
            );

            current_file_id++;
        }
    });
}));
