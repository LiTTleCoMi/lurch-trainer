import { Injectable } from '@angular/core';
import { Strafes } from '../interfaces/strafes.interface';
import { Action } from '../interfaces/actions.interface';

@Injectable({
	providedIn: 'root',
})
export class StrafesService {
	strafes: Strafes = [
		{
			name: 'Forward Pito',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
				],
				[
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Forward Ras',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: 1, y: 0 },
							{ x: 1, y: -1 },
						],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
				[
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: -1, y: 0 },
							{ x: -1, y: -1 },
						],
						lurchDirection: { x: -1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Backward Ras',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: -1 }],
						lurchDirection: { x: -1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
				[
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: -1 }],
						lurchDirection: { x: 1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Neo (CW)',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: 1, y: 0 },
							{ x: 1, y: -1 },
						],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
				[
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: -1 }],
						lurchDirection: { x: 1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Neo (CCW)',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: -1, y: 0 },
							{ x: -1, y: -1 },
						],
						lurchDirection: { x: -1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
				[
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: -1 }],
						lurchDirection: { x: -1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Forward Raf (L → R | Single Scroll)',
			directions: [
				[
					{
						suggestedInputs: [{ action: Action.Jump, useScroll: false }],
						expectedLurchDirections: [],
						lurchDirection: null,
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [{ action: Action.Forward, useScroll: false }],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Forward Raf (R → L | Single Scroll)',
			directions: [
				[
					{
						suggestedInputs: [{ action: Action.Jump, useScroll: false }],
						expectedLurchDirections: [],
						lurchDirection: null,
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [{ action: Action.Forward, useScroll: false }],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Backward Yuki (CW)',
			directions: [
				[
					{
						suggestedInputs: [{ action: Action.Jump, useScroll: false }],
						expectedLurchDirections: [],
						lurchDirection: null,
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [{ action: Action.Backward, useScroll: false }],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: -1 }],
						lurchDirection: { x: -1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: 1, y: 0 },
							{ x: 1, y: -1 },
						],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Backward Yuki (CCW)',
			directions: [
				[
					{
						suggestedInputs: [{ action: Action.Jump, useScroll: false }],
						expectedLurchDirections: [],
						lurchDirection: null,
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [{ action: Action.Backward, useScroll: false }],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: -1 }],
						lurchDirection: { x: 1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: -1, y: 0 },
							{ x: -1, y: -1 },
						],
						lurchDirection: { x: -1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Forward Yuki (CW)',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Jump, useScroll: false },
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: -1 }],
						lurchDirection: { x: 1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Right, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
		{
			name: 'Forward Yuki (CCW)',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Jump, useScroll: false },
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: true,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: -1 }],
						lurchDirection: { x: -1, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Right, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: -1 }],
						lurchDirection: { x: 0, y: -1 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
						canSkipOver: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Forward, useScroll: true },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
						canSkipOver: true,
					},
				],
			],
		},
	];
}
