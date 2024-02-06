-- AlterTable
ALTER TABLE `medias` ADD COLUMN `channelId` VARCHAR(55) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `groupId` VARCHAR(55) NULL,
    ADD COLUMN `privateChatId` VARCHAR(55) NULL;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_privateChatId_fkey` FOREIGN KEY (`privateChatId`) REFERENCES `private_chats`(`privateChatId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `channels`(`channelId`) ON DELETE SET NULL ON UPDATE CASCADE;
