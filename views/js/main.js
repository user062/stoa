urlSearchParams = new URLSearchParams(window.location.search);
params = Object.fromEntries(urlSearchParams.entries());

function expandById(id) {
    document.getElementById('post' + id).classList.remove('show');
    document.getElementById('inner_post' + id).classList.add('show');
}

if (document.getElementById('post' + params.post_id))
    expandById(params.post_id);

if (document.getElementById('comment' + params.comment_id))
    document.getElementById('comment' + params.comment_id).scrollIntoView({ behavior: "smooth", block: "center" });

else if (document.getElementById('reply' + params.reply_id))
    document.getElementById('reply' + params.reply_id).scrollIntoView({ behavior: "smooth", block: "center" });

else if (document.getElementById('inner_post' + params.post_id))
    document.getElementById('inner_post' + params.post_id).scrollIntoView({ behavior: "smooth", block: "center" });

//Sidebar activate links
var home = document.getElementById('home');

if (home) {
    if (window.location.pathname == "/") {
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
        if (bottomSection && commentNumber) {
            bottomSection.classList.toggle("hide");
            // tag.classList.toggle("hide");
            commentNumber.classList.toggle("hide");
        }


        document.addEventListener('click', (e) => {
            if (e.target != dot && moreMenu.classList.contains("show")) {
                moreMenu.classList.remove("show");
                if (bottomSection && commentNumber) {
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
var newDButtonText = document.querySelectorAll('.new__descussion-text');

expandButton.addEventListener('click', () => {
    document.body.classList.toggle('expanded-body');
    sidebar.classList.toggle('expanded-sidebar');
    expandButton.classList.toggle('switch-expand-sidebar');

    if (newDButtonText) {

        newDButtonText.forEach(el => {
            el.classList.toggle('new__descussion-text-small');
        });
    }

    if (sidebar.classList.contains('expanded-sidebar')) {
        expandButton.innerHTML = ">";
    } else {
        expandButton.innerHTML = "<";
    }
});

let notify = () => $.post('/new_notifications/new_notifications', {},
    (data) => {
        if (!data)
            return;
        let notifications_menu = document.getElementById('notifications_menu');
        let types;

        for (const new_notification of data.notifications) {
            let notif_div = document.createElement('div');
            notif_div.classList.add('dropdown-item', 'navbar-notification-item');
            let link = document.createElement('a');
            let text = document.createElement('span');

            if (new_notification.type === 'resources') {
                types = { 'c': 'Cour', 't': 'TD', 'h': 'Devoir de Maison' };
                notif_div.id = `resources_notification_${new_notification.id}`;
                link.href = `/modules/${new_notification.module_id}/resources`;
                text.classList.add('notification-text');
                text.innerText = `un nouveau ${types[new_notification.file_type]} a été ajouté dans ${new_notification.module_name}`;
            }

            else if (new_notification.type === 'posts') {
                types = { 'p': 'Sondage', 'q': 'Question', 'n': 'Note' };
                notif_div.id = `posts_notification_${new_notification.id}`;
                link.href = `/modules/${new_notification.module_id}/all_posts?post_id=${new_notification.post_id}`;
                if (new_notification.post_type === 'p')
                    text.innerText = `un nouveau Sondage a été ajouté dans ${new_notification.module_name}`;
                else
                    text.innerText = `une nouvelle ${types[new_notification.post_type]} a été ajoutée dans ${new_notification.module_name}`;
            }

            else if (new_notification.type === 'reply') {
                notif_div.id = `reply_notification_${new_notification.id}`;
                link.href = `/modules/${new_notification.module_id}/my_posts?post_id=${new_notification.post_id}&reply_id=${new_notification.reply_id}`;
                text.classList.add('notification-text');
                text.innerText = `une nouvelle réponse a été ajoutée dans ${new_notification.module_name}`;
            }

            else {
                notif_div.id = `comment_notification_${new_notification.id}`;
                link.href = `/modules/${new_notification.module_id}/all_posts?post_id=${new_notification.post_id}&reply_id=${new_notification.reply_id}&comment_id=${new_notification.comment_id}`;
                text.classList.add('notification-text');
                text.innerText = `un nouveau commentaire a été ajouté dans ${new_notification.module_name}`;
            }

            let labels_div = document.createElement('div');
            let new_label = document.createElement('span');
            new_label.classList.add('badge', 'badge-danger', 'new-notification');
            new_label.innerText = 'Nouveau';
            let delete_button = document.createElement('span');
            delete_button.classList.add('material-icons', 'delete-notification');
            delete_button.innerText = 'clear';
            delete_button.setAttribute('onClick', `delete_notification('${new_notification.type}_notification_${new_notification.id}')`);
            link.appendChild(text);
            notif_div.appendChild(link);
            labels_div.appendChild(new_label);
            labels_div.appendChild(delete_button);
            notif_div.appendChild(labels_div);
            notifications_menu.insertBefore(notif_div, notifications_menu.firstChild);
        }
        document.getElementById('notifications_count').innerText = Number(document.getElementById('notifications_count').innerText) + data.notifications.length;
    });

var delete_notification = (id) =>
    $.post('/delete_notification', { id: id.split('_')[2], type: id.split('_')[0] },
        (data) => {
            document.getElementById(`${id}`).remove();
            document.getElementById('notifications_count').innerText = Number(document.getElementById('notifications_count').innerText) - 1;
        });

setInterval(notify, 60000);

// Module subscribe
var subscribe_button = document.querySelector('.subscribe');

if (subscribe_button) {
    subscribe_button.addEventListener('click', () => {
        subscribe_button.classList.toggle('subscribed');
        if (subscribe_button.innerText === "S'INSCRIRE") {
            subscribe_button.innerText = "INSCRIS";
            subscribe_button.setAttribute('onClick', 'un' + subscribe_button.getAttribute('onClick'));
        } else {
            subscribe_button.innerText = "S'INSCRIRE";
            subscribe_button.setAttribute('onClick', subscribe_button.getAttribute('onClick').substr(2));
        }
    });
}

let subscribe = (module) => $.post('/subscribe/subscribe', { module: module }, (data) => { });
let unsubscribe = (module) => $.post('/unsubscribe/unsubscribe', { module: module }, (data) => { });
