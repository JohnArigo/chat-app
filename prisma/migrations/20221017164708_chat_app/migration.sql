/*
  Warnings:

  - Added the required column `page_name` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Messages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "user_image" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "page_name" TEXT NOT NULL
);
INSERT INTO "new_Messages" ("id", "message", "user_image", "username") SELECT "id", "message", "user_image", "username" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
