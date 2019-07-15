# PeopleAlsoViewed
People who viewed this item also viewed

1. FEC project repo
2. For implementing front end component which displays 'people who viewed this item also viewed' section on ebay item page.

## Related Projects

  - https://github.com/fec4-gandolf/bid-buy
  - https://github.com/fec4-gandolf/images-modal
  - https://github.com/fec4-gandolf/Napoleon-Service

## Table of Contents

1. [Setup](#Setup)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Setup
1 Run 'npm install' for installing project dependecnies,

2 Make sure mysql server is running on your computer,

3 Run command 'npm run init:db' to add required schema 'alsoviewedschema.sql' to your mysql
database

4 Run command 'npm run seed:db' to seed databse (database is seeded with 100 items with ids 1 to 100 and categoryids 1 to 8 which are randomly allocated to items),

5 Run command 'npm run start:dev' which starts express server listening on port number 3004 with nodemon alternative 'npm run start' will start the same without nodemon,

6 Run command 'npm run react:dev' which starts webpack configured with babel,

7 Run command 'npm run test' which will run tests using Jest Testing Framework from test folder

## Usage
1 Once the server is running user can access client page in brower at http://localhost:3004

2 User can specify id for ex. http://localhost:3004/?id=6 to get all 'also viewed items' from category id = 6

3 If no id is specified it takes default id = 1 (This option is just used for testing and integration)

4 Presently database is setup with category ids between 1 to 8, if id = 11 is specified in http://localhost:3004/?id=11 then page displays message 'No items for category id : 11'

## Requirements
1 MySQL

## Development

### Installing Dependencies

