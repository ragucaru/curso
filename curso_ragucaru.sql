/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 100410
Source Host           : localhost:3306
Source Database       : curso_ragucaru

Target Server Type    : MYSQL
Target Server Version : 100410
File Encoding         : 65001

Date: 2021-02-27 15:01:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('1', '2014_08_12_000000_create_users_table', '1');
INSERT INTO `migrations` VALUES ('2', '2014_08_12_100000_create_password_resets_table', '1');
INSERT INTO `migrations` VALUES ('3', '2018_08_29_200340_create_permissions_table', '1');
INSERT INTO `migrations` VALUES ('4', '2018_09_04_141341_create_roles_table', '1');
INSERT INTO `migrations` VALUES ('5', '2018_09_04_143017_create_role_user_table', '1');
INSERT INTO `migrations` VALUES ('6', '2018_09_04_143834_create_permission_role_table', '1');
INSERT INTO `migrations` VALUES ('7', '2018_10_01_201653_create_permission_user_table', '1');

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `is_super` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('1z9Sv2fC1ALXdM80L0QHs9c3HLDoAOO8', 'Crear Roles', 'SEGURIDAD/ROLES', '0', null, null, null);
INSERT INTO `permissions` VALUES ('G8aCoYYCgE8fAwegn0MvWjxMXhxIIrhy', 'Seleccionar Permiso', 'SEGURIDAD/PERMISOS', '0', null, null, null);
INSERT INTO `permissions` VALUES ('lJFsnYJCnFcVPVBBUOQrmlv3b6Y2X2ZE', 'Crear Usuarios', 'ADMIN/USUARIOS', '0', null, null, null);
INSERT INTO `permissions` VALUES ('m0D4LIsO7V79aDueMDjgWGOmp8mPW6c0', 'Seleccionar Rol', 'SEGURIDAD/ROLES', '0', null, null, null);
INSERT INTO `permissions` VALUES ('n5TraVIrRoioG1kqdHsIaZLYDvxO8MFD', 'Eliminar Usuarios', 'ADMIN/USUARIOS', '0', null, null, null);
INSERT INTO `permissions` VALUES ('nrPqEhq2TX0mI7qT7glaOCJ7Iqx2QtPs', 'Ver Roles', 'SEGURIDAD/ROLES', '0', null, null, null);
INSERT INTO `permissions` VALUES ('nTSk4Y4SFKMyQmRD4ku0UCiNWIDe8OEt', 'Ver Usuarios', 'ADMIN/USUARIOS', '0', null, null, null);
INSERT INTO `permissions` VALUES ('QpKVz00WUbZVJMPFu3iBNGBTdMFYubQ2', 'Eliminar Roles', 'SEGURIDAD/ROLES', '0', null, null, null);
INSERT INTO `permissions` VALUES ('RGMUpFAiRuv7UFoJroHP6CtvmpoFlQXl', 'CRUD Permisos', 'SEGURIDAD/PERMISOS', '1', null, null, null);
INSERT INTO `permissions` VALUES ('v216XcAzgbt4mIjj6gZP2rdRTupXz0AO', 'Editar Roles', 'SEGURIDAD/ROLES', '0', null, null, null);
INSERT INTO `permissions` VALUES ('W8Xmv3hiIyIpkZfJMaL9MsRxxuSIiO5R', 'Editar Usuarios', 'ADMIN/USUARIOS', '0', null, null, null);

-- ----------------------------
-- Table structure for permission_role
-- ----------------------------
DROP TABLE IF EXISTS `permission_role`;
CREATE TABLE `permission_role` (
  `role_id` bigint(20) unsigned NOT NULL,
  `permission_id` varchar(255) NOT NULL,
  KEY `permission_role_role_id_foreign` (`role_id`),
  KEY `permission_role_permission_id_foreign` (`permission_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permission_role
-- ----------------------------
INSERT INTO `permission_role` VALUES ('1', '1z9Sv2fC1ALXdM80L0QHs9c3HLDoAOO8');
INSERT INTO `permission_role` VALUES ('1', 'G8aCoYYCgE8fAwegn0MvWjxMXhxIIrhy');
INSERT INTO `permission_role` VALUES ('1', 'lJFsnYJCnFcVPVBBUOQrmlv3b6Y2X2ZE');
INSERT INTO `permission_role` VALUES ('1', 'm0D4LIsO7V79aDueMDjgWGOmp8mPW6c0');
INSERT INTO `permission_role` VALUES ('1', 'n5TraVIrRoioG1kqdHsIaZLYDvxO8MFD');
INSERT INTO `permission_role` VALUES ('1', 'nrPqEhq2TX0mI7qT7glaOCJ7Iqx2QtPs');
INSERT INTO `permission_role` VALUES ('1', 'nTSk4Y4SFKMyQmRD4ku0UCiNWIDe8OEt');
INSERT INTO `permission_role` VALUES ('1', 'QpKVz00WUbZVJMPFu3iBNGBTdMFYubQ2');
INSERT INTO `permission_role` VALUES ('1', 'RGMUpFAiRuv7UFoJroHP6CtvmpoFlQXl');

-- ----------------------------
-- Table structure for permission_user
-- ----------------------------
DROP TABLE IF EXISTS `permission_user`;
CREATE TABLE `permission_user` (
  `permission_id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `status` tinyint(1) NOT NULL,
  KEY `permission_user_user_id_foreign` (`user_id`),
  KEY `permission_user_permission_id_foreign` (`permission_id`),
  CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `permission_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permission_user
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roles_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'ADMIN-USUARIOS', '2019-10-03 19:11:15', '2019-10-03 19:11:15', null);

-- ----------------------------
-- Table structure for role_user
-- ----------------------------
DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user` (
  `role_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  KEY `role_user_role_id_foreign` (`role_id`),
  KEY `role_user_user_id_foreign` (`user_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_user
-- ----------------------------
INSERT INTO `role_user` VALUES ('1', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL DEFAULT 0,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'root', '$2y$10$7iVG1xjg7BU7aLc9U4IA3uzuU8nloCSbxkJCNbH220KBhSComoaiK', 'Usuario Root', 'root@localhost', '1', '/assets/avatars/50-king.svg', null, null, '2021-02-27 20:43:31', '2021-02-27 20:43:31', null);
SET FOREIGN_KEY_CHECKS=1;
