-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-11-2020 a las 03:41:37
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` datetime NOT NULL DEFAULT current_timestamp(),
  `id_estado` int(1) NOT NULL,
  `id_pago` int(1) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `fecha_pedido`, `id_estado`, `id_pago`, `id_usuario`) VALUES
(11, '2020-11-15 23:23:08', 2, 1, 2),
(12, '2020-11-17 05:11:52', 1, 2, 2),
(14, '2020-11-17 05:14:42', 3, 1, 1),
(15, '2020-11-19 01:59:36', 1, 1, 9),
(16, '2020-11-19 01:59:46', 1, 1, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_detalles`
--

CREATE TABLE `pedido_detalles` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_detalles`
--

INSERT INTO `pedido_detalles` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad_producto`) VALUES
(1, 11, 1, 4),
(2, 11, 8, 3),
(3, 12, 9, 2),
(4, 13, 4, 2),
(5, 13, 1, 1),
(6, 14, 4, 2),
(7, 14, 1, 1),
(8, 15, 10, 1),
(9, 16, 9, 1),
(10, 16, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_estados`
--

CREATE TABLE `pedido_estados` (
  `id_estado` int(1) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_estados`
--

INSERT INTO `pedido_estados` (`id_estado`, `estado`) VALUES
(1, 'Nuevo'),
(2, 'Confirmado'),
(3, 'Preparando'),
(4, 'Enviando'),
(5, 'Entregado'),
(6, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_tiposdepagos`
--

CREATE TABLE `pedido_tiposdepagos` (
  `id_pago` int(1) NOT NULL,
  `tipo_pago` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido_tiposdepagos`
--

INSERT INTO `pedido_tiposdepagos` (`id_pago`, `tipo_pago`) VALUES
(1, 'Efectivo'),
(2, 'Tarjeta de Crédito / Débito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(400) NOT NULL,
  `precio` int(10) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `imagen`) VALUES
(1, 'Lomito completo', 'Sandwich de lomito con queso, jamon, tomate y lechuga. Viene con papas.', 400, 'lomito.jpg'),
(2, 'Hamburguesa de carne completa', 'Hamburguesa de carne con queso, jamon, tomate y lechuga. Viene con papas', 300, 'hamburguesa.jpg'),
(4, 'Sandwich Veggie Tofu', 'Sandwich de tofu con queso, lechuga y tomate', 250, 'sandwichveggie.jpg'),
(8, 'Hamburguesa veggie completa', 'Hamburguesa veggie con queso, jamon, tomate y lechuga. Viene con papas', 300, 'hamburguesa.jpg'),
(9, 'Bagel de salmon', 'Bagel de salmon con queso y palta. Viene con papas', 380, 'bagel_salmon.jpg'),
(10, 'Bagel Veggie', 'Bagel veggie de tofu con queso y palta. Viene con papas', 370, 'bagel_veggie.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `nombre_apellido` varchar(300) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` int(100) NOT NULL,
  `direccion_envio` varchar(300) NOT NULL,
  `pw` varchar(100) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `nombre_apellido`, `email`, `telefono`, `direccion_envio`, `pw`, `admin`) VALUES
(1, 'antobayugar', 'antonella bayugar', 'anto@email.com', 1144444444, 'calle falsa 123, san isidro', '123456', 1),
(2, 'pribrey', 'priscila brey', 'pri@email.com', 1188888888, 'calle falsa 123, san isidro', '123456', 0),
(9, 'nikinicole', 'nicole bayugar', 'nicole@email.com', 1144443333, 'calle falsa 123, san isidro', 'nicole1234', 0),
(10, 'sofiacin', 'sofia acin tallier', 'sofi@email.com', 1144443333, 'calle falsa 123, san isidro', 'sofi1234', 0),
(12, 'salvador', 'salvador bayugar', 'salvi@email.com', 1144443333, 'calle falsa 123, san isidro', 'salvi1234', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `pedido_detalles`
--
ALTER TABLE `pedido_detalles`
  ADD PRIMARY KEY (`id_detalle`);

--
-- Indices de la tabla `pedido_estados`
--
ALTER TABLE `pedido_estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `pedido_tiposdepagos`
--
ALTER TABLE `pedido_tiposdepagos`
  ADD PRIMARY KEY (`id_pago`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `pedido_detalles`
--
ALTER TABLE `pedido_detalles`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `pedido_estados`
--
ALTER TABLE `pedido_estados`
  MODIFY `id_estado` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedido_tiposdepagos`
--
ALTER TABLE `pedido_tiposdepagos`
  MODIFY `id_pago` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
