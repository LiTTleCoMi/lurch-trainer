import { BoundAction } from './binds.interface';

export type StrafeInputs = BoundAction[][];

export interface StrafeItem {
	name: string;
	directions: StrafeInputs[];
}

export type StrafeInterface = StrafeItem[];
