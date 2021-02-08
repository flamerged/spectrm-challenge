# A Challenge for a Backend Engineer position at Spectrm

## Challenge:

### Create a REST API for maintaining messages.
- The following statements are true about a message:
  - it has a non-guessable identifier (UUID v4),
  - it can contain characters coming from different languages,
  - it does not support the usage of html tags,
  - it has a maximum number of chars (255 characters),
  - e-mail(s) and http link(s) can be part of the message,
  - it has an internal counter of how many times the message was retrieved (unsigned number)
  
### We expect a CRUD API with a Database. As CRUD, we expect:
- an endpoint to list the messages
- an endpoint to retrieve a single message via its identifier
- an endpoint to create a message
- an endpoint to update a message
- and endpoint to delete a message

The output & input of the API should be a JSON representation.

### Other considerations
- The quality of our deliverables are important, we want to make sure everything works.
- You are welcome to use any framework/library of your choice. A plus should be to work with PHP or Golang.
- A good documentation on how to interact with the API has to be provided as other teams would be using the HTTP service, it's expected to know what should be sent by the client as a valid request and what are the possible responses.
- A documentation on how to use the project locally has to exist.
- It would be nice to hear, what would be your next steps if you have had more time.
