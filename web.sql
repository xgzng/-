/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : web

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 21/02/2022 20:57:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for guize
-- ----------------------------
DROP TABLE IF EXISTS `guize`;
CREATE TABLE `guize`  (
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role_id` int(255) NOT NULL,
  `renshu` int(255) NULL DEFAULT NULL,
  `jieshutime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of guize
-- ----------------------------
INSERT INTO `guize` VALUES ('2021-12-13 03:00', 12, 1, '2021-12-31 13:00');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `menu_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `url` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标',
  `parent_id` int(5) NOT NULL DEFAULT 0 COMMENT '父栏目ID',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
  `visible` tinyint(1) NULL DEFAULT 1 COMMENT '是否可见',
  `open` tinyint(1) NULL DEFAULT 1 COMMENT '1',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '', '系统功能', 'layui-icon-set', 0, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (2, '/admin/menu/index', '菜单管理', '', 1, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (3, '/admin/role/index', '角色管理', '', 1, 3, 1, 1);
INSERT INTO `sys_menu` VALUES (4, '/admin/user/index', '用户管理', '', 1, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (18, '/teacher/timuguanli/xuantiguanli', '选题管理', '', 20, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (12, '', '题目管理(student)', 'layui-icon-more', 0, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (13, '/student/timuguanli/xuantiguanli', '选题管理', '', 12, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (14, '/student/timuguanli/wodexuanti', '我的选题', '', 12, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (15, '', '系统设置(student)', 'layui-icon-set-fill', 0, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (16, '/student/xitongshezhi/gerenxinxi', '个人信息', '', 15, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (17, '/student/xitongshezhi/mimaguanli', '密码管理', '', 15, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (19, '/teacher/timuguanli/wodetimu', '我的题目', '', 20, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (20, '', '题目管理(teacher)', 'layui-icon-more', 0, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (21, '', '系统设置(teacher)', 'layui-icon-set-fill', 0, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (22, '', '题目管理(admin)', 'layui-icon-more', 0, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (23, '', '系统设置(admin)', 'layui-icon-set-fill', 0, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (24, '/teacher/xitongshezhi/gerenxinxi', '个人信息', '', 21, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (25, '/teacher/xitongshezhi/mimaguanli', '密码管理', '', 21, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (26, '/guanli/xitongshezhi/zidianshezhi', '字典设置', '', 23, 3, 1, 1);
INSERT INTO `sys_menu` VALUES (27, '/guanli/xitongshezhi/canshushezhi', '参数设置', '', 23, 4, 1, 1);
INSERT INTO `sys_menu` VALUES (28, '/guanli/timuguanli/xuantiguanli', '选题管理', '', 22, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (30, '/guanli/xitongshezhi/gerenxinxi', '个人信息', '', 23, 1, 1, 1);
INSERT INTO `sys_menu` VALUES (31, '/guanli/xitongshezhi/mimaguanli', '密码管理', '', 23, 2, 1, 1);
INSERT INTO `sys_menu` VALUES (32, '/guanli/user/index', '用户管理', '', 23, 5, 1, 1);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `menus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'admin', '1,2,3,4,12,13,14,15,16,17,20,18,19,21,24,25,22,28,29,23,26,27,30,31,32,');
INSERT INTO `sys_role` VALUES (2, '老师', 'teacher', '20,18,19,21,24,25,');
INSERT INTO `sys_role` VALUES (11, '学生', 'student', '12,13,14,15,16,17,');
INSERT INTO `sys_role` VALUES (12, '一级管理员', 'admin1', '22,28,23,26,27,30,31,32,');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(70) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `role_id` mediumint(8) NULL DEFAULT NULL COMMENT '分组ID',
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `gender` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话号码',
  `login_time` int(11) NULL DEFAULT NULL COMMENT '最后登录时间',
  `status` tinyint(2) NULL DEFAULT 1 COMMENT '状态',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `online` int(11) NULL DEFAULT NULL,
  `zhicheng` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `chushengnianyue` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `xueli` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `user_username`(`username`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 101 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, '1', 'c4ca4238a0b923820dcc509a6f75849b', 1, '5', '超管', '男', '24', 1640578943, 1, '/uploads/20211129/7feed79ef747decb513f5db6694e786f.jpg', 0, '1', '2021-12-06', '4');
INSERT INTO `sys_user` VALUES (95, 'xuesheng1', 'c4ca4238a0b923820dcc509a6f75849b', 11, NULL, '学生1', '', NULL, 1640760100, 1, NULL, 1, NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES (96, 'xuesheng2', 'c4ca4238a0b923820dcc509a6f75849b', 11, NULL, '学生2', '', NULL, 1640766685, 1, NULL, 0, NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES (97, 'laoshi1', 'c4ca4238a0b923820dcc509a6f75849b', 2, NULL, '老师1', '', NULL, 1640766863, 1, NULL, 0, NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES (83, 'guanli', 'c4ca4238a0b923820dcc509a6f75849b', 12, '999', '管理', '', '139', 1640775586, 1, '', 0, NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES (98, 'laoshi2', 'c4ca4238a0b923820dcc509a6f75849b', 2, NULL, '老师2', '', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES (100, 'xuesheng4', 'c4ca4238a0b923820dcc509a6f75849b', 11, NULL, '学生4', '', NULL, 1640698378, 1, NULL, 0, NULL, NULL, NULL);
INSERT INTO `sys_user` VALUES (99, 'xuesheng3', 'c4ca4238a0b923820dcc509a6f75849b', 11, NULL, '学生3', '', NULL, 1640766711, 1, NULL, 0, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for timu
-- ----------------------------
DROP TABLE IF EXISTS `timu`;
CREATE TABLE `timu`  (
  `timu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `zhidaolaoshi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `timuleixing` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `xuantiqingkuang` int(255) NULL DEFAULT NULL,
  `shenhezhuangtai` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `timu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `jujueyuanyin` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `yitongyi` int(255) NULL DEFAULT NULL,
  `xuantiren` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `chutitime` timestamp(0) NULL DEFAULT NULL,
  `juti` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`timu_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of timu
-- ----------------------------
INSERT INTO `timu` VALUES ('商品管理系统', '97', '10', 0, '同意', '2021122875014', '', NULL, '', '2021-12-28 21:58:17', '');
INSERT INTO `timu` VALUES ('美食管理', '97', '10', 1, '同意', '2021122912424', '', 1, ',99', '2021-12-29 16:29:06', '');

-- ----------------------------
-- Table structure for timu_type
-- ----------------------------
DROP TABLE IF EXISTS `timu_type`;
CREATE TABLE `timu_type`  (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of timu_type
-- ----------------------------
INSERT INTO `timu_type` VALUES (10, '工程型');
INSERT INTO `timu_type` VALUES (11, '论文型');

-- ----------------------------
-- Table structure for xuanti
-- ----------------------------
DROP TABLE IF EXISTS `xuanti`;
CREATE TABLE `xuanti`  (
  `student` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `timu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `shenhezhuangtai` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `xuanti_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`xuanti_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xuanti
-- ----------------------------
INSERT INTO `xuanti` VALUES ('99', '2021122912424', '同意', '2', '2021122967766');
INSERT INTO `xuanti` VALUES ('96', '2021122912424', '自动拒绝', '0', '2021122911241');
INSERT INTO `xuanti` VALUES ('95', '2021122875014', '自己退选', '1', '2021122932926');

-- ----------------------------
-- Table structure for xuantishu
-- ----------------------------
DROP TABLE IF EXISTS `xuantishu`;
CREATE TABLE `xuantishu`  (
  `student` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `geshu` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`student`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xuantishu
-- ----------------------------
INSERT INTO `xuantishu` VALUES ('99', 1);
INSERT INTO `xuantishu` VALUES ('96', 0);
INSERT INTO `xuantishu` VALUES ('95', 0);

-- ----------------------------
-- Table structure for xueli
-- ----------------------------
DROP TABLE IF EXISTS `xueli`;
CREATE TABLE `xueli`  (
  `xueli_id` int(11) NOT NULL AUTO_INCREMENT,
  `xueli_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`xueli_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xueli
-- ----------------------------
INSERT INTO `xueli` VALUES (5, '博士');
INSERT INTO `xueli` VALUES (4, '硕士');

-- ----------------------------
-- Table structure for zhicheng
-- ----------------------------
DROP TABLE IF EXISTS `zhicheng`;
CREATE TABLE `zhicheng`  (
  `zhicheng_id` int(11) NOT NULL AUTO_INCREMENT,
  `zhicheng_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`zhicheng_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zhicheng
-- ----------------------------
INSERT INTO `zhicheng` VALUES (1, '教授');
INSERT INTO `zhicheng` VALUES (3, '副教授');
INSERT INTO `zhicheng` VALUES (4, '讲师');

SET FOREIGN_KEY_CHECKS = 1;
