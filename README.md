# Challenge-SQL-Injection

## Build the sqli1 docker image on your platform

`docker build -t sqli1 .`

## Use the following configuration for containers

```yaml
containers:
  server:
    image: sqli1
exposed:
  container: server
  port: 3000
```
## Proposed description

### Description

A SQL injection is a common breach in websites which allow hackers to interact with the database in non allowed manners.
In this challenge, you need to bypass the login page in order to access some private informations from the administrator.

### Steps

*Go check what a SQL Injection attack is and its multiple variations
*Try to inject "malicious" characters to check if they are filtered out
*Think about how the login can be implemented and find how you can bypass it easily (without any tools)

## Flag

* Flag 1: MBAP

## Proposed hints

* ' can be used to end a string earlier than wanted

* OR 1==1 makes a condition verify as always true
