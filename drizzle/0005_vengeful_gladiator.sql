ALTER TABLE `planyk_list` ADD `task_type` text NOT NULL;--> statement-breakpoint
ALTER TABLE `planyk_list` ADD `color` text NOT NULL;--> statement-breakpoint
ALTER TABLE `planyk_list` ADD `emoji` text NOT NULL;--> statement-breakpoint
ALTER TABLE `planyk_task` DROP COLUMN `task_type`;--> statement-breakpoint
ALTER TABLE `planyk_task` DROP COLUMN `color`;--> statement-breakpoint
ALTER TABLE `planyk_task` DROP COLUMN `emoji`;