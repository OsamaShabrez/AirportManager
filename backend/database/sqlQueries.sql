CREATE TABLE `countries` (
  `id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `name`	CHAR(100) NOT NULL UNIQUE,
  `ISO`	CHAR(2) NOT NULL UNIQUE
);

CREATE TABLE `airlines` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`country_id`	INTEGER NOT NULL,
	`name`	CHAR(100) NOT NULL UNIQUE,
  FOREIGN KEY(country_id) REFERENCES countries(id)
);

CREATE TABLE `airports` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `country_id` INTEGER NOT NULL,
  `name` CHAR(100) NOT NULL UNIQUE,
  `IATA_code` CHAR(3) NOT NULL UNIQUE,
  `longitude` FLOAT NOT NULL UNIQUE,
  `latitude` FLOAT NOT NULL UNIQUE,
  FOREIGN KEY(country_id) REFERENCES countries(id)
);
/* Run this query at the end, we need unique constraint on longitude and latitude as a set */
ALTER TABLE `airports` ADD UNIQUE `unique_location`(`longitude`, `latitude`);

CREATE TABLE `flight_schedules` (
  `airline_id` INTEGER NOT NULL,
  `depart_airport_id` INTEGER NOT NULL,
  `arrive_airport_id` INTEGER NOT NULL,
  PRIMARY KEY (airline_id, depart_airport_id, arrive_airport_id),
  FOREIGN KEY(airline_id) REFERENCES airlines(id),
  FOREIGN KEY(depart_airport_id) REFERENCES airports(id),
  FOREIGN KEY(arrive_airport_id) REFERENCES airports(id)
);
