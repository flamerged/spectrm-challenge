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

## Setup

For the setup locally and online a postgres database is used. [Sequelize](https://sequelize.org/v5/) is used as ORM. 

### Local server setup

1. Clone repo
2. Run *yarn install*
3. Create *.env* file to set local development environment, see *.env.example*
4. In *config/config.js* set the sql database used for development and production. Production setup is for use on Heroku.
5. Run *yarn dev* to run local server. Server will be run on port 4000.

### Heroku server setup

1. Clone repe
2. Run *heroku create*. The [Heroku cli](https://devcenter.heroku.com/articles/creating-apps) is needed for this command.
3. Run *yarn deploy*
4. Run *heroku run yarn install*
5. Run *heroku run sequelize-cli db:migrate*

My Heroku api can be used with https://spectrm-api.herokuapp.com/

## API

#### 1. Get all messages

To get all messages you will need to send a get request to *localhost:4000/messages*. You will receive back a json containing all messages saved on the server:

```json
[
    {
        "id": "fb206e7b-5f88-4890-b77e-5ed19bdbee4d",
        "content": "Hello world",
        "retrievedCounter": "4",
        "createdAt": "2021-02-12T09:42:03.202Z",
        "updatedAt": "2021-02-12T11:05:19.897Z"
    },
    {
        "id": "adfe1757-2903-4290-a823-a6f863a292e7",
        "content": "YOLO",
        "retrievedCounter": "7",
        "createdAt": "2021-02-12T09:42:04.490Z",
        "updatedAt": "2021-02-12T11:05:19.900Z"
    },
    {
        "id": "54b2e007-56a2-4d55-9ead-adee3c8799c6",
        "content": "Another test message",
        "retrievedCounter": "1",
        "createdAt": "2021-02-12T10:54:05.073Z",
        "updatedAt": "2021-02-12T11:05:19.901Z"
    }
]
```

#### 2. Create a message

Creating a message requires a post request to *localhost:4000/messages*. The body of the request should contain a json object with the content of the new message:

```json
{
    "content": "Hello World"
}
```
You will receive back the created message:

```json
{
    "status": "success",
    "message": {
        "id": "b07be3b5-039f-4220-932f-609be3cac908",
        "content": "Hello world",
        "updatedAt": "2021-02-12T11:10:02.021Z",
        "createdAt": "2021-02-12T11:10:02.021Z",
        "retrievedCounter": "0"
    }
}
```

#### 3. Retrieve a message

Sending a get request with the message id *localhost:4000/messages/b07be3b5-039f-4220-932f-609be3cac908* returns the message in json format:

```json
[
    {
        "id": "b07be3b5-039f-4220-932f-609be3cac908",
        "content": "Hello world",
        "retrievedCounter": "4",
        "createdAt": "2021-02-12T09:55:15.806Z",
        "updatedAt": "2021-02-12T11:29:01.570Z"
    }
]
```

#### 4. Update a message 

Updating a message requires the use of the message id in the request url *localhost:4000/messages/b07be3b5-039f-4220-932f-609be3cac908* (from the example above). The body in the post request should contain the changed message:

```json
{
    "content": "Hello new World!"
}
```

The API will respond with the updated message:

```json
{
    "status": "success",
    "message": {
        "id": "b07be3b5-039f-4220-932f-609be3cac908",
        "content": "Hello new World!",
        "retrievedCounter": "1",
        "createdAt": "2021-02-12T11:10:02.021Z",
        "updatedAt": "2021-02-12T11:18:31.254Z"
    }
}
```

#### 5. Delete a message

To delete a message a delete request needs to be sent to *localhost:4000/messages/b07be3b5-039f-4220-932f-609be3cac908* containing the id of the message to be deleted. The API returns a success or fail message:

```json
{
    "status": "success"
}
```





