import { inject, Injectable } from '@angular/core';
import { StrafesService } from './strafes.service';
import { InputService } from './input.service';
import { BoundAction, Input } from '../interfaces/binds.interface';
import { BehaviorSubject, tap } from 'rxjs';

export interface TrainerState {
	shouldBePressed: BoundAction[];
	shouldBeReleased: BoundAction[];
	nextStep: BoundAction[];
	currentStep: BoundAction[];
}
interface Settings {
	jumpMethod: Input;
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

	private prevDir = { x: 0, y: 0 };
	private _lurchDir = new BehaviorSubject<{ x: number; y: number }>({ x: 0, y: 0 });
	lurchDir$ = this._lurchDir.asObservable();

	training = false;
	selectedStrafe = this.strafesService.strafes[0];
	private currentDirection = this.selectedStrafe.directions[0];
	private currentDirectionIndex = 0;
	private activatedActions: BoundAction[] = [];
	private prevActivatedActions: BoundAction[] = [];
	private currentStep: BoundAction[] = [];
	private nextStepIndex = 0;
	private nextStep: BoundAction[] = [];
	private shouldBePressed: BoundAction[] = [];
	private shouldBeReleased: BoundAction[] = [];

	settings: Settings = {
		jumpMethod: Input.Scroll,
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
	/** Helper type guard */
	private isValidSettings(value: any): value is Settings {
		if (typeof value !== 'object' || value === null) return false;

		const validJumpMethods = Object.values(Input);
		const { jumpMethod, useJumps } = value;

		return validJumpMethods.includes(jumpMethod) && typeof useJumps === 'boolean';
	}

	private startTraining() {
		if (!this.selectedStrafe?.directions?.length) return;
		this.currentDirection = this.selectedStrafe.directions[0];
		this.currentDirectionIndex = 0;
		this.currentStep = [];
		this.nextStepIndex = 0;
		this.updateNextStep();
		this.shouldBePressed = [];
		this.shouldBeReleased = [];
		this.updateStepDifferences();
		this.advanceWhileMatched();
	}

	private updateActivatedActions(actions: BoundAction[]) {
		// Make sure both are fully cloned (not referencing same objects)
		this.prevActivatedActions = structuredClone(this.activatedActions);
		this.activatedActions = structuredClone(actions);
		this.calculateDirection();
		if (this.training) this.advanceWhileMatched();
	}

	private calculateDirection() {
		const noJumpPrevActions = this.prevActivatedActions.filter(
			(action) => action.action !== 'jump'
		);
		const noJumpActions = this.activatedActions.filter((action) => action.action !== 'jump');

		let dir = { x: 0, y: 0 };

		for (const act of noJumpActions) {
			switch (act.action) {
				case 'forward':
					if (dir.y === 1) continue;
					dir.y += 1;
					break;
				case 'backward':
					if (dir.y === -1) continue;
					dir.y -= 1;
					break;
				case 'right':
					if (dir.x === 1) continue;
					dir.x += 1;
					break;
				case 'left':
					if (dir.x === -1) continue;
					dir.x -= 1;
					break;
			}
		}

		// if direction is null or same or no lurch was triggered don't do anything
		if (dir.x === 0 && dir.y === 0 || (this.prevDir.y === dir.y && this.prevDir.x === dir.x) || noJumpActions.length <= noJumpPrevActions.length) {
			this.prevDir = structuredClone(dir);
			return;
		}
		
		this.prevDir = structuredClone(dir);
		this._lurchDir.next(dir);
	}

	private advanceWhileMatched() {
		while (this.isStepMatched()) {
			this.advanceStep();
		}
	}

	private isStepMatched(): boolean {
		const noJumpActivatedActions = this.activatedActions.filter(
			(action) => action.action !== 'jump'
		);
		if (
			this.activatedActions.length !== this.nextStep.length &&
			noJumpActivatedActions.length !== this.nextStep.length
		)
			return false;

		return this.nextStep.every((nextAction) =>
			this.activatedActions.some((action) => {
				if (this.settings.scrollBypassKey) {
					if (action.useScroll) {
						return this.actionsEqual(action, nextAction, true);
					} else {
						return this.actionsEqual(action, nextAction);
					}
				} else {
					return this.actionsEqual(action, nextAction);
				}
			})
		);
	}

	private advanceStep() {
		this.currentStep = this.nextStep;
		this.nextStepIndex++;
		if (this.currentDirection[this.nextStepIndex]) {
			this.updateNextStep();
		} else {
			this.changeDirection();
		}
		this.updateStepDifferences();
	}

	private changeDirection() {
		this.currentDirectionIndex++;
		if (!this.selectedStrafe.directions[this.currentDirectionIndex]) {
			this.currentDirectionIndex = 0;
		}
		this.currentDirection = this.selectedStrafe.directions[this.currentDirectionIndex];
		this.nextStepIndex = 0;
		this.updateNextStep();
	}

	private updateStepDifferences() {
		this.shouldBePressed = this.nextStep.filter(
			(next) => !this.currentStep.some((current) => this.actionsEqual(current, next))
		);
		this.shouldBeReleased = this.currentStep.filter(
			(current) => !this.nextStep.some((next) => this.actionsEqual(current, next))
		);
		this.emitNextState();
	}

	private updateNextStep() {
		this.nextStep = this.currentDirection[this.nextStepIndex];
		if (this.settings.useJumps) {
			this.nextStep.forEach((action) => {
				if (action.action === 'jump') {
					action.useScroll = this.settings.jumpMethod !== Input.Key;
				}
			});
		} else {
			this.nextStep = this.nextStep.filter((action) => action.action !== 'jump');
		}
		if (!this.settings.useScroll) {
			this.nextStep = this.nextStep.filter(
				(action) => !action.useScroll || action.action === 'jump'
			);
		}
	}

	private emitNextState() {
		this._state.next({
			shouldBePressed: this.shouldBePressed,
			shouldBeReleased: this.shouldBeReleased,
			nextStep: this.nextStep,
			currentStep: this.currentStep,
		});
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
}
