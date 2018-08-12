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
  `longitude` FLOAT NOT NULL,
  `latitude` FLOAT NOT NULL,
  FOREIGN KEY(country_id) REFERENCES countries(id)
);
INSERT INTO airports (country_id, name, IATA_code, longitude, latitude) VALUES (84, "Magical Airports 1", "MAP", 1.2223, 35.6666);
INSERT INTO airports (country_id, name, IATA_code, longitude, latitude) VALUES (145, "Magical Airports 2", "MPA", 23.2223, 25.6666);
INSERT INTO airports (country_id, name, IATA_code, longitude, latitude) VALUES (55, "Magical Airports 3", "MXP", 45.2223, 15.6666);
INSERT INTO airports (country_id, name, IATA_code, longitude, latitude) VALUES (85, "Magical Airports 4", "XAP", 16.2223, 19.6666);
INSERT INTO airports (country_id, name, IATA_code, longitude, latitude) VALUES (72, "Magical Airports 5", "MZP", 26.2223, 54.666);
INSERT INTO airports (country_id, name, IATA_code, longitude, latitude) VALUES (94, "Magical Airports 6", "TAP", 12.2223, 95.6666);
INSERT INTO airports (country_id, name, IATA_code, longitude, latitude) VALUES (184, "Magical Airports 7", "MQP", 67.2223, 55.6666);
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
