
$(document).ready(function() {
  // $('.sidenav').sidenav();
  $('#main-container').hide();
  $('#top-recipes').hide();
  $('.parallax').parallax();
  
});

$('.sidenav').sidenav({
  menuWidth: 300,
  edge: 'right',
  closeOnClick: true,
  draggable: true,
  // onOpen: function(el)
  // onClose: function(el)

});
// // Show sideNav
// $('.sidenav').sidenav('show');
// // Hide sideNav
// $('.sidenav').sidenav('hide');
// // Destroy sideNav
// $('.sidenav').sidenav('destroy');

$('#food-button').click(function() {
  $('#main-container').show();
    console.log('Choice: Food');
    $('#buttons-start').hide();
  });
 


$('#drink-button').click(function() {
  $('#main-container').show();
  console.log('Choice: Drinks');
  $('#buttons-start').hide();
});



$('#flavorize-button').click(function() {
  $('#top-recipes').show();
});




  $('.chips').chips();
  $('.chips-placeholder').chips({
    placeholder: 'Add ingredient...',
    secondaryPlaceholder: 'add more...',
  });




// $('.sidenav-trigger').Sidenav({
//   menuWidth: 300, // Default is 240
//   closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
//   edge: 'right',
// }
// );
// $("[data-target=slide-out-r]").Sidenav({
//   edge: 'right'
// });
// $(".sidenav-trigger").Sidenav({
//   menuWidth: 300,
//   edge: 'right',
//   closeOnClick: true
// });