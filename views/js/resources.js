let doc_upload = (module_id, doc_type, file) => {
    if (document.getElementById('alert' + doc_type)) {
        let types = { '0': 'courses', '1': 'TDs', '2': 'Devoirs de Maison' };
        let table = document.createElement("TABLE");
        table.id = 'fileTable' + doc_type;
        table.classList.add('table');
        let thead = document.createElement("THEAD");
        let documentType = document.createElement("TH");
        let documentAction = document.createElement("TH");
        documentType.classList.add('thead');
        documentType.setAttribute('scope', 'col');
        documentType.innerText = types[doc_type];
        documentAction.classList.add('thead');
        documentAction.setAttribute('scope', 'col');
        documentAction.innerText = 'Action';
        let tbody = document.createElement("TBODY");
        thead.appendChild(documentType);
        thead.appendChild(documentAction);
        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById('alert' + doc_type).replaceWith(table);
    }
    var data = new FormData();
    data.append('module', module_id);
    data.append('type', doc_type);
    data.append('file', file, file.name);

    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.onreadystatechange = () => {

        if (req.readyState === XMLHttpRequest.DONE) {
            var status = req.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let data = req.response;

                let file_info =
                    `
<td class="file-container">
    <a href=/${data.file.path} class="link-to-file">${data.file.name}</a>
</td>
<td class="actions">
    <div class="btn-group">
        <button class="btn btn-sm" onClick="delete_doc(${module_id}, ${data.file.id}, ${doc_type})">
            <span class="material-icons" style="font-size: 18px;">delete</span>
        </button>
    </div>
</td>
`;
                let types = { '0': 'courses', '1': 'TDs', '2': 'Devoirs de maison' };
                let new_file = document.getElementById('fileTable' + doc_type).getElementsByTagName('tbody')[0].insertRow(-1);
                new_file.innerHTML = file_info;
                new_file.id = `file${data.file.id}`;
            }
        }
    };
    req.open('POST', '/add_document/add_document');
    req.send(data);
};

let delete_doc = (module_id, file_id, doc_type) => $.post('/delete_document/delete_document', { module: module_id, file: file_id }, (data) => {
    document.getElementById(`file${file_id}`).remove();
    if (document.querySelectorAll(`#fileTable${doc_type} tbody tr`).length === 0) {
        let alertDiv = document.createElement('DIV');
        alertDiv.id = 'alert' + doc_type;
        alertDiv.classList.add('alert');
        alertDiv.classList.add('alert-primary');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerText = " Rien n'a été ajouté ";
        document.getElementById(`fileTable${doc_type}`).replaceWith(alertDiv);
    };
});

let module_id = window.location.href.split('/')[4];
var uploadButtons = document.querySelectorAll(".add-file");

for (const button of uploadButtons) {
    button.addEventListener("click", () => {
        button.getElementsByTagName("input")[0].click();
    });
    let input = button.getElementsByTagName("input")[0];
    input.addEventListener("input", () => {
        doc_upload(module_id, input.id, input.files[0]);
    });
}
