import { inject, Injectable } from '@angular/core';
import { StrafesService } from './strafes.service';
import { InputService } from './input.service';
import { BoundAction, Input } from '../interfaces/binds.interface';
import { BehaviorSubject } from 'rxjs';

export interface TrainerState {
	shouldBePressed: BoundAction[];
	shouldBeReleased: BoundAction[];
	nextStep: BoundAction[];
	currentStep: BoundAction[];
}
interface Settings {
	jumpMethod: Input;
	useJumps: boolean;
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

	training = false;
	selectedStrafe = this.strafesService.strafes[0];
	private currentDirection = this.selectedStrafe.directions[0];
	private currentDirectionIndex = 0;
	private activatedActions: BoundAction[] = [];
	private currentStep: BoundAction[] = [];
	private nextStepIndex = 0;
	private nextStep: BoundAction[] = [];
	private shouldBePressed: BoundAction[] = [];
	private shouldBeReleased: BoundAction[] = [];

	settings: Settings = {
		jumpMethod: Input.Scroll,
		useJumps: false,
	};

	constructor() {
		this.inputService.activatedActions$.subscribe({
			next: (actions) => this.updateActivatedActions(actions),
		});
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
		this.activatedActions = actions;
		if (this.training) this.advanceWhileMatched();
	}

	private advanceWhileMatched() {
		while (this.isStepMatched()) {
			this.advanceStep();
		}
	}

	private isStepMatched(): boolean {
		if (this.activatedActions.length !== this.nextStep.length) return false;

		return this.nextStep.every((nextAction) =>
			this.activatedActions.some((action) => this.actionsEqual(action, nextAction))
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
