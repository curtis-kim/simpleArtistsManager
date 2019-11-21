Authored by Curtis Kim

# Purpose
Applying MVC Pattern to simple web application.

### MODEL
The application needs a single model (artist), create a Model which will be responsible for adding new
artist(s), deleting artist(s), getting all artists and searching. 

### VIEW
Home handlebars
Login handlebars


### CONTROLLER
LoginController :
Handle any actions on the login view (in our case successful login and redirect to the artist view)
ArtistController:
Retrieval of artist data (database), handle actions : addition, deletion, searching and logout (redirect to
login view)