DELIMITER $$
CREATE TRIGGER actualizarePopularitateProdus
AFTER INSERT ON rutinaprodus
FOR EACH ROW
BEGIN
	UPDATE produs SET rating = LEAST(rating + 0.001, 5.00) WHERE id = NEW.produsId;
END$$
DELIMITER ;
