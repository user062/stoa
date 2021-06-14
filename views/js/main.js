//Sidebar activate links
var sidebarLinks = document.querySelectorAll('.sidebar__link');

sidebarLinks.forEach(e => {
    e.addEventListener('click', () => {
        //Remove .active class from all Sidebar Links
        sidebarLinks.forEach(el => el.classList.remove('active'));
        //Add .active class to clicked Sidebar Link
        e.classList.add('active');
    });
});


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

var posts = document.querySelectorAll('.time_since');
var time_posts = [];

for (const post of posts)
    time_posts.push([post.getAttribute('creation_time'), post]);

time_posts.forEach((post) => setInterval(() => post[1].textContent = humanized_time_span(post[0]), 60000));

//toggle sidebar
//  const hamburger = document.querySelector('.navbar__toggle');
//  const sidebar = document.querySelector('.sidebar');
//  const navbarBrand = document.querySelector('.navbar__brand');
//  const sidebarLink = document.querySelector('.sidebar__link');
//  const sidebarList = document.querySelector('.sidebar__list');

//  hamburger.addEventListener('click', () => {
//      if(sidebar.style.width < 150 + 'px') {
//          sidebar.classList.toggle('desktop-width');
//          navbarBrand.classList.toggle('desktop-width');
//          sidebarLink.classList.toggle('desktop-width');
//          sidebarList.classList.toggle('desktop-width');
//      }
//  });

//Replies Upvote Downvote
// var upvoteBtn = document.querySelectorAll('')

// function upvote(voteType, voteNumber) {
//   if(voteType == "upvote") {

//   } else {

//   }
// }
//End
