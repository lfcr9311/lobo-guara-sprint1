/*
  Warnings:

  - The values [PORTUGHESE] on the enum `LanguageEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LanguageEnum_new" AS ENUM ('PORTUGUESE', 'ENGLISH', 'SPANISH');
ALTER TABLE "users" ALTER COLUMN "language" TYPE "LanguageEnum_new" USING ("language"::text::"LanguageEnum_new");
ALTER TYPE "LanguageEnum" RENAME TO "LanguageEnum_old";
ALTER TYPE "LanguageEnum_new" RENAME TO "LanguageEnum";
DROP TYPE "LanguageEnum_old";
COMMIT;
