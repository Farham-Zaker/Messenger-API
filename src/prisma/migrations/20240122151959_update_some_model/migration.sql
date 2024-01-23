/*
  Warnings:

  - You are about to drop the `admins_channels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `admins_channels` DROP FOREIGN KEY `admins_channels_channelId_fkey`;

-- DropForeignKey
ALTER TABLE `admins_channels` DROP FOREIGN KEY `admins_channels_userId_fkey`;

-- AlterTable
ALTER TABLE `channels_members` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `groups_admins` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `groups_members` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `admins_channels`;

-- CreateTable
CREATE TABLE `channels_admins` (
    `adminId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `channelId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `channels_admins` ADD CONSTRAINT `channels_admins_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels_admins` ADD CONSTRAINT `channels_admins_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `channels`(`channelId`) ON DELETE RESTRICT ON UPDATE CASCADE;
