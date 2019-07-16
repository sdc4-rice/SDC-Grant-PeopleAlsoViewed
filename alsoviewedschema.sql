DROP DATABASE IF EXISTS alsoviewed;

CREATE DATABASE alsoviewed;

USE alsoviewed;

CREATE TABLE alsovieweditems(
  id INT NOT NULL AUTO_INCREMENT,
  image VARCHAR(255),
  title VARCHAR(255),
  itemurl VARCHAR(255),
  oldprice decimal(10, 2),
  currentprice decimal(10, 2) NOT NULL,
  freeshipping BOOLEAN,
  shippingcost decimal(10, 2),
  categoryid INT NOT NULL,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
*/


