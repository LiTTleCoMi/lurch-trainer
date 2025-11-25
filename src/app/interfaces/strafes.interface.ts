import { BoundAction } from './actions.interface';

export type Direction = { x: -1 | 0 | 1; y: -1 | 0 | 1 };
export type StrafeStep = {
	suggestedInputs: BoundAction[];
	expectedLurchDirections: Direction[];
	lurchDirection: Direction | null;
	jump: boolean;
	canSkipOver: boolean;
};
export type StrafeDirection = StrafeStep[];
export interface StrafeItem {
	name: string;
	directions: StrafeDirection[];
}
export type Strafes = StrafeItem[];
