# This repo for all backend my project, because I just have one free AWS EC2. :)

# Portfolio Endpoints

This endpoint is use to check and record every person that contact me from my web portfolio.

## `POST` /portfolio/send-me-mail

### Request

- body

```json
{
  "name": "string",
  "email": "string",
  "message": "text"
}
```

### Response

_200 - OK_

```json
{
  "message": "Success send email"
}
```

_403 - BAD REQUEST_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Not valid email"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Message is required"
}
```

# Global Error

_500 Server Error_

```json
{
  "message": "Internal server error"
}
```
