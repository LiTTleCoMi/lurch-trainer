import { Injectable } from '@angular/core';
import { StrafeInterface, StrafeItem } from '../interfaces/strafes.interface';

@Injectable({
	providedIn: 'root',
})
export class StrafesService {
	strafes: StrafeInterface = [
		{
			name: 'Forward Pito',
			directions: [
				[
					[
						{ action: 'left', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
				[
					[
						{ action: 'right', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
			],
		},
		{
			name: 'Forward RAS',
			directions: [
				[
					[
						{ action: 'left', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
				[
					[
						{ action: 'right', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
			],
		},
		{
			name: 'Backward RAS',
			directions: [
				[
					[
						{ action: 'left', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
				[
					[
						{ action: 'right', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
			],
		},
		{
			name: 'Neo (CCW)',
			directions: [
				[
					[
						{ action: 'left', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
				[
					[
						{ action: 'right', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
			],
		},
		{
			name: 'Neo (CW)',
			directions: [
				[
					[
						{ action: 'right', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
				[
					[
						{ action: 'left', useScroll: false },
						{ action: 'jump', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
			],
		},
		{
			name: 'Backward Yuki (CW)',
			directions: [
				[
					[],
					[{ action: 'jump', useScroll: false }],
					[{ action: 'backward', useScroll: false }],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
			],
		},
		{
			name: 'Backward Yuki (CCW)',
			directions: [
				[
					[],
					[{ action: 'jump', useScroll: false }],
					[{ action: 'backward', useScroll: false }],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
				],
			],
		},
		{
			name: 'Forward Yuki (CW)',
			directions: [
				[
					[
						{ action: 'jump', useScroll: false },
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'forward', useScroll: true },
						{ action: 'backward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'forward', useScroll: true },
						{ action: 'left', useScroll: false },
					],
				],
			],
		},
		{
			name: 'Forward Yuki (CCW)',
			directions: [
				[
					[
						{ action: 'jump', useScroll: false },
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
					],
					[
						{ action: 'right', useScroll: false },
						{ action: 'forward', useScroll: false },
						{ action: 'left', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'forward', useScroll: true },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
					],
					[
						{ action: 'left', useScroll: false },
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'forward', useScroll: true },
						{ action: 'backward', useScroll: false },
						{ action: 'right', useScroll: false },
					],
					[
						{ action: 'forward', useScroll: true },
						{ action: 'right', useScroll: false },
					],
				],
			],
		},
	];
}
