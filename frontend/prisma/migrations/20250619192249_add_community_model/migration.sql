-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "webhook" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduleEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "timeSlots" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ScheduleEntry_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScheduleEntry" ("communityId", "createdAt", "date", "id", "timeSlots", "userName") SELECT "communityId", "createdAt", "date", "id", "timeSlots", "userName" FROM "ScheduleEntry";
DROP TABLE "ScheduleEntry";
ALTER TABLE "new_ScheduleEntry" RENAME TO "ScheduleEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
