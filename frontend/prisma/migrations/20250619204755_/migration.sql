/*
  Warnings:

  - A unique constraint covering the columns `[userName,communityId,date]` on the table `ScheduleEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ScheduleEntry_userName_communityId_date_key" ON "ScheduleEntry"("userName", "communityId", "date");
