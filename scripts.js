document.addEventListener('DOMContentLoaded', function() {
    // This line adds an event listener to the entire document.
    // 'DOMContentLoaded' ensures that the code inside the function executes only after the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
    // The function passed as the second argument is the callback function that will be executed when the 'DOMContentLoaded' event occurs.
  
    // Function to toggle visibility of event details
    document.addEventListener('click', function(event) {
      // This line adds another event listener to the entire document, but this time it listens for 'click' events.
      // The function passed as the second argument is the callback function that will be executed whenever a click occurs anywhere in the document.
      // The 'event' parameter is an object that contains information about the click event.
  
      if (event.target.classList.contains('event-toggle')) {
        // This line checks if the element that was clicked (event.target) has the class 'event-toggle'.
        // If the clicked element does have this class, it means the user clicked on an element that should toggle event details.
  
        const eventId = event.target.getAttribute('data-event-id');
        // This line retrieves the value of the 'data-event-id' attribute from the clicked element.
        // This attribute is assumed to store the ID of the event whose details should be toggled.
  
        toggleEventDetails(eventId);
        // This line calls the 'toggleEventDetails' function, passing the retrieved 'eventId' as an argument.
        // This function (which is assumed to be defined elsewhere in your code) is responsible for actually toggling the visibility of the event details.
      }
    });
  
    // Attach event listeners to 'Add to Calendar' buttons
    document.addEventListener('click', function(event) {
      // This line adds another event listener to the entire document, listening for 'click' events.
  
      if (event.target.classList.contains('add-reminder')) {
        // This line checks if the clicked element has the class 'add-reminder'.
        // If it does, it means the user clicked on an 'Add to Calendar' button.
  
        const eventName = event.target.getAttribute('data-event-name');
        // This line retrieves the value of the 'data-event-name' attribute from the clicked button, which should contain the name of the event.
  
        const eventTime = event.target.getAttribute('data-event-time');
        // This line retrieves the value of the 'data-event-time' attribute from the clicked button, which should contain the time of the event.
  
        addReminder(eventName, eventTime);
        // This line calls the 'addReminder' function, passing the retrieved 'eventName' and 'eventTime' as arguments.
        // This function is responsible for handling the logic of adding the event to the user's calendar.
      }
    });
  
    function addReminder(eventName, eventTime) {
      // This function takes the event name and time as arguments.
  
      if (confirm('Do you want to add "' + eventName + '" to your calendar at ' + eventTime + '?')) {
        // This line displays a confirmation dialog to the user, asking if they want to add the event to their calendar.
        // If the user clicks 'OK', the code inside the 'if' block is executed.
  
        window.open(createGoogleCalendarLink(eventName, eventTime));
        // This line opens a new browser window or tab, navigating to the URL returned by the 'createGoogleCalendarLink' function.
        // This URL is a link to Google Calendar that pre-fills the event details.
      }
    }
  
    function createGoogleCalendarLink(eventName, eventTime) {
      // This function takes the event name and time as arguments and returns a Google Calendar URL.
  
      const startTime = encodeURIComponent(new Date(eventTime).toISOString());
      // This line creates a new Date object from the 'eventTime' string and converts it to an ISO string.
      // It then encodes the ISO string using 'encodeURIComponent' to ensure it's safe to use in a URL.
      // this creates the start time for the google calendar event.
      const endTime = encodeURIComponent(new Date(new Date(eventTime).getTime() + 3600000).toISOString());
      // This line calculates the end time of the event by adding one hour (3600000 milliseconds) to the start time.
      // It then converts the end time to an ISO string and encodes it using 'encodeURIComponent'.
      // this creates the end time for the google calendar event, one hour after the start time.
  
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${startTime}/${endTime}&details=&location=`;
      // This line constructs the Google Calendar URL, including the encoded event name, start time, and end time.
      // it returns the completed URL string.
    }
  });
