-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_mediaId_fkey`;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `messages`(`mediaId`) ON DELETE RESTRICT ON UPDATE CASCADE;
