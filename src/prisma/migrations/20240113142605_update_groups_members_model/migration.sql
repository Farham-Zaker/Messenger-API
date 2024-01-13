/*
  Warnings:

  - The primary key for the `groups_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member` on the `groups_members` table. All the data in the column will be lost.
  - The required column `memberId` was added to the `groups_members` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `groups_members` DROP PRIMARY KEY,
    DROP COLUMN `member`,
    ADD COLUMN `memberId` VARCHAR(55) NOT NULL,
    ADD PRIMARY KEY (`memberId`);
