tinymce.init({
    content_css: '../css/file_upload.css',
    selector: 'textarea#my-expressjs-tinymce-app',
    height: 350,
    skin: '../../../css/tinymce_css',
    menubar: false,
    setup: function(editor) {
        editor.ui.registry.addButton('File-Upload', {
            icon: 'new-document',
            tooltip: 'Upload File',
            onAction: function() {
                editor.windowManager.open(file_upload_dialog_config);
            }
        });
    },
    file_picker_callback: file_picker,
    plugins: [
        'advlist autolink lists link charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | File-Upload |' +
        'bold italic backcolor underline | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help'
});

var current_file_id = 0;

var file_upload_dialog_config = {
    title: 'File Upload',
    body: {
        type: 'panel',
        items: [
            {
                type: 'urlinput', // component type
                name: 'file_name', // identifier
                filetype: 'file', // restrict file types to image types
                label: 'File Location', // text for component label
                disabled: false // disabled state
            }
        ]
    },
    buttons: [
        {
            type: 'cancel',
            name: 'closeButton',
            text: 'Cancel'
        },
        {
            type: 'submit',
            name: 'submitButton',
            text: 'Upload',
            primary: true
        }
    ],
    initialData: {
        file_name: ''
    },
    onSubmit: (api) => {
        var data = api.getData();

        if (current_file_id === 0)
            tinymce.activeEditor.dom.add(tinymce.activeEditor.getBody(), 'div', { 'class': 'files', 'id': 'files' });

        tinymce.activeEditor.dom.add('files', 'div', { 'class': 'file', 'id': 'file' + current_file_id });

        tinymce.activeEditor.dom.add('file' + current_file_id, 'div', { 'class': 'file_name' }, data.file_name.meta.title);

        let del_button = tinymce.activeEditor.dom.add('file' + current_file_id, 'div', { 'class': 'del_button' }, 'x');
        let id = 'file' + current_file_id;
        let upload_id = 'uploaded_file' + current_file_id;
        tinymce.activeEditor.dom.bind(del_button, 'click',
            () => tinymce.activeEditor.dom.remove(id) && document.getElementById(upload_id).remove()
        );

        current_file_id++;

        api.close();

    }
};

function file_picker(cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute("name", "uploads");
    input.setAttribute('id', 'uploaded_file' + current_file_id);
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '*');
    input.style.visibility = "hidden";
    document.getElementsByTagName("form")[0].appendChild(input);

    input.onchange = function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            /*
              Note: Now we need to register the blob in TinyMCEs image blob
              registry. In the next release this part hopefully won't be
              necessary, as we are looking to handle it internally.
            */
            var id = 'blobid' + (new Date()).getTime();
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            /* call the callback and populate the Title field with the file name */
            cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
    };
    input.click();
}
