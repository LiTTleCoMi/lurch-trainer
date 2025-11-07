import { BoundAction } from './binds.interface';

export interface StrafeDirections {
	direction1: BoundAction[][];
	direction2: BoundAction[][];
}

export interface StrafeItem {
	name: string;
	directions: StrafeDirections;
}

export type StrafeInterface = StrafeItem[];
