export interface SkillItem {
	name: string;
	icon: string; // Iconify icon name
	level: "beginner" | "intermediate" | "advanced" | "expert";
	description: string;
	category: "frontend" | "backend" | "database" | "tools" | "other";
	experience?: {
		years: number;
		months: number;
	};
}
