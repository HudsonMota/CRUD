/*Criado e desenvolvido por Hudson Mota e João Felipe*/
create database if not exists ap2;

use ap2;

CREATE TABLE if not exists `pessoa` (
  `id` int(10) NOT NULL auto_increment,
  `nome` varchar(45) NOT NULL,
  `idade` int(2) NOT NULL,
  `cpf` char (11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
 select * from pessoa;
 