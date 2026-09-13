CREATE TABLE IF NOT EXISTS "cases" (
	"id" TEXT NOT NULL PRIMARY KEY,
	"tracking_code" TEXT NOT NULL UNIQUE,
	"kind" TEXT NOT NULL,
	"channel" TEXT NOT NULL,
	"email" TEXT,
	"display_name" TEXT,
	"body" TEXT NOT NULL,
	"status" TEXT NOT NULL,
	"audio_key" TEXT,
	"created_at" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS "cases_created_at_idx" ON "cases" ("created_at");

CREATE TABLE IF NOT EXISTS "case_events" (
	"id" TEXT NOT NULL PRIMARY KEY,
	"case_id" TEXT NOT NULL REFERENCES "cases" ("id") ON DELETE CASCADE,
	"label" TEXT NOT NULL,
	"at" INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS "case_events_case_id_idx" ON "case_events" ("case_id");
