ALTER TABLE `TRANSACTION_CATEGORY` CHANGE `ORDER_SEQUENCE` `ORDER_SEQUENCE` INT(11) NULL ;
UPDATE `TRANSACTION_CATEGORY` SET ORDER_SEQUENCE=NULL;
INSERT INTO PATCH(EXECUTION_DATE,PATCH_NO) VALUES(NOW(),'20180228');