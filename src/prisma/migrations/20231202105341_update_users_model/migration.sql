/*
  Warnings:

  - You are about to drop the column `preNumber` on the `users` table. All the data in the column will be lost.
  - Added the required column `areaCode` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `preNumber`,
    ADD COLUMN `areaCode` VARCHAR(5) NOT NULL;
