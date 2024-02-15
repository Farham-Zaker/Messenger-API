/*
  Warnings:

  - You are about to drop the column `mediaId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `messageId` to the `medias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `medias` DROP FOREIGN KEY `medias_mediaId_fkey`;

-- DropIndex
DROP INDEX `messages_mediaId_key` ON `messages`;

-- AlterTable
ALTER TABLE `medias` ADD COLUMN `messageId` VARCHAR(55) NOT NULL;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `mediaId`;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`messageId`) ON DELETE RESTRICT ON UPDATE CASCADE;
