-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TEXT NOT NULL
);
INSERT INTO "new_Scores" ("date", "id", "score", "username") SELECT "date", "id", "score", "username" FROM "Scores";
DROP TABLE "Scores";
ALTER TABLE "new_Scores" RENAME TO "Scores";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
