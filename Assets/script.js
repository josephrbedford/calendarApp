
// Set start and end times for calendar

var options = {
    startHour: 8,
    endHour: 21,
}

function onSaveTask(e) {                                                // Save description to local storage

  var hour = $(e.target).parent().parent().attr('data-hour');
  console.log("Data-hour: " + hour);
  var task = $(e.target).parent().prev().children().val();

  localStorage.setItem(hour, task);

  console.log('saved');
}

function generateTimeslots() {                                        // Generate dynamic html for timeslots
  
  var currentHour = dayjs().format('HH');
  console.log(currentHour);

  for (hour = options.startHour; hour <= currentHour-1; hour++) {             // For loop for past items
    
    var savedTask = localStorage.getItem(hour) || '';
    var html = `<div class="row" data-hour="${hour}">
    
      <div class="col-sm-2 hour">${hour}:00</div>
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

  var savedTask = localStorage.getItem(hour) || '';                           // Current time item
  var html = `<div class="row" data-hour="${hour}">
    
      <div class="col-sm-2 hour">${hour}:00</div>
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
    for (hour = currentHour; hour <= options.endHour; hour++) {              // For loop for future items
      
      var savedTask = localStorage.getItem(hour) || '';
      var html = `<div class="row" data-hour="${hour}">
      
        <div class="col-sm-2 hour">${hour}:00</div>
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

generateTimeslots();                                                  // Call function to generate timeslots                                                  

$('.saveBtn').on('click', onSaveTask);

var currentDay = dayjs().format('dddd MMMM DD YYYY, h:mm:ss a');
$('#currentDay').text(currentDay);