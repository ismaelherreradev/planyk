ALTER TABLE `planyk_list` ADD `list_id` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `planyk_list_list_id_unique` ON `planyk_list` (`list_id`);