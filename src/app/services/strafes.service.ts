import { Injectable } from '@angular/core';
import { StrafeInterface, StrafeItem } from '../interfaces/strafes.interface';

@Injectable({
	providedIn: 'root',
})
export class StrafesService {
	strafes: StrafeInterface = [
		{
			name: 'Forward RAS',
			directions: {
				direction1: [
					[{ action: 'left', useScroll: false }],
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
				direction2: [
					[{ action: 'right', useScroll: false }],
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
			},
		},
		{
			name: 'Backward RAS',
			directions: {
				direction1: [
					[{ action: 'left', useScroll: false }],
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
				direction2: [
					[{ action: 'right', useScroll: false }],
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
			},
		},
	];

	selectedStrafe: StrafeItem = this.strafes[0];

	updateSelectedStrafe(strafeName: string) {
		const strafe = this.strafes.filter((strafe) => strafe.name == strafeName);
		if (!strafe || strafe.length == 0) return;
		this.selectedStrafe = strafe[0];
		console.log(this.selectedStrafe.name);
	}
}
