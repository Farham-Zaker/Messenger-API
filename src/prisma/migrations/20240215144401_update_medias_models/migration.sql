-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_messageId_fkey`;

-- AlterTable
ALTER TABLE `medias` MODIFY `messageId` VARCHAR(55) NULL;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`messageId`) ON DELETE SET NULL ON UPDATE CASCADE;
