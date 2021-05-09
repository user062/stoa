tinymce.init({
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
        if (typeof this.bottom == 'undefined') {
            this.bottom = 2;
            this.margin = 8;
        }
        tinymce.activeEditor.execCommand('mceInsertContent', false, '<a href=' + data.file_name.value + ' style="display:block; position:absolute; background-color: #f5f5f5; bottom:' + this.bottom + 'px; padding-top:4px; padding-bottom:4px; padding-left:8px; padding-right:4px;  width:444px; margin-bottom:' + this.margin + 'px;">' + data.file_name.meta.title + '</a>');
        this.bottom += 25;
        this.margin += 12;
        api.close();
    }
};

function file_picker(cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '*');
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
