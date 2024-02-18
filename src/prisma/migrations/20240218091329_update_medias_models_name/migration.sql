/*
  Warnings:

  - You are about to drop the `medias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_channelId_fkey`;

-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_messageId_fkey`;

-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_privateChatId_fkey`;

-- DropTable
DROP TABLE `medias`;

-- CreateTable
CREATE TABLE `media` (
    `mediaId` VARCHAR(55) NOT NULL,
    `filePath` VARCHAR(255) NOT NULL,
    `fileType` VARCHAR(10) NOT NULL,
    `messageId` VARCHAR(55) NULL,
    `privateChatId` VARCHAR(55) NULL,
    `groupId` VARCHAR(55) NULL,
    `channelId` VARCHAR(55) NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`mediaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`messageId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_privateChatId_fkey` FOREIGN KEY (`privateChatId`) REFERENCES `private_chats`(`privateChatId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `channels`(`channelId`) ON DELETE SET NULL ON UPDATE CASCADE;
