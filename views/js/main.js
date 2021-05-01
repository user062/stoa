 //Sidebar activate links  
 const sidebarLinks = document.querySelectorAll('.sidebar__link');            
        
 sidebarLinks.forEach( e => {
     e.addEventListener('click', () => {
         //Remove .active class from all Sidebar Links
         sidebarLinks.forEach( el => el.classList.remove('active'));
         //Add .active class to clicked Sidebar Link
         e.classList.add('active');   
      });
 });

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
