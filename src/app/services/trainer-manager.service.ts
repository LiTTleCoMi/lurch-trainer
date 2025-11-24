import { inject, Injectable } from '@angular/core';
import { StrafesService } from './strafes.service';
import { InputService } from './input.service';
import { Action, BoundAction, InputType } from '../interfaces/actions.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { Direction, StrafeStep } from '../interfaces/strafes.interface';

export interface TrainerState {
	shouldBePressed: BoundAction[];
	shouldBeReleased: BoundAction[];
	nextStep: BoundAction[];
	currentStep: BoundAction[];
}
interface Settings {
	jumpMethod: InputType;
	useJumps: boolean;
	useScroll: boolean;
	scrollBypassKey: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class TrainerManagerService {
	private strafesService = inject(StrafesService);
	private inputService = inject(InputService);

	private _state = new BehaviorSubject<TrainerState>({
		shouldBePressed: [],
		shouldBeReleased: [],
		nextStep: [],
		currentStep: [],
	});
	readonly state$ = this._state.asObservable();

	private prevDir: Direction = { x: 0, y: 0 };
	private _lurchDir = new BehaviorSubject<Direction>({ x: 0, y: 0 });
	lurchDir$ = this._lurchDir.asObservable();

	training = false;
	selectedStrafe = this.strafesService.strafes[0];
	private activatedActions: BoundAction[] = [];
	private prevActivatedActions: BoundAction[] = [];
	private shouldBePressed: BoundAction[] = [];
	private shouldBeReleased: BoundAction[] = [];
	private prevStepIndex: number | null = null;
	private prevStep: StrafeStep | null = null;
	private currentStepIndex = 0;
	private currentStep = this.selectedStrafe.directions[this.currentStepIndex];

	settings: Settings = {
		jumpMethod: InputType.Scroll,
		useJumps: false,
		useScroll: false,
		scrollBypassKey: false,
	};

	constructor() {
		this.inputService.activatedActions$.subscribe({
			next: (actions) => this.updateActivatedActions(actions),
		});
		this.loadSettings();
	}

	private startTraining() {
		if (!this.selectedStrafe?.directions?.length) return;
		this.shouldBePressed = [];
		this.shouldBeReleased = [];
		this.prevStep = null;
		this.prevStepIndex = null;
		this.currentStepIndex = 0;
		this.currentStep = this.selectedStrafe.directions[this.currentStepIndex];
	}

	private lurchDirection: Direction | null = null;
	private updateActivatedActions(actions: BoundAction[]) {
		this.prevActivatedActions = structuredClone(this.activatedActions);
		this.activatedActions = structuredClone(actions);
		this.lurchDirection = this.getLurchDirection();
		if (!this.lurchDirection) return;
		this._lurchDir.next(this.lurchDirection);
		if (!this.training) return;
	}

	private getLurchDirection(): Direction | null {
		const noJumpPrevActions = this.filterJumpActions(this.prevActivatedActions);
		const noJumpActions = this.filterJumpActions(this.activatedActions);

		let dir: Direction = { x: 0, y: 0 };

		for (const act of noJumpActions) {
			switch (act.action) {
				case Action.Forward:
					if (dir.y === 1) continue;
					dir.y += 1;
					break;
				case Action.Backward:
					if (dir.y === -1) continue;
					dir.y -= 1;
					break;
				case Action.Right:
					if (dir.x === 1) continue;
					dir.x += 1;
					break;
				case Action.Left:
					if (dir.x === -1) continue;
					dir.x -= 1;
					break;
			}
		}

		// if direction is null, same, or no lurch was triggered, then return null
		if (
			(dir.x === 0 && dir.y === 0) ||
			(this.prevDir.y === dir.y && this.prevDir.x === dir.x) ||
			noJumpActions.length <= noJumpPrevActions.length
		) {
			this.prevDir = structuredClone(dir);
			return null;
		}

		this.prevDir = structuredClone(dir);
		return dir;
	}

	// Helper functions

	private filterJumpActions(actions: BoundAction[]): BoundAction[] {
		return actions.filter((action) => action.action !== Action.Jump);
	}

	private actionsEqual(
		action1: BoundAction,
		action2: BoundAction,
		ignoreScroll = false
	): boolean {
		if (ignoreScroll) {
			return action1.action === action2.action;
		} else {
			return action1.action === action2.action && action1.useScroll === action2.useScroll;
		}
	}

	// ------------------------------------------------------------------------------------------------------------------

	updateSelectedStrafe(strafeName: string) {
		const strafe = this.strafesService.strafes.find((strafe) => strafe.name == strafeName);
		if (strafe) {
			this.selectedStrafe = strafe;
		} else {
			console.error("Couldn't find strafe.");
		}
	}

	toggleTraining() {
		this.training = !this.training;
		if (this.training) this.startTraining();
	}

	// settings

	private loadSettings() {
		const storedSettings = localStorage.getItem('Settings');
		if (!storedSettings) return;

		try {
			const parsed = JSON.parse(storedSettings);

			// Type guard to validate structure
			if (this.isValidSettings(parsed)) {
				this.settings = parsed;
			} else {
				console.warn('Invalid settings structure — using defaults');
			}
		} catch (e) {
			console.warn('Failed to parse settings JSON — using defaults');
		}
	}
	// Helper type guard
	private isValidSettings(value: any): value is Settings {
		if (typeof value !== 'object' || value === null) return false;

		const validJumpMethods = Object.values(InputType);
		const { jumpMethod, useJumps } = value;

		return validJumpMethods.includes(jumpMethod) && typeof useJumps === 'boolean';
	}
}
