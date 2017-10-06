# CollisionReport
301 project: report car collisions for insurance claims

## APIs and Dependencies
 - Google Maps API
 - StaticMaps API (Also Google)
 - body-parser
 - express
 - nodemailer

 This app allows the user to either put in a location, or use location services to get their current location, and calls the google maps API to generate a map of the location.  The user can then select a car icon and drop a pin on the map to signify where their car was hit.  Multiple pins can be dropped to show multiple cars.  We have a button that will remove the pins in the opposite order dropped as you click it, in case the user wants to change the car locations or move the map. After satisfied with the placement of pins, the user selects the Save Map button to move to the next page.  At this point the google maps API saves the first pin dropped as the center of the map and creates a static map of the users pinned area.  That static map is then shown on the "notes" page where we have a form that allows them to enter in a description of the event, and add a name and email address to send the information to. We use Nodemailer to then send an email from the Reportmywreck to the user designated email with the static map and the user's description in the body, and the information they put in the name field (their name, or claim number, or whatever) is the subject line.  Once the email is sent the user is alerted, and the app goes back to the home page.



 CREDITS:

 Shayne Smith - Design Consultant
 Gabe Meringolo - Graphic Design
 Nick Hunt-Walker - CSS Debugger, API support, & Burner of Broken Projects
 Megan Flood, Luay Younus, Han Bao - Technical Support

Content:
https://dribbble.com/shots/3781908-Car-Dealer-GIF-Loader
