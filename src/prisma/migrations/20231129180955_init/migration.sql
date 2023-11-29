-- CreateTable
CREATE TABLE `users` (
    `userId` VARCHAR(55) NOT NULL,
    `firstName` VARCHAR(55) NOT NULL,
    `lastName` VARCHAR(55) NOT NULL,
    `phoneNumber` VARCHAR(10) NOT NULL,
    `preNumber` VARCHAR(5) NOT NULL,
    `bio` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(60) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_images` (
    `imageId` VARCHAR(55) NOT NULL,
    `imagePath` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_contacts` (
    `contactId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `contactUserId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blocked_users` (
    `bloskedId` VARCHAR(55) NOT NULL,
    `blockerUserId` VARCHAR(55) NOT NULL,
    `blockedUserId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`bloskedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `private_chats` (
    `privateChatId` VARCHAR(55) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `cratedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`privateChatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_private_chats` (
    `id` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `privateChatId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `messageId` VARCHAR(55) NOT NULL,
    `text` VARCHAR(1000) NOT NULL,
    `senderId` VARCHAR(55) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `replyOf` VARCHAR(55) NULL,
    `mediaId` VARCHAR(55) NULL,
    `privateChatId` VARCHAR(55) NULL,
    `groupId` VARCHAR(55) NULL,

    UNIQUE INDEX `messages_mediaId_key`(`mediaId`),
    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medias` (
    `mediaId` VARCHAR(55) NOT NULL,
    `filePath` VARCHAR(255) NOT NULL,
    `fileType` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`mediaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `groupId` VARCHAR(55) NOT NULL,
    `title` VARCHAR(55) NOT NULL,
    `bio` VARCHAR(255) NOT NULL,
    `owenerId` VARCHAR(55) NOT NULL,
    `imagePath` VARCHAR(255) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups_members` (
    `member` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `groupId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`member`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins_groups` (
    `adminId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `groupId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channels` (
    `channelId` VARCHAR(55) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `bio` VARCHAR(255) NOT NULL,
    `ownerId` VARCHAR(55) NOT NULL,
    `imagePath` VARCHAR(255) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`channelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins_channels` (
    `adminId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `channelId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channels_members` (
    `memberId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `channelId` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`memberId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pinned_items` (
    `itemId` VARCHAR(55) NOT NULL,
    `userId` VARCHAR(55) NOT NULL,
    `privateChatId` VARCHAR(55) NULL,
    `groupId` VARCHAR(55) NULL,
    `channelId` VARCHAR(55) NULL,
    `messageId` VARCHAR(55) NULL,

    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_images` ADD CONSTRAINT `user_images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_contacts` ADD CONSTRAINT `user_contacts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_contacts` ADD CONSTRAINT `user_contacts_contactUserId_fkey` FOREIGN KEY (`contactUserId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blocked_users` ADD CONSTRAINT `blocked_users_blockerUserId_fkey` FOREIGN KEY (`blockerUserId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blocked_users` ADD CONSTRAINT `blocked_users_blockedUserId_fkey` FOREIGN KEY (`blockedUserId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_private_chats` ADD CONSTRAINT `user_private_chats_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_private_chats` ADD CONSTRAINT `user_private_chats_privateChatId_fkey` FOREIGN KEY (`privateChatId`) REFERENCES `private_chats`(`privateChatId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_replyOf_fkey` FOREIGN KEY (`replyOf`) REFERENCES `messages`(`messageId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `medias`(`mediaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_privateChatId_fkey` FOREIGN KEY (`privateChatId`) REFERENCES `private_chats`(`privateChatId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_owenerId_fkey` FOREIGN KEY (`owenerId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_members` ADD CONSTRAINT `groups_members_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_members` ADD CONSTRAINT `groups_members_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins_groups` ADD CONSTRAINT `admins_groups_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins_groups` ADD CONSTRAINT `admins_groups_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels` ADD CONSTRAINT `channels_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins_channels` ADD CONSTRAINT `admins_channels_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admins_channels` ADD CONSTRAINT `admins_channels_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `channels`(`channelId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels_members` ADD CONSTRAINT `channels_members_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `channels_members` ADD CONSTRAINT `channels_members_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `channels`(`channelId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pinned_items` ADD CONSTRAINT `pinned_items_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pinned_items` ADD CONSTRAINT `pinned_items_privateChatId_fkey` FOREIGN KEY (`privateChatId`) REFERENCES `private_chats`(`privateChatId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pinned_items` ADD CONSTRAINT `pinned_items_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pinned_items` ADD CONSTRAINT `pinned_items_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `channels`(`channelId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pinned_items` ADD CONSTRAINT `pinned_items_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`messageId`) ON DELETE SET NULL ON UPDATE CASCADE;
