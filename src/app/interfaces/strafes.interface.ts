export interface StrafeDirections {
	direction1: string[];
	direction2: string[];
}

// Each strafe item in the array has a name and directions
export interface StrafeItem {
	name: string; // e.g., 'forward_ras'
	directions: StrafeDirections;
}

// Strafes is now an array of StrafeItem
export type StrafesInterface = StrafeItem[];
