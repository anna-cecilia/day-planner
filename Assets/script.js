$(document).ready(function() {
  
  // test flag
  const test = false;

  // get times from moment
  const now = moment().format('MMMM Do YYYY');

  // commented out for test in non-standard hours
  let nowHour24 = moment().format('H');
  let nowHour12 = moment().format('h');


  let $dateHeading = $('#navbar-subtitle');
  $dateHeading.text(now);


  const saveIcon = "./images/save-regular.svg"; 

  // Get stored todos from localStorage
  let storedPlans = JSON.parse(localStorage.getItem("savedPlans"));

  // If plans were retrieved from localStorage, update the plan array to it
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
    planTextArr = new Array(9);
  }


  // set variable referencing planner element
  let $plannerDiv = $('#plannerContainer');
  // clear existing elements
  $plannerDiv.empty();



  // build calendar by row for fix set of hours
  for (let hour = 9; hour <= 17; hour++) {
    // index for array use offset from hour
    let index = hour - 9;
    
    // build row components
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
  
    // Time box 
    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');
  
    var $timeBoxSpn = $('<span>');
    $timeBoxSpn.attr('class','timeBox');
    
    // format hours for display
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate timeBox with time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);

    let $dailyPlan = $('<input>');

    $dailyPlan.attr('id',`input-${index}`);
    $dailyPlan.attr('hour-index',index);
    $dailyPlan.attr('type','text');
    $dailyPlan.attr('class','dailyPlan');

    // access index from data array for hour 
    $dailyPlan.val( planTextArr[index] );
    
    // create col to control width
    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');

    // add col width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlan);
    // STOP building Time box portion of row

    // START building save portion of row
    let $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    // add col width and row component to row
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);
    // STOP building save portion of row

    // set row color based on time
    updateRowColor($rowDiv, hour);
    
    // add row to planner container
    $plannerDiv.append($rowDiv);
  };

  // function to update row color
  function updateRowColor ($hourRow,hour) { 

    if (test) { console.log("rowColor ",nowHour24, hour); }

    if ( hour < nowHour24) {
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > nowHour24) {
      $hourRow.css("background-color","lightyellow")
    } else {
      $hourRow.css("background-color","orange")
    }
  };

  // saves to local storage
  // onclick function to listen for user clicks on plan area
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;

  });  
});


