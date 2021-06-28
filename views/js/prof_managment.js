let add_prof = (module) => {
    let prof = document.getElementById('nameP').value;
    if (!prof)
        return;
    $.post('/add_prof/add_prof', { prof: prof, module: module }, (data) => {
        let row = document.getElementById('profs_table').getElementsByTagName('tbody')[0].insertRow();
        let family_name = document.createElement('td');
        let name = document.createElement('td');
        let email = document.createElement('td');
        let del_button = document.createElement('td');
        del_button.style = 'display:flex;justify-content:center';
        let prof_name = data.name + ' ' + data.family_name;
        del_button.innerHTML = ` <button class="btn btn-danger btn-sm m-0 block-prof" style="height: 25px;width:25px;text-align:center;display:flex;justify-content:center" onClick='delete_prof(${prof}, "${prof_name}", ${module})'>
                                            <span class="tooltiptext">Retiré prof</span>
                                            <span class="material-icons" style="font-size:15px!important">block</span>
                                        </button>`;
        row.id = prof;
        family_name.innerText = data.family_name;
        name.innerText = data.name;
        email.innerText = data.email;
        row.appendChild(family_name);
        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(del_button);
        document.getElementById(`prof_list_${prof}`).remove();
    });
};

let delete_prof = (prof, prof_name, module) => {
    $.post('/remove_prof/remove_prof', { prof: prof, module: module }, (data) => {
        document.getElementById(prof).remove();
        let opt = document.createElement('option');
        opt.value = prof;
        opt.id = `prof_list_${prof}`;
        opt.innerText = prof_name;
        document.getElementById('nameP').appendChild(opt);
    });
};
