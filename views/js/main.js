
//Sidebar activate links
var home = document.getElementById('home');

if(window.location.pathname == "/") {
    home.classList.add("active");
} else {
    home.classList.remove("active");
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
let dots = document.querySelectorAll('.dots');
let moreMenu = document.querySelectorAll('.more-menu');
let tag = document.querySelectorAll('.tag');
let commentNumber = document.querySelectorAll('.comment-number');

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        let moreMenu = dot.parentNode.querySelector(".more-menu");
        let bottomSection = getPost(dot).querySelector(".bottom_section");
        //let tag = getPost(dot).querySelector(".tag");
        let commentNumber = getPost(dot).querySelector(".comment-number");                

        //Get the parent post
        function getPost(dot) {        
            let parent = dot.parentNode;
            for(i=0;i<4;i++) {
                parent = parent.parentNode;
            }            
            return parent;
        }

        moreMenu.classList.toggle("show");
        bottomSection.classList.toggle("hide");
        // tag.classList.toggle("hide");
        commentNumber.classList.toggle("hide");
    });    
});

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

    if(e.getAttribute('href') == url) {
        e.classList.add('active');
    }
});


