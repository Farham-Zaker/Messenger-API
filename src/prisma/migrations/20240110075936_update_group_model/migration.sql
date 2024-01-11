/*
  Warnings:

  - You are about to drop the column `owenerId` on the `groups` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `groups` DROP FOREIGN KEY `groups_owenerId_fkey`;

-- AlterTable
ALTER TABLE `groups` DROP COLUMN `owenerId`,
    ADD COLUMN `ownerId` VARCHAR(55) NOT NULL;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
