
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
