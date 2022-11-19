INSERT INTO users (id,name,email,password) VALUES (1,'Bob','bob@bob.com');
INSERT INTO users (id,name,email,password) VALUES (2,'Carl','carl@carl.com');
INSERT INTO users (id,name,email,password) VALUES (3,'Dave','dave@dave.com');

INSERT INTO properties (id,owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active) VALUES (1, 2, '12 Grand Avenue', 'Description of the property rooms, patio etc.','http://url.com/1.jpg','http://url.com/1Large.jpg',130,1,1,2,'Canada', '12 Grand Avenue', 'Toronto', 'Ontario','LXX AXX',TRUE);
INSERT INTO properties (id,owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active) VALUES (2, 3, '144 Cherry St', 'Description of the property rooms, patio etc.','http://url.com/1.jpg','http://url.com/1Large.jpg',130,1,1,2,'Canada', '144 Cherry St', 'Toronto', 'Ontario','LXX AXX',TRUE);
INSERT INTO properties (id,owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active) VALUES (3, 2, '14 Alice St', 'Description of the property rooms, patio etc.','http://url.com/1.jpg','http://url.com/1Large.jpg',130,1,1,2,'Canada', '14 Alice St', 'Toronto', 'Ontario','LXX AXX',TRUE);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) VALUES (1,'2020-12-15','2020-12-20',1,2);
INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) VALUES (2,'2020-12-15','2020-12-20',2,3);
INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) VALUES (3,'2020-12-15','2020-12-20',1,1);

INSERT INTO property_reviews (id, guest_id,property_id,reservation_id,rating,message) VALUES (1,1,3,3,5,'');
INSERT INTO property_reviews (id, guest_id,property_id,reservation_id,rating,message) VALUES (2,1,1,2,5,'Nice Place!');
INSERT INTO property_reviews (id, guest_id,property_id,reservation_id,rating,message) VALUES (3,1,2,1,3,'Kinda Dirty');

