/*
  Warnings:

  - You are about to drop the column `cratedAt` on the `private_chats` table. All the data in the column will be lost.
  - You are about to drop the `user_private_chats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user1Id` to the `private_chats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `private_chats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_private_chats` DROP FOREIGN KEY `user_private_chats_privateChatId_fkey`;

-- DropForeignKey
ALTER TABLE `user_private_chats` DROP FOREIGN KEY `user_private_chats_userId_fkey`;

-- AlterTable
ALTER TABLE `private_chats` DROP COLUMN `cratedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user1Id` VARCHAR(55) NOT NULL,
    ADD COLUMN `user2Id` VARCHAR(55) NOT NULL;

-- DropTable
DROP TABLE `user_private_chats`;

-- AddForeignKey
ALTER TABLE `private_chats` ADD CONSTRAINT `private_chats_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `private_chats` ADD CONSTRAINT `private_chats_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
