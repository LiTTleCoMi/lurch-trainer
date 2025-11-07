import { Actions } from './binds.interface';

export interface StrafeDirections {
	direction1: Actions[][];
	direction2: Actions[][];
}

export interface StrafeItem {
	name: string;
	directions: StrafeDirections;
}

export type StrafeInterface = StrafeItem[];
