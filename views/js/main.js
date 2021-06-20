//Sidebar activate links
var home = document.getElementById('home');

if(home) {
    if(window.location.pathname == "/") {
        home.classList.add("active");
    } else {
        home.classList.remove("active");
    }    
}

// var sidebarLinks = document.querySelectorAll('.sidebar__link');

// sidebarLinks.forEach(e => {
//     e.addEventListener('click', () => {
//         //Remove .active class from all Sidebar Links
//         sidebarLinks.forEach(el => el.classList.remove('active'));
//         //Add .active class to clicked Sidebar Link
//         e.classList.add('active');
//     });
// });


//Post on click event
var types = document.querySelectorAll('.type');

types.forEach(type => {
    type.addEventListener('click', () => {
        types.forEach(el => el.classList.remove('active-type'));
        type.classList.add('active-type');
        //Show add poll section
        if (type.id == "poll") {
            document.querySelector('.add-poll-section').classList.add('show-poll');
        } else {
            document.querySelector('.add-poll-section').classList.remove('show-poll');
        }
    });
});

//Folders Selection
var dossiers = document.querySelectorAll('.dossier');

dossiers.forEach(dossier => {
    dossier.addEventListener('click', () => {
        dossier.classList.toggle('selected-folder');
    });
});

var modules = document.querySelectorAll('.module__link');

modules.forEach(module => {
    module.addEventListener('click', () => {
        module.classList.toggle('show-folders');
    })
})

//Edit & delete post menu
var dots = document.querySelectorAll('.dots');
var moreMenu = document.querySelectorAll('.more-menu');
var tag = document.querySelectorAll('.tag');
var commentNumber = document.querySelectorAll('.comment-number');

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        var moreMenu = dot.parentNode.querySelector(".more-menu");
        var bottomSection = getPost(dot).querySelector(".bottom_section");
        //let tag = getPost(dot).querySelector(".tag");
        var commentNumber = getPost(dot).querySelector(".comment-number");

        //Get the parent post
        function getPost(dot) {
            var parent = dot.parentNode;
            for (i = 0; i < 4; i++) {
                parent = parent.parentNode;
            }
            return parent;
        }

        moreMenu.classList.toggle("show");
        if(bottomSection && commentNumber) {
            bottomSection.classList.toggle("hide");
            // tag.classList.toggle("hide");
            commentNumber.classList.toggle("hide"); 
        }
        
        
        document.addEventListener('click', (e) => {
        if(e.target != dot && moreMenu.classList.contains("show")) {
            moreMenu.classList.remove("show");
            if(bottomSection && commentNumber) {
                bottomSection.classList.remove("hide");        
                commentNumber.classList.remove("hide");
            }
             
        }
            
            
        });

    });    

});

function humanized_time_span(date) {
    //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
    let date_formats = [
        { ceiling: 60 },
        { ceiling: 3600 },
        { ceiling: 86400 },
        { ceiling: 2629744 },
        { ceiling: 31556926 },
        { ceiling: Infinity }
    ];
    //Time units must be be ordered largest -> smallest
    let time_units = [
        [31556926, 'years'],
        [2629744, 'months'],
        [86400, 'days'],
        [3600, 'hours'],
        [60, 'minutes'],
        [1, 'seconds']
    ];

    date = (new Date(date)).getTime();
    var seconds_difference = ((new Date()).getTime() - date) / 1000;


    function get_format() {
        for (var i = 0; i < date_formats.length; i++)
            if (seconds_difference <= date_formats[i].ceiling)
                return date_formats[i];
    }

    function get_time_breakdown() {
        var seconds = seconds_difference;
        var breakdown = {};
        for (var i = 0; i < time_units.length; i++) {
            var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
            seconds = seconds - (time_units[i][0] * occurences_of_unit);
            breakdown[time_units[i][1]] = occurences_of_unit;
        }
        return breakdown;
    }

    function get_representation() {
        let time = get_time_breakdown();
        let relevant_time = [[time.years, 'year'],
        [time.months, 'month'],
        [time.days, 'day'],
        [time.hours, 'hour'],
        [time.minutes, 'minute']
        ];

        let rtf = (new Intl.RelativeTimeFormat('fr', { numeric: "auto" }));

        for (var i = 0; i < relevant_time.length; i++)
            if (relevant_time[i][0] !== 0) {
                return rtf.format(-relevant_time[i][0], relevant_time[i][1]);

            }
        return rtf.format(0, 'second');
    }
    return get_representation();
}

var posts = document.getElementsByClassName('time_since_posted');
var posts_inner = document.getElementsByClassName('time_since_posted_inner');
var time_posts = [];
var time_posts_inner = [];

for (let i = 0; i < posts.length; i++) {
    time_posts.push([posts[i].getAttribute('creation_time'), posts[i].getAttribute('edit_time'), posts[i]]);
    time_posts_inner.push([posts[i].getAttribute('creation_time'), posts[i].getAttribute('edit_time'), posts_inner[i]]);
}


time_posts.forEach((post) => {

    var update_post_time = () => post[2].textContent = humanized_time_span(post[0]) + (post[1] ? ` (modifier le ${post[1]})` : '');
    update_post_time();
    setInterval(update_post_time, 60000);
});


time_posts_inner.forEach((post) => {
    var update_post_inner_time = () => post[2].textContent = humanized_time_span(post[0]) + (post[1] ? ` (modifier le ${post[1]})` : '');
    update_post_inner_time();
    setInterval(update_post_inner_time, 60000);
});

var replies = document.getElementsByClassName('time_since_replied');
var time_replies = [];


for (let i = 0; i < replies.length; i++) {
    time_replies.push([replies[i].getAttribute('creation_time'), replies[i].getAttribute('edit_time'), replies[i]]);
}

time_replies.forEach((reply) => {
    var update_reply_time = () => reply[2].textContent = humanized_time_span(reply[0]) + (reply[1] ? ` (modifier le ${reply[1]})` : '');
    update_reply_time();
    setInterval(update_reply_time, 60000);
});



var comments = document.getElementsByClassName('time_since_commented');
var time_comments = [];

for (let i = 0; i < comments.length; i++) {
    time_comments.push([comments[i].getAttribute('creation_time'), comments[i].getAttribute('edit_time'), comments[i]]);
}

time_comments.forEach((comment) => {
    var update_comment_time = () => comment[2].textContent = humanized_time_span(comment[0]) + (comment[1] ? ` (modifier le ${comment[1]})` : '');
    update_comment_time();
    setInterval(update_comment_time, 60000);
});


var delete_post = (module_id, post_id) => {
    $.post('/delete_post/delete_post', { 'module': module_id, 'post': post_id }, (data) => data);
    document.getElementById(`post${post_id}`).remove();
    document.getElementById(`inner_post${post_id}`).remove();
};

var delete_reply = (module_id, post_id, reply_id) => {
    $.post('/delete_reply/delete_reply', { 'module': module_id, 'post': post_id, 'reply': reply_id }, (data) => data);
    document.getElementById(`reply${reply_id}`).remove();
};

var delete_comment = (module_id, post_id, reply_id, comment_id) => {
    $.post('/delete_comment/delete_comment', { 'module': module_id, 'post': post_id, 'reply': reply_id, 'comment': comment_id }, (data) => data);
    document.getElementById(`comment${comment_id}`).remove();
};

//toggle sidebar
//  const hamburger = document.querySelector('.navbar__toggle');
//  const sidebar = document.querySelector('.sidebar');
//  const navbarBrand = document.querySelector('.navbar__brand');
//  const sidebarLink = document.querySelector('.sidebar__link');
//  const sidebarList = document.querySelector('.sidebar__list');


// Select sidebar items
var moduleFolders = document.querySelectorAll('.module__folder');
let url = window.location.pathname;

moduleFolders.forEach(e => {

    e.addEventListener('click', () => {
        //Remove .active class from all Sidebar Links
        moduleFolders.forEach(el => el.classList.remove('active'));
        //Add .active class to clicked Sidebar Link
        e.classList.add('active');
    });

    if (e.getAttribute('href') == url) {
        e.classList.add('active');
    }
});


//Expand sidebar on mobile size
var expandButton = document.querySelector('.expand-sidebar');
var sidebar = document.querySelector('.sidebar');
var newDButtonText = document.querySelector('.new__descussion-text');

expandButton.addEventListener('click', () => {
    document.body.classList.toggle('expanded-body');
    sidebar.classList.toggle('expanded-sidebar');
    expandButton.classList.toggle('switch-expand-sidebar');
    newDButtonText.classList.toggle('new__descussion-text-small');

    if(sidebar.classList.contains('expanded-sidebar')) {
        expandButton.innerHTML = ">";        
    }else {
        expandButton.innerHTML = "<";
    }
});



let doc_upload = (module_id, doc_type, file) => {
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
        <button class="btn btn-sm" onClick="delete_doc(${module_id}, ${data.file.id})">
            <span class="material-icons" style="font-size: 18px;">delete</span>
        </button>
    </div>
</td>
`;
                let types = { '0': 'courses', '1': 'TDs', '2': 'Devoirs de maison' };
                let new_file = document.getElementsByClassName(types[doc_type])[0].getElementsByTagName('table')[0].insertRow(-1);
                new_file.innerHTML = file_info;
                new_file.id = `file${data.file.id}`;
            }
        }
    };
    req.open('POST', '/add_document/add_document');
    req.send(data);
};

let delete_doc = (module_id, file_id) => $.post('/delete_document/delete_document', { module: module_id, file: file_id }, (data) => document.getElementById(`file${file_id}`).remove());

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
