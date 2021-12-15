-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2021 a las 16:36:08
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
(451, 3, 3, 1, 11, 5, 4, 'perreo', '22222', 'DIA0008', 'si'),
(452, 4, 3, 1, 9, 4, 3, '1111111111', 'fdgh,fh,gfh,gfh,ñf', 'DIA0009', 'si'),
(453, 41, 3, 1, 10, 6, 7, 'gfhgfhgfhfgfh', '344354353453', 'DIA0010', 'si'),
(454, 41, 96, 1, 17, 4, 4, 'gfhgfhgfh', '435435435435', 'DIA0011', 'si'),
(455, 41, 3, 1, 14, 5, 5, 'dfgdfgfdgfdgf', '45345345345334', 'DIA0012', 'si'),
(456, 4, 3, 1, 13, 3, 5, 'reterterterrrtert', 'gfdfgdfgdfgdf', 'DIA0013', 'si'),
(457, 44, 90, 1, 10, 5, 5, 'dfgdfggfdgh', '3453454354', 'DIA0014', 'si'),
(459, 43, 90, 1, 16, 6, 5, 'chuis', 'asdfsafkñlsdk', 'DIA0016', 'no'),
(460, 2, 3, 1, 18, 4, 2, 'ffffff', 'fffffffff', 'DIA0017', 'si'),
(461, 3, 2, 1, 14, 4, 3, 'banco feo', 'cra100N266', 'DIA0018', 'no'),
(462, 1, 2, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi22', 'DIA0001', 'si'),
(463, 1, 1, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi23', 'DIA0002', 'si'),
(464, 4, 2, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi24', 'DIA0003', 'si'),
(465, 2, 1, 2, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi25', 'BDO0004', 'si'),
(466, 2, 2, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi26', 'DIA0005', 'si'),
(467, 2, 1, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi27', 'DIA0006', 'si'),
(468, 1, 1, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi28', 'DIA0007', 'si'),
(469, 1, 2, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi29', 'DIA0008', 'si'),
(470, 1, 1, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi30', 'DIA0009', 'si'),
(471, 2, 1, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi31', 'DIA0010', 'si'),
(472, 3, 2, 1, 11, 5, 4, 'BNZ228PKLM', '123mdmdfi32', 'DIA0011', 'si'),
(473, 2, 2, 1, 14, 4, 3, 'xxxxx', 'cccccccc', 'DIA0012', 'si');

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
(3, 'ACCES POINT'),
(90, 'teclado'),
(96, 'control');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hisconsultas`
--

CREATE TABLE `hisconsultas` (
  `id_hcon` int(100) NOT NULL,
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
  `fecha_hcon` datetime NOT NULL,
  `id_usu` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hismantenimiento`
--

CREATE TABLE `hismantenimiento` (
  `id_hman` int(100) NOT NULL,
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
  `fecha_hman` datetime NOT NULL,
  `id_usu` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `hismantenimiento`
--

INSERT INTO `hismantenimiento` (`id_hman`, `id_ma`, `id_equi`, `id_pro`, `id_ciu`, `id_sede`, `id_ubi`, `id_con`, `fecha_man`, `estado_man`, `periodicidad_man`, `fecha_pro_man`, `costo_man`, `estado_hman`, `fecha_hman`, `id_usu`) VALUES
(117, 1, 1, 1, 11, 5, 4, 470, '2021-3-19', 'Finalizado', '6', '2020-9-19', '2000000', 'insert', '2021-10-27 00:00:00', 29),
(118, 2, 1, 2, 11, 5, 4, 465, '2021-10-27', 'Finalizado', '12', '2020-10-27', '30000000', 'insert', '2021-10-27 00:00:00', 29),
(119, 1, 1, 1, 11, 5, 4, 463, '2021-3-25', 'Finalizado', '12', '2022-3-25', '300000000', 'insert', '2021-10-27 00:00:00', 29),
(120, 1, 1, 1, 11, 5, 4, 468, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(121, 2, 1, 1, 11, 5, 4, 467, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(122, 2, 1, 1, 11, 5, 4, 471, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(123, 1, 2, 1, 11, 5, 4, 462, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(124, 1, 2, 1, 11, 5, 4, 469, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(125, 2, 2, 1, 11, 5, 4, 466, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(126, 3, 2, 1, 14, 4, 3, 461, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(127, 3, 2, 1, 11, 5, 4, 472, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(128, 2, 3, 1, 18, 4, 2, 460, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(129, 3, 3, 1, 11, 5, 4, 451, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(130, 4, 2, 1, 11, 5, 4, 464, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(131, 4, 3, 1, 9, 4, 3, 452, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(132, 4, 3, 1, 13, 3, 5, 456, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(133, 41, 3, 1, 10, 6, 7, 453, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(134, 41, 3, 1, 14, 5, 5, 455, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(135, 43, 90, 1, 16, 6, 5, 459, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(136, 44, 90, 1, 10, 5, 5, 457, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29),
(137, 41, 96, 1, 17, 4, 4, 454, '2021-10-27', 'encurso', '6', '2022-04-27', '20000', 'carga', '2021-10-27 00:00:00', 29);

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
-- Volcado de datos para la tabla `mantenimiento`
--

INSERT INTO `mantenimiento` (`id_man`, `id_ma`, `id_equi`, `id_pro`, `id_ciu`, `id_sede`, `id_ubi`, `id_con`, `fecha_man`, `estado_man`, `periodicidad_man`, `fecha_pro_man`, `costo_man`) VALUES
(455, 1, 1, 1, 11, 5, 4, 470, '2021-3-19', 'Finalizado', '6', '2021-9-19', '2000000'),
(456, 2, 1, 2, 11, 5, 4, 465, '2021-10-27', 'Finalizado', '12', '2022-10-27', '30000000'),
(457, 1, 1, 1, 11, 5, 4, 463, '2021-3-25', 'Finalizado', '12', '2022-3-25', '300000000'),
(458, 1, 1, 1, 11, 5, 4, 468, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(459, 2, 1, 1, 11, 5, 4, 467, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(460, 2, 1, 1, 11, 5, 4, 471, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(461, 1, 2, 1, 11, 5, 4, 462, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(462, 1, 2, 1, 11, 5, 4, 469, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(463, 2, 2, 1, 11, 5, 4, 466, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(464, 3, 2, 1, 14, 4, 3, 461, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(465, 3, 2, 1, 11, 5, 4, 472, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(466, 2, 3, 1, 18, 4, 2, 460, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(467, 3, 3, 1, 11, 5, 4, 451, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(468, 4, 2, 1, 11, 5, 4, 464, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(469, 4, 3, 1, 9, 4, 3, 452, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(470, 4, 3, 1, 13, 3, 5, 456, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(471, 41, 3, 1, 10, 6, 7, 453, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(472, 41, 3, 1, 14, 5, 5, 455, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(473, 43, 90, 1, 16, 6, 5, 459, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(474, 44, 90, 1, 10, 5, 5, 457, '2021-10-27', 'encurso', '6', '2022-04-27', '20000'),
(475, 41, 96, 1, 17, 4, 4, 454, '2021-10-27', 'encurso', '6', '2022-04-27', '20000');

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
(4, 'D-LINK1'),
(41, 'colermaster'),
(42, 'samsung'),
(43, 'asus'),
(44, 'portatil');

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
(1, 'DIAN', '80019726841'),
(2, 'BDO', '1234567890876'),
(3, 'Contraloria', '123567890'),
(4, 'WOM', '123456789'),
(108, 'vision software', '1073680979'),
(109, 'perro vete', '1073680979'),
(110, 'fdsfdsfsdfds', '3211312312'),
(111, 'sadsnajkdnaskjdnasjk', '2132123132131'),
(112, 'asfasdfsdfsdfsd', '12333333333'),
(113, 'dsfgfdgdfgdfgfdgdfgdf', '1232131231231232'),
(114, 'ddsfdsfsfsdfsdfd', '123123213131232');

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
(1, 15, 2, 'calle 100 sura prepagada', 'Carrea 20 N 30 - 55'),
(2, 15, 1, 'Sede 68', 'Calle 68 - 20 50'),
(3, 82, 1, 'Sede Poblado', 'Carrera 50 N 20 - 35'),
(4, 13, 4, 'Sede Palmas', 'Carrera 13 N 50 25'),
(5, 15, 3, 'Sede Edificio Inter', 'Calle 20 50 A 40'),
(6, 8, 4, 'Centro', 'Calle 20 N 50 - 25'),
(18, 4, 2, 'Banco deoccidente', 'Cra 13 No 18-31'),
(22, 3, 2, 'banco de Occidente', 'Cra 10 No 18-31'),
(23, 3, 4, 'Martires', 'Cra 10 No 12-99');

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
(29, 'edisson Andres', 'edissonalonso@gmail.com', 'bb0ccf2b1bcbe3b74bad89590c4d2fde', 'administrador', 'digitado'),
(30, 'Carolina Tavera', 'mcarotaverao@gmail.com', 'b8c32f21745a2c1091f239817785aeb6', 'usuario', 'generado'),
(36, 'rosa', 'edisson@gmail.com', 'd8b9039cfa218dbc6853da9c24e85339', 'administrador', 'digitado');

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
  ADD KEY `id_ma` (`id_ma`),
  ADD KEY `id_usu` (`id_usu`);

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
  ADD KEY `id_usu` (`id_usu`);

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
  MODIFY `id_con` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=474;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id_equi` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `hisconsultas`
--
ALTER TABLE `hisconsultas`
  MODIFY `id_hcon` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `hismantenimiento`
--
ALTER TABLE `hismantenimiento`
  MODIFY `id_hman` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  MODIFY `id_man` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=476;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id_ma` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `provedor`
--
ALTER TABLE `provedor`
  MODIFY `id_pro` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de la tabla `sede`
--
ALTER TABLE `sede`
  MODIFY `id_sede` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `id_ubi` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usu` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
  ADD CONSTRAINT `hisconsultas_ibfk_6` FOREIGN KEY (`id_ma`) REFERENCES `marca` (`id_ma`),
  ADD CONSTRAINT `hisconsultas_ibfk_7` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`);

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
  ADD CONSTRAINT `hismantenimiento_ibfk_7` FOREIGN KEY (`id_con`) REFERENCES `consultas` (`id_con`),
  ADD CONSTRAINT `hismantenimiento_ibfk_8` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`);

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
