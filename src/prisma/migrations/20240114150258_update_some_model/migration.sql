/*
  Warnings:

  - You are about to drop the `admins_groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `admins_groups` DROP FOREIGN KEY `admins_groups_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `admins_groups` DROP FOREIGN KEY `admins_groups_userId_fkey`;

-- DropTable
DROP TABLE `admins_groups`;

-- CreateTable
CREATE TABLE `groups_admins` (
    `adminId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `groupId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `groups_admins` ADD CONSTRAINT `groups_admins_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_admins` ADD CONSTRAINT `groups_admins_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;
