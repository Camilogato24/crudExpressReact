DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usuarioAddorEdit2`(
    IN _idmap INT(11),
    IN _nombre VARCHAR(45),
    IN  _documento INT(10),
    IN  _pass INT(20),
    IN  _fecha DATE
)
BEGIN 
	IF _idmap = 0 THEN
        	INSERT INTO usuarios (nombre, documento, pass, fecha) VALUES(_nombre, _documento, _pass, _fecha);
    		SET _idmap = LAST_INSERT_ID();
    ELSE
    		UPDATE usuarios
            SET 
            	nombre = _nombre,
                documento = _documento,
                pass = _pass,
                fecha = _fecha
            WHERE id = _idmap;
    END IF;
    
    SELECT _idmap AS id;
               
END$$
DELIMITER ;