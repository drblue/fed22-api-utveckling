-- AlterTable
ALTER TABLE `Author` ADD COLUMN `birthdate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Book` ADD COLUMN `isbn` VARCHAR(191) NULL;
