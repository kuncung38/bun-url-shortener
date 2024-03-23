CREATE TABLE `shortener` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`urlId` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_url` ON `shortener` (`url`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_url_id` ON `shortener` (`urlId`);