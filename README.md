# Library api
Implementation of API for managing the rental of books in the library and user subscriptions.

## Endpoints

1. User section
    1. `GET     api/user`                  - returns all users
    2. `POST    api/user`                  - creates new user
    3. `PUT     api/user/{userId}`         - updates user with given userId
    4. `DELETE` api/user/{userId}`         - deletes user with given userId
2. Subscription section
    1. `POST    api/subscription/{userId}` - generates an annula certificate for the user with given userId
3. Book section
    1. `POST    api/book`                  - creates new book
    2. `GET     api/book`                  - returns all books
    3. `GET     api/book/{bookId}`         - returns book with given bookId
4. Rent section
    1. `POST    api/rent`                  - rents a book for a user
    2. `DELETE  api/rent/{bookId}`         - rents out the book with given bookId

## Restrictions

1. User without subscription couldn't rent a book
2. User could have only one subscription
3. One user can rent no more then five books
4. One book - one rent in one time

## How to run

1. Start the docker compose 
```console
foo-bar# docker-compose up -d
```
2. Create ormconfig file with you database credentials, install typeorm-cli and run migration or use your db client
3. Run in terminal 
```console
foo-bar# yarn install
```
4. Start application
```console
foo-bar# yarn start:dev
```