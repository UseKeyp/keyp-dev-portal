/*
  Warnings:

  - You are about to drop the column `mfa_enabled` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mintCredits` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mfa_enabled",
DROP COLUMN "mintCredits";
