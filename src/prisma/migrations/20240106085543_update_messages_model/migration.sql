-- AlterTable
ALTER TABLE `messages` ADD COLUMN `channelId` VARCHAR(55) NULL;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `channels`(`channelId`) ON DELETE SET NULL ON UPDATE CASCADE;
