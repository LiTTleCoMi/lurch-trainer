import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputService } from '../../services/input.service';
import { StrafesService } from '../../services/strafes.service';
import { StrafeDirections, StrafeItem } from '../../interfaces/strafes.interface';
import { Action, BoundAction } from '../../interfaces/binds.interface';

@Component({
	selector: 'app-overlay',
	imports: [],
	templateUrl: './overlay.html',
	styleUrl: './overlay.scss',
})
export class Overlay implements OnInit, OnChanges {
	private strafesService = inject(StrafesService);
	private keyboardService = inject(InputService);

	activatedActions = new Set<BoundAction>();
	readonly training = input.required<boolean>();

	private selectedStrafe?: StrafeItem;
	private currentDirectionNum = 1;
	private currentDirection: StrafeDirections['direction1'] = [];
	private currentStepIndex = 0;

	currentStep = new Set<BoundAction>();
	nextStep = new Set<BoundAction>();
	shouldBePressed = new Set<BoundAction>();
	shouldBeReleased = new Set<BoundAction>();

	ngOnInit() {
		this.selectedStrafe = this.strafesService.selectedStrafe;
		this.initializeTraining();

		this.keyboardService.activatedActions$.subscribe({
			next: (actions) => this.updateActivatedActions(actions),
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['training'] && this.training()) {
			this.initializeTraining();
		}
	}

	private initializeTraining() {
		if (!this.selectedStrafe) {
			console.error('No strafe selected!');
			return;
		}

		this.selectedStrafe = this.strafesService.selectedStrafe;
		this.currentDirectionNum = 1;
		this.currentDirection = this.selectedStrafe.directions.direction1;
		this.currentStepIndex = 0;

		this.currentStep.clear();
		this.nextStep = new Set(this.currentDirection[this.currentStepIndex]);
		this.updateStepDifferences();
	}

	private updateActivatedActions(actions: Set<BoundAction>) {
		this.activatedActions = actions;
		this.onActivatedActionsChange();
	}

	private onActivatedActionsChange() {
		if (!this.training()) return;
		if (this.isStepMatched()) {
			this.advanceStep();
		}
	}

	private isStepMatched(): boolean {
		const nextActions = Array.from(this.nextStep);
		if (this.activatedActions.size !== nextActions.length) return false;

		for (const next of nextActions) {
			if (
				![...this.activatedActions].some(
					(a) => a.action === next.action && a.useScroll === next.useScroll
				)
			) {
				return false;
			}
		}
		return true;
	}

	private advanceStep() {
		this.currentStep = new Set(this.nextStep);
		this.currentStepIndex++;

		if (this.currentStepIndex >= this.currentDirection.length) {
			this.switchDirections();
		} else {
			this.nextStep = new Set(this.currentDirection[this.currentStepIndex]);
		}

		this.updateStepDifferences();
	}

	private switchDirections() {
		if (!this.selectedStrafe) return;

		if (this.currentDirectionNum === 1) {
			this.currentDirectionNum = 2;
			this.currentDirection = this.selectedStrafe.directions.direction2;
		} else {
			this.currentDirectionNum = 1;
			this.currentDirection = this.selectedStrafe.directions.direction1;
		}

		this.currentStepIndex = 0;
		this.nextStep = new Set(this.currentDirection[this.currentStepIndex]);
		this.updateStepDifferences();
	}

	private updateStepDifferences() {
		this.shouldBePressed = new Set(
			[...this.nextStep].filter(
				(next) => ![...this.currentStep].some((cur) => cur.action === next.action)
			)
		);
		this.shouldBeReleased = new Set(
			[...this.currentStep].filter(
				(cur) => ![...this.nextStep].some((next) => next.action === cur.action)
			)
		);
	}

	// --- Template helpers ---
	shouldRemainActivated(action: BoundAction): boolean {
		return (
			this.training() &&
			[...this.nextStep].some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			) &&
			![...this.shouldBePressed].some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			)
		);
	}

	shouldActivate(action: BoundAction): boolean {
		return (
			this.training() &&
			[...this.shouldBePressed].some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			)
		);
	}

	shouldUnactivate(action: BoundAction): boolean {
		return (
			this.training() &&
			[...this.shouldBeReleased].some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			)
		);
	}

	isActivated(action: BoundAction): boolean {
		return this.activatedActions.has(action);
	}
}
