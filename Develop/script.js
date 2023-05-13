var options = {
    startHour: 9,
    endHour: 23,
}

function updateTimeslots() {

  console.log('updateTimeslots');
  var currentHour = dayjs().hour();

  $('time-block').each(function (index, element) {

    var hour = $(element).attr('data-hour');
    console.log($element);
    console.log(hour, currentHour);

    if (hour < currentHour) {
      $(element).find('.description').addClass('past');
    }
    else if (hour == currentHour) {
      $(element).find('.description').addClass('present');
    }
    else {
      $(element).find('.description').addClass('future');
    }
  })
}

function onSaveTask(e) {

  var hour = $(e.target).parent().parent().attr('data-hour');
  console.log("Data-hour: " + hour);
  var task = $(e.target).parent().prev().children().val();

  localStorage.setItem(hour, task);

  console.log('saved');
}

function generateTimeslots() {
  var currentHour = dayjs().format('HH');
  console.log(currentHour);

  for (hour = options.startHour; hour <= currentHour-1; hour++) {
    // load task
    var savedTask = localStorage.getItem(hour) || '';
    var html = `<div class="row" data-hour="${hour}">
    
      <div class="col-sm-2 hour">${hour}</div>
      <div class="col-sm-8 row past">
        <textarea class="col-md-10 description">${savedTask}</textarea>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-primary saveBtn">Save</button>
      </div>
    </div>
    `

    $('.container').append(html);
  }

  
    var savedTask = localStorage.getItem(hour) || '';
    var html = `<div class="row" data-hour="${hour}">
    
      <div class="col-sm-2 hour">${hour}</div>
      <div class="col-sm-8 row present">
        <textarea class="col-md-10 description">${savedTask}</textarea>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-primary saveBtn">Save</button>
      </div>
    </div>
    `

    $('.container').append(html);
  
    currentHour++;
    for (hour = currentHour; hour <= options.endHour; hour++) {
      // load task
      var savedTask = localStorage.getItem(hour) || '';
      var html = `<div class="row" data-hour="${hour}">
      
        <div class="col-sm-2 hour">${hour}</div>
        <div class="col-sm-8 row future">
          <textarea class="col-md-10 description">${savedTask}</textarea>
        </div>
        <div class="col-sm-2">
        <button class="btn btn-primary saveBtn">Save</button>
       
      </button>
        </div>
      </div>
      `
  
      $('.container').append(html);
    }

}





generateTimeslots();

updateTimeslots();

$('.saveBtn').on('click', onSaveTask);

var currentDay = dayjs().format('dddd MMMM DD YYYY, h:mm:ss a');
$('#currentDay').text(currentDay);

setInterval(function () {
  updateTimeslots();
}, 10000);

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
/* $(function () {
  let now = new Date();
    let formattedTime = dayjs(now).format("dddd, MMMM D");
    document.getElementById("time").innerHTML = formattedTime;
   
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
 */


