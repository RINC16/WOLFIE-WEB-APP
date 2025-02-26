document.addEventListener('DOMContentLoaded', function() {

    // Function to toggle visibility of event details
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('event-toggle')) {
            const eventId = event.target.getAttribute('data-event-id');
            toggleEventDetails(eventId);
        }
    });

    // Attach event listeners to 'Add to Calendar' buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-reminder')) {
            const eventName = event.target.getAttribute('data-event-name');
            const eventTime = event.target.getAttribute('data-event-time');
            addReminder(eventName, eventTime);
        }
    });

    function addReminder(eventName, eventTime) {
        if (confirm('Do you want to add "' + eventName + '" to your calendar at ' + eventTime + '?')) {
            window.open(createGoogleCalendarLink(eventName, eventTime));
        }
    }

    function createGoogleCalendarLink(eventName, eventTime) {
        const startTime = encodeURIComponent(new Date(eventTime).toISOString());
        const endTime = encodeURIComponent(new Date(new Date(eventTime).getTime() + 3600000).toISOString());
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${startTime}/${endTime}&details=&location=`;
    }
});
