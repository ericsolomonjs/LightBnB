SELECT reservations.id, properties.title, reservations.start_date, properties.cost_per_night, AVG(property_reviews.rating)
FROM reservations JOIN properties ON property_id=properties.id
JOIN property_reviews ON property_reviews.guest_id=reservations.guest_id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, properties.id
ORDER BY start_date ASC
LIMIT 10;