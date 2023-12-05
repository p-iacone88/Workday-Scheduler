$(function () {
  $(document).ready(function () {
    //get current day and time
    function setTime() {
      const today = dayjs();
      const currentDay = today.format('dddd MMMM D, h:mm:ss a');
      const setTimeDisplay = setInterval(setTime, 1000);
      $('#currentDay').text(currentDay); //display on page
    }

    setTime();
    // get the current hour
    let currentHour = moment().hour();

    // loop through each time-block div
    $('.time-block').each(function () {
      var timeBlockHour = parseInt($(this).attr('id').split('-')[1]); // grabs id of current .time-block element, splits id at the hyphen to get the hour number at index 1, creates "sub string"

      // add/remove classes based on the current hour
      if (timeBlockHour < currentHour) {
        $(this).removeClass('present').removeClass('future').addClass('past');
      } else if (timeBlockHour === currentHour) {
        $(this).addClass('present').removeClass('past').removeClass('future');
      } else {
        $(this).removeClass('past').removeClass('present').addClass('future');
      }

      // retrieve saved user input from local storage
      var storedText = localStorage.getItem('timeBlock-' + timeBlockHour);
      if (storedText) { //check for content
        $(this).find('textarea').val(storedText);
      }
    });

    // add a listener for click events on the save button
    $('.saveBtn').click(function () {
      var timeBlockID = $(this).closest('.time-block').attr('id'); //find closest id ancestor element with .time-block class
      var timeBlockHour = parseInt(timeBlockID.split('-')[1]); //create int from timeBlock string; "sub string"
      var userText = $(this).closest('.time-block').find('textarea').val(); // search within element to extract value entered 


      // save user input to local storage
      localStorage.setItem('timeBlock-' + timeBlockHour, userText);
    });
  });
});
