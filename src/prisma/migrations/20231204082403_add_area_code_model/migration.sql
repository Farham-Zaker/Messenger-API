/*
  Warnings:

  - You are about to drop the column `areaCode` on the `users` table. All the data in the column will be lost.
  - Added the required column `areaCodeId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `areaCode`,
    ADD COLUMN `areaCodeId` VARCHAR(55) NOT NULL;

-- CreateTable
CREATE TABLE `area_codes` (
    `areaCodeId` VARCHAR(55) NOT NULL,
    `areaCode` VARCHAR(7) NOT NULL,
    `area` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`areaCodeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_areaCodeId_fkey` FOREIGN KEY (`areaCodeId`) REFERENCES `area_codes`(`areaCodeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
