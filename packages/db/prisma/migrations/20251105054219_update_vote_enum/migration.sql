/*
  Warnings:

  - The values [down] on the enum `VoteType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VoteType_new" AS ENUM ('Up', 'Down');
ALTER TABLE "Vote" ALTER COLUMN "type" TYPE "VoteType_new" USING ("type"::text::"VoteType_new");
ALTER TYPE "VoteType" RENAME TO "VoteType_old";
ALTER TYPE "VoteType_new" RENAME TO "VoteType";
DROP TYPE "public"."VoteType_old";
COMMIT;
