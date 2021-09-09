-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-09-2021 a las 05:51:20
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id_ciu` int(100) NOT NULL,
  `nombre_ciu` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id_ciu`, `nombre_ciu`) VALUES
(1, 'Acacías'),
(2, 'Aguachica'),
(3, 'Agustín Codazzi'),
(4, 'Apartadó'),
(5, 'Arauca'),
(6, 'Arauquita'),
(7, 'Arjona'),
(8, 'Armenia'),
(9, 'Baranoa'),
(10, 'Barbacoas'),
(11, 'Barbosa'),
(12, 'Barrancabermeja'),
(13, 'Barranquilla'),
(14, 'Bello'),
(15, 'Bogotá'),
(16, 'Bucaramanga'),
(17, 'Buenaventura'),
(18, 'Buga'),
(19, 'Cajicá'),
(20, 'Calarcá'),
(21, 'Caldas'),
(22, 'Cali'),
(23, 'Candelaria'),
(24, 'Carepa'),
(25, 'Cartagena'),
(26, 'Cartago'),
(27, 'Caucasia'),
(28, 'Cereté'),
(29, 'Chaparral'),
(30, 'Chía'),
(31, 'Chigorodó'),
(32, 'Chinchiná'),
(33, 'Chiquinquirá'),
(34, 'Ciénaga'),
(35, 'Ciénaga de Oro'),
(36, 'Copacabana'),
(37, 'Corozal'),
(38, 'Cúcuta'),
(39, 'Cumaribo'),
(40, 'Dosquebradas'),
(41, 'Duitama'),
(42, 'El Bagre'),
(43, 'El Banco'),
(44, 'El Carmen de Bolívar'),
(45, 'El Carmen de Viboral'),
(46, 'El Cerrito'),
(47, 'El Tambo'),
(48, 'Envigado'),
(49, 'Espinal'),
(50, 'Facatativá'),
(51, 'Florencia'),
(52, 'Florida'),
(53, 'Floridablanca'),
(54, 'Fundación'),
(55, 'Funza'),
(56, 'Fusagasugá'),
(57, 'Galapa'),
(58, 'Garzón'),
(59, 'Girardot'),
(60, 'Girardota'),
(61, 'Girón'),
(62, 'Granada'),
(63, 'Guarne'),
(64, 'Ibagué'),
(65, 'Ipiales'),
(66, 'Itagüí'),
(67, 'Jamundí'),
(68, 'La Ceja'),
(69, 'La Dorada'),
(70, 'La Estrella'),
(71, 'La Jagua de Ibirico'),
(72, 'La Plata'),
(73, 'Lorica'),
(74, 'Los Patios'),
(75, 'Madrid'),
(76, 'Magangué'),
(77, 'Maicao'),
(78, 'Malambo'),
(79, 'Manaure'),
(80, 'Manizales'),
(81, 'Marinilla'),
(82, 'Medellín'),
(83, 'Mocoa'),
(84, 'Montelíbano'),
(85, 'Montería'),
(86, 'Mosquera'),
(87, 'Neiva'),
(88, 'Ocaña'),
(89, 'Palmira'),
(90, 'Pamplona'),
(91, 'Pasto'),
(92, 'Pereira'),
(93, 'Piedecuesta'),
(94, 'Pitalito'),
(95, 'Planeta Rica'),
(96, 'Plato'),
(97, 'Popayán'),
(98, 'Puerto Asís'),
(99, 'Puerto Colombia'),
(100, 'Quibdó'),
(101, 'Riohacha'),
(102, 'Rionegro'),
(103, 'Riosucio'),
(104, 'Riosucio'),
(105, 'Sabanalarga'),
(106, 'Sabaneta'),
(107, 'Sahagún'),
(108, 'San Andrés'),
(109, 'San Gil'),
(110, 'San José del Guaviare'),
(111, 'San Marcos'),
(112, 'San Onofre'),
(113, 'San Pelayo'),
(114, 'San Vicente del Caguán'),
(115, 'Santa Marta'),
(116, 'Santa Rosa de Cabal'),
(117, 'Santander de Quilichao'),
(118, 'Saravena'),
(119, 'Sincelejo'),
(120, 'Soacha'),
(121, 'Sogamoso'),
(122, 'Soledad'),
(123, 'Tibú'),
(124, 'Tierralta'),
(125, 'Tuchín'),
(126, 'Tuluá'),
(127, 'Tumaco'),
(128, 'Tunja'),
(129, 'Turbaco'),
(130, 'Turbo'),
(131, 'Uribia'),
(132, 'Valledupar'),
(133, 'Villa del Rosario'),
(134, 'Villamaría'),
(135, 'Villavicencio'),
(136, 'Yopal'),
(137, 'Yumbo'),
(138, 'Zipaquirá'),
(139, 'Zona Bananera');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

CREATE TABLE `consultas` (
  `id_con` int(100) NOT NULL,
  `id_ma` int(100) NOT NULL,
  `id_equi` int(100) NOT NULL,
  `id_pro` int(100) NOT NULL,
  `id_ciu` int(100) NOT NULL,
  `id_sede` int(100) NOT NULL,
  `id_ubi` int(100) NOT NULL,
  `modelo_con` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `serial_con` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `placa_con` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `mantenimiento_con` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `consultas`
--

INSERT INTO `consultas` (`id_con`, `id_ma`, `id_equi`, `id_pro`, `id_ciu`, `id_sede`, `id_ubi`, `modelo_con`, `serial_con`, `placa_con`, `mantenimiento_con`) VALUES
(190, 1, 1, 1, 15, 1, 1, 'QWDFGTRLOPMN', 'POERILSDJYNC', 'DIA0001', 'si'),
(191, 3, 2, 3, 2, 2, 3, 'POLIUYTGFDERSD', 'OPLUIOPLKJMN', 'CON0001', 'no'),
(192, 4, 2, 4, 7, 3, 8, 'MNKLOPUYJH', 'QWEDVFCXSAZ', 'WOM0001', 'si'),
(193, 2, 1, 3, 15, 1, 9, 'qazxswedcvfr', 'rfvcdewsxzaq', 'CON0002', 'no'),
(194, 3, 2, 4, 2, 3, 5, 'MJUNHYBGTVFR', 'RFVTGBYHN', 'WOM0002', 'no'),
(195, 4, 2, 1, 82, 3, 10, 'mnbvcxzasdfg', 'FDSAZXCVBNM', 'DIA0002', 'no'),
(196, 1, 1, 1, 15, 1, 1, 'QWDFGTRLOPMN', 'POERILSDJYNC', 'DIA0003', 'si'),
(197, 3, 2, 3, 2, 2, 6, 'POLIUYTGFDERSD', 'OPLUIOPLKJMN', 'CON0003', 'no'),
(198, 4, 2, 4, 7, 3, 6, 'MNKLOPUYJH', 'QWEDVFCXSAZ', 'WOM0003', 'si'),
(199, 2, 1, 3, 15, 1, 8, 'qazxswedcvfr', 'rfvcdewsxzaq', 'CON0004', 'no'),
(200, 3, 2, 4, 2, 3, 5, 'MJUNHYBGTVFR', 'RFVTGBYHN', 'WOM0004', 'no'),
(201, 4, 2, 1, 82, 3, 10, 'mnbvcxzasdfg', 'FDSAZXCVBNM', 'DIA0004', 'no');

--
-- Disparadores `consultas`
--
DELIMITER $$
CREATE TRIGGER `deletedhconsultas` BEFORE DELETE ON `consultas` FOR EACH ROW INSERT INTO hisconsultas VALUES(null, OLD.id_con, OLD.id_ma, OLD.id_equi, OLD.id_pro, OLD.id_ciu, OLD.id_sede, OLD.id_ubi, OLD.modelo_con, OLD.serial_con, OLD.placa_con, OLD.mantenimiento_con,'Deleted', NOW())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `inserthconsultas` AFTER INSERT ON `consultas` FOR EACH ROW INSERT INTO hisconsultas VALUES(null, NEW.id_con, NEW.id_ma, NEW.id_equi, NEW.id_pro, NEW.id_ciu, NEW.id_sede, NEW.id_ubi, NEW.modelo_con, NEW.serial_con, NEW.placa_con, NEW.mantenimiento_con,'Insert', NOW())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updatehcosultas` AFTER UPDATE ON `consultas` FOR EACH ROW INSERT INTO hisconsultas VALUES(null, NEW.id_con, NEW.id_ma, NEW.id_equi, NEW.id_pro, NEW.id_ciu, NEW.id_sede, NEW.id_ubi, NEW.modelo_con, NEW.serial_con, NEW.placa_con, NEW.mantenimiento_con,'Update', NOW())
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id_equi` int(100) NOT NULL,
  `nombre_equi` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id_equi`, `nombre_equi`) VALUES
(1, 'SWITCH'),
(2, 'SERVIDORES'),
(3, 'ACCES POINT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hisconsultas`
--

CREATE TABLE `hisconsultas` (
  `id_hcon` int(100) NOT NULL,
  `id_con` int(100) NOT NULL,
  `id_ma` int(100) NOT NULL,
  `id_equi` int(100) NOT NULL,
  `id_pro` int(100) NOT NULL,
  `id_ciu` int(100) NOT NULL,
  `id_sede` int(100) NOT NULL,
  `id_ubi` int(100) NOT NULL,
  `modelo_con` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `serial_con` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `placa_con` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `mantenimiento_con` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado_hcon` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_hcon` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `hisconsultas`
--

INSERT INTO `hisconsultas` (`id_hcon`, `id_con`, `id_ma`, `id_equi`, `id_pro`, `id_ciu`, `id_sede`, `id_ubi`, `modelo_con`, `serial_con`, `placa_con`, `mantenimiento_con`, `estado_hcon`, `fecha_hcon`) VALUES
(64, 190, 1, 1, 1, 15, 1, 1, 'QWDFGTRLOPMN', 'POERILSDJYNC', 'DIA0001', 'si', 'Insert', '2021-08-31 20:04:33'),
(65, 191, 3, 2, 3, 2, 2, 3, 'POLIUYTGFDERSD', 'OPLUIOPLKJMN', 'CON0001', 'no', 'Insert', '2021-08-31 20:04:33'),
(66, 192, 4, 2, 4, 7, 3, 8, 'MNKLOPUYJH', 'QWEDVFCXSAZ', 'WOM0001', 'si', 'Insert', '2021-08-31 20:04:33'),
(67, 193, 2, 1, 3, 15, 1, 9, 'qazxswedcvfr', 'rfvcdewsxzaq', 'CON0002', 'no', 'Insert', '2021-08-31 20:04:33'),
(68, 194, 3, 2, 4, 2, 3, 5, 'MJUNHYBGTVFR', 'RFVTGBYHN', 'WOM0002', 'no', 'Insert', '2021-08-31 20:04:33'),
(69, 195, 4, 2, 1, 82, 3, 10, 'mnbvcxzasdfg', 'FDSAZXCVBNM', 'DIA0002', 'no', 'Insert', '2021-08-31 20:04:33'),
(70, 196, 1, 1, 1, 15, 1, 1, 'QWDFGTRLOPMN', 'POERILSDJYNC', 'DIA0003', 'si', 'Insert', '2021-08-31 20:13:52'),
(71, 197, 3, 2, 3, 2, 2, 6, 'POLIUYTGFDERSD', 'OPLUIOPLKJMN', 'CON0003', 'no', 'Insert', '2021-08-31 20:13:52'),
(72, 198, 4, 2, 4, 7, 3, 6, 'MNKLOPUYJH', 'QWEDVFCXSAZ', 'WOM0003', 'si', 'Insert', '2021-08-31 20:13:52'),
(73, 199, 2, 1, 3, 15, 1, 8, 'qazxswedcvfr', 'rfvcdewsxzaq', 'CON0004', 'no', 'Insert', '2021-08-31 20:13:52'),
(74, 200, 3, 2, 4, 2, 3, 5, 'MJUNHYBGTVFR', 'RFVTGBYHN', 'WOM0004', 'no', 'Insert', '2021-08-31 20:13:52'),
(75, 201, 4, 2, 1, 82, 3, 10, 'mnbvcxzasdfg', 'FDSAZXCVBNM', 'DIA0004', 'no', 'Insert', '2021-08-31 20:13:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hismantenimiento`
--

CREATE TABLE `hismantenimiento` (
  `id_hman` int(100) NOT NULL,
  `id_man` int(100) NOT NULL,
  `id_ma` int(100) NOT NULL,
  `id_equi` int(100) NOT NULL,
  `id_pro` int(100) NOT NULL,
  `id_ciu` int(100) NOT NULL,
  `id_sede` int(100) NOT NULL,
  `id_ubi` int(100) NOT NULL,
  `id_con` int(100) NOT NULL,
  `fecha_man` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado_man` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `periodicidad_man` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_pro_man` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `costo_man` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado_hman` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_hman` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE `mantenimiento` (
  `id_man` int(100) NOT NULL,
  `id_ma` int(100) NOT NULL,
  `id_equi` int(100) NOT NULL,
  `id_pro` int(100) NOT NULL,
  `id_ciu` int(100) NOT NULL,
  `id_sede` int(100) NOT NULL,
  `id_ubi` int(100) NOT NULL,
  `id_con` int(100) NOT NULL,
  `fecha_man` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado_man` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `periodicidad_man` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_pro_man` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `costo_man` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Disparadores `mantenimiento`
--
DELIMITER $$
CREATE TRIGGER `deletehmantenimiento` BEFORE DELETE ON `mantenimiento` FOR EACH ROW INSERT INTO hismantenimiento VALUES(null, OLD.id_man, OLD.id_ma, OLD.id_equi, OLD.id_pro, OLD.id_ciu, OLD.id_sede, OLD.id_ubi, OLD.id_con, OLD.fecha_man, OLD.estado_man, OLD.periodicidad_man, OLD.fecha_pro_man, OLD.costo_man, 'Delete', NOW())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `inserthmantenimiento` AFTER INSERT ON `mantenimiento` FOR EACH ROW INSERT INTO hismantenimiento VALUES(null, NEW.id_man, NEW.id_ma, NEW.id_equi, NEW.id_pro, NEW.id_ciu, NEW.id_sede, NEW.id_ubi, NEW.id_con, NEW.fecha_man, NEW.estado_man, NEW.periodicidad_man, NEW.fecha_pro_man, NEW.costo_man, 'Insert', NOW())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updatehmantenimiento` AFTER UPDATE ON `mantenimiento` FOR EACH ROW INSERT INTO hismantenimiento VALUES(null, NEW.id_man, NEW.id_ma, NEW.id_equi, NEW.id_pro, NEW.id_ciu, NEW.id_sede, NEW.id_ubi, NEW.id_con, NEW.fecha_man, NEW.estado_man, NEW.periodicidad_man, NEW.fecha_pro_man, NEW.costo_man, 'Update', NOW())
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id_ma` int(100) NOT NULL,
  `nombre_ma` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_ma`, `nombre_ma`) VALUES
(1, 'CISCO'),
(2, 'HP'),
(3, 'DELL'),
(4, 'D-LINK'),
(5, 'ARUBA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provedor`
--

CREATE TABLE `provedor` (
  `id_pro` int(100) NOT NULL,
  `nombre_pro` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `nit_pro` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `provedor`
--

INSERT INTO `provedor` (`id_pro`, `nombre_pro`, `nit_pro`) VALUES
(1, 'DIAN', '8001972684'),
(2, 'BDO', '1234567890876'),
(3, 'Contraloria', '123567890'),
(4, 'WOM', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `id_sede` int(100) NOT NULL,
  `id_ciu` int(100) NOT NULL,
  `id_pro` int(100) NOT NULL,
  `nombre_sede` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `direccion_sede` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `sede`
--

INSERT INTO `sede` (`id_sede`, `id_ciu`, `id_pro`, `nombre_sede`, `direccion_sede`) VALUES
(1, 15, 2, 'Sede calle 30', 'Carrea 20 N 30 - 55'),
(2, 15, 1, 'Sede 68', 'Calle 68 - 20 50'),
(3, 82, 1, 'Sede Poblado', 'Carrera 50 N 20 - 35'),
(4, 13, 4, 'Sede Palmas', 'Carrera 13 N 50 25'),
(5, 15, 3, 'Sede Edificio Inter', 'Calle 20 50 A 40'),
(6, 8, 4, 'Centro', 'Calle 20 N 50 - 25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `id_ubi` int(100) NOT NULL,
  `nombre_ubi` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ubicacion`
--

INSERT INTO `ubicacion` (`id_ubi`, `nombre_ubi`) VALUES
(1, 'piso 1'),
(2, 'piso 2'),
(3, 'Piso 3'),
(4, 'Piso 4'),
(5, 'Piso 5'),
(6, 'Piso 6'),
(7, 'Piso 7'),
(8, 'Piso 8'),
(9, 'Piso 9'),
(10, 'Piso 10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usu` int(100) NOT NULL,
  `nombre_usu` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `correo_usu` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `password_usu` char(100) COLLATE utf8_spanish_ci NOT NULL,
  `rol_usu` char(150) COLLATE utf8_spanish_ci NOT NULL,
  `esta_usu` char(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usu`, `nombre_usu`, `correo_usu`, `password_usu`, `rol_usu`, `esta_usu`) VALUES
(29, 'edisson Andres', 'edissonalonso@gmail.com', 'bb0ccf2b1bcbe3b74bad89590c4d2fde', 'administrador', ''),
(30, 'Carolina Tavera', 'mcarotaverao@gmail.com', 'bb0ccf2b1bcbe3b74bad89590c4d2fde', 'administrador', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id_ciu`);

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id_con`),
  ADD KEY `id_pro` (`id_pro`),
  ADD KEY `id_equi` (`id_equi`),
  ADD KEY `id_sede` (`id_sede`),
  ADD KEY `id_ma` (`id_ma`),
  ADD KEY `id_ubi` (`id_ubi`),
  ADD KEY `id_ciu` (`id_ciu`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id_equi`);

--
-- Indices de la tabla `hisconsultas`
--
ALTER TABLE `hisconsultas`
  ADD PRIMARY KEY (`id_hcon`),
  ADD KEY `id_equi` (`id_equi`),
  ADD KEY `id_pro` (`id_pro`),
  ADD KEY `id_ciu` (`id_ciu`),
  ADD KEY `id_sede` (`id_sede`),
  ADD KEY `id_ubi` (`id_ubi`),
  ADD KEY `id_ma` (`id_ma`);

--
-- Indices de la tabla `hismantenimiento`
--
ALTER TABLE `hismantenimiento`
  ADD PRIMARY KEY (`id_hman`),
  ADD KEY `id_ma` (`id_ma`),
  ADD KEY `id_equi` (`id_equi`),
  ADD KEY `id_pro` (`id_pro`),
  ADD KEY `id_ciu` (`id_ciu`),
  ADD KEY `id_sede` (`id_sede`),
  ADD KEY `id_ubi` (`id_ubi`),
  ADD KEY `id_con` (`id_con`),
  ADD KEY `id_man` (`id_man`);

--
-- Indices de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD PRIMARY KEY (`id_man`),
  ADD KEY `id_sede` (`id_sede`),
  ADD KEY `id_ma` (`id_ma`),
  ADD KEY `id_pro` (`id_pro`),
  ADD KEY `id_equi` (`id_equi`),
  ADD KEY `id_ubi` (`id_ubi`),
  ADD KEY `id_con` (`id_con`),
  ADD KEY `id_ciu` (`id_ciu`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_ma`);

--
-- Indices de la tabla `provedor`
--
ALTER TABLE `provedor`
  ADD PRIMARY KEY (`id_pro`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`id_sede`),
  ADD KEY `id_ciu` (`id_ciu`),
  ADD KEY `id_pro` (`id_pro`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`id_ubi`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id_ciu` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT de la tabla `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id_con` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id_equi` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT de la tabla `hisconsultas`
--
ALTER TABLE `hisconsultas`
  MODIFY `id_hcon` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `hismantenimiento`
--
ALTER TABLE `hismantenimiento`
  MODIFY `id_hman` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  MODIFY `id_man` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=375;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id_ma` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `provedor`
--
ALTER TABLE `provedor`
  MODIFY `id_pro` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `id_sede` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `id_ubi` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usu` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD CONSTRAINT `consultas_ibfk_1` FOREIGN KEY (`id_pro`) REFERENCES `provedor` (`id_pro`),
  ADD CONSTRAINT `consultas_ibfk_2` FOREIGN KEY (`id_equi`) REFERENCES `equipo` (`id_equi`),
  ADD CONSTRAINT `consultas_ibfk_4` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  ADD CONSTRAINT `consultas_ibfk_5` FOREIGN KEY (`id_ma`) REFERENCES `marca` (`id_ma`),
  ADD CONSTRAINT `consultas_ibfk_6` FOREIGN KEY (`id_ubi`) REFERENCES `ubicacion` (`id_ubi`),
  ADD CONSTRAINT `consultas_ibfk_7` FOREIGN KEY (`id_ciu`) REFERENCES `ciudad` (`id_ciu`),
  ADD CONSTRAINT `consultas_ibfk_8` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`);

--
-- Filtros para la tabla `hisconsultas`
--
ALTER TABLE `hisconsultas`
  ADD CONSTRAINT `hisconsultas_ibfk_1` FOREIGN KEY (`id_equi`) REFERENCES `equipo` (`id_equi`),
  ADD CONSTRAINT `hisconsultas_ibfk_2` FOREIGN KEY (`id_pro`) REFERENCES `provedor` (`id_pro`),
  ADD CONSTRAINT `hisconsultas_ibfk_3` FOREIGN KEY (`id_ciu`) REFERENCES `ciudad` (`id_ciu`),
  ADD CONSTRAINT `hisconsultas_ibfk_4` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  ADD CONSTRAINT `hisconsultas_ibfk_5` FOREIGN KEY (`id_ubi`) REFERENCES `ubicacion` (`id_ubi`),
  ADD CONSTRAINT `hisconsultas_ibfk_6` FOREIGN KEY (`id_ma`) REFERENCES `marca` (`id_ma`);

--
-- Filtros para la tabla `hismantenimiento`
--
ALTER TABLE `hismantenimiento`
  ADD CONSTRAINT `hismantenimiento_ibfk_1` FOREIGN KEY (`id_ma`) REFERENCES `marca` (`id_ma`),
  ADD CONSTRAINT `hismantenimiento_ibfk_2` FOREIGN KEY (`id_equi`) REFERENCES `equipo` (`id_equi`),
  ADD CONSTRAINT `hismantenimiento_ibfk_3` FOREIGN KEY (`id_pro`) REFERENCES `provedor` (`id_pro`),
  ADD CONSTRAINT `hismantenimiento_ibfk_4` FOREIGN KEY (`id_ciu`) REFERENCES `ciudad` (`id_ciu`),
  ADD CONSTRAINT `hismantenimiento_ibfk_5` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  ADD CONSTRAINT `hismantenimiento_ibfk_6` FOREIGN KEY (`id_ubi`) REFERENCES `ubicacion` (`id_ubi`),
  ADD CONSTRAINT `hismantenimiento_ibfk_7` FOREIGN KEY (`id_con`) REFERENCES `consultas` (`id_con`);

--
-- Filtros para la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD CONSTRAINT `mantenimiento_ibfk_1` FOREIGN KEY (`id_sede`) REFERENCES `sede` (`id_sede`),
  ADD CONSTRAINT `mantenimiento_ibfk_2` FOREIGN KEY (`id_ma`) REFERENCES `marca` (`id_ma`),
  ADD CONSTRAINT `mantenimiento_ibfk_3` FOREIGN KEY (`id_pro`) REFERENCES `provedor` (`id_pro`),
  ADD CONSTRAINT `mantenimiento_ibfk_4` FOREIGN KEY (`id_equi`) REFERENCES `equipo` (`id_equi`),
  ADD CONSTRAINT `mantenimiento_ibfk_5` FOREIGN KEY (`id_ciu`) REFERENCES `ciudad` (`id_ciu`),
  ADD CONSTRAINT `mantenimiento_ibfk_6` FOREIGN KEY (`id_ubi`) REFERENCES `ubicacion` (`id_ubi`),
  ADD CONSTRAINT `mantenimiento_ibfk_7` FOREIGN KEY (`id_con`) REFERENCES `consultas` (`id_con`),
  ADD CONSTRAINT `mantenimiento_ibfk_8` FOREIGN KEY (`id_ciu`) REFERENCES `ciudad` (`id_ciu`);

--
-- Filtros para la tabla `sede`
--
ALTER TABLE `sede`
  ADD CONSTRAINT `sede_ibfk_1` FOREIGN KEY (`id_ciu`) REFERENCES `ciudad` (`id_ciu`),
  ADD CONSTRAINT `sede_ibfk_2` FOREIGN KEY (`id_pro`) REFERENCES `provedor` (`id_pro`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
