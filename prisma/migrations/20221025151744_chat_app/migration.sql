/*
  Warnings:

  - The primary key for the `Scores` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Scores` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_Scores" ("date", "score", "username") SELECT "date", "score", "username" FROM "Scores";
DROP TABLE "Scores";
ALTER TABLE "new_Scores" RENAME TO "Scores";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
