import { inject, Injectable } from '@angular/core';
import { StrafesService } from './strafes.service';
import { InputService } from './input.service';
import { Action, BoundAction, InputType } from '../interfaces/actions.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { Direction, StrafeStep } from '../interfaces/strafes.interface';

export interface TrainerState {
	shouldBePressed: BoundAction[];
	shouldBeReleased: BoundAction[];
	currentStepInputs: BoundAction[];
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
		currentStepInputs: [],
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
	private currentDirectionIndex = 0;
	private currentDirection = this.selectedStrafe.directions[this.currentDirectionIndex];
	private prevStep?: StrafeStep;
	private currentStepIndex = 0;
	private currentStep = this.currentDirection[this.currentStepIndex];

	private lastLurchDir: Direction | null = null;

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
		this.currentDirectionIndex = 0;
		this.currentDirection = this.selectedStrafe.directions[this.currentDirectionIndex];
		this.prevStep = undefined;
		this.currentStepIndex = 0;
		this.currentStep = this.currentDirection[this.currentStepIndex];
	}

	private updateActivatedActions(actions: BoundAction[]) {
		this.prevActivatedActions = structuredClone(this.activatedActions);
		this.activatedActions = structuredClone(actions);
		this.lastLurchDir = this.getLurchDirection();
		if (!this.lastLurchDir) return;
		this._lurchDir.next(this.lastLurchDir);
		if (this.training) {
			this.advanceWhileMatched();
		}
	}

	private advanceStep() {
		console.log('Advancing...');
		this.prevStep = structuredClone(this.currentStep);
		this.currentStepIndex++;
		if (this.currentStepIndex >= this.currentDirection.length) {
			this.currentDirectionIndex++;
			if (this.currentDirectionIndex >= this.selectedStrafe.directions.length) {
				this.currentDirectionIndex = 0;
			}
			this.currentDirection = this.selectedStrafe.directions[this.currentDirectionIndex];
			this.currentStepIndex = 0;
		}
		this.currentStep = this.currentDirection[this.currentStepIndex];
		this.updateStepDifferences();
		this._state.next({
			shouldBePressed: this.shouldBePressed,
			shouldBeReleased: this.shouldBeReleased,
			currentStepInputs: this.currentStep.suggestedInputs,
		});
	}

	private advanceWhileMatched() {
		while (this.isStepMatched()) {
			this.advanceStep();
		}
	}

	private isStepMatched(): boolean {
		// need to add jump logic here later, currently only matches based off of lurch direction
		if (!this.lastLurchDir) return false;
		const correctDir = this.currentStep.lurchDirection;
		return this.lastLurchDir.x === correctDir.x && this.lastLurchDir.y === correctDir.y;
	}

	//
	// Helper functions
	//

	private updateStepDifferences() {
		const prevStepInputs = this.prevStep?.suggestedInputs ?? [];
		this.shouldBePressed = this.currentStep.suggestedInputs.filter(
			(next) => !prevStepInputs.some((current) => this.actionsEqual(current, next))
		);
		this.shouldBeReleased = prevStepInputs.filter(
			(current) =>
				!this.currentStep.suggestedInputs.some((next) => this.actionsEqual(current, next))
		);
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
