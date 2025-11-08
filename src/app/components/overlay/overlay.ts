import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputService } from '../../services/input.service';
import { StrafesService } from '../../services/strafes.service';
import { StrafeDirections, StrafeItem } from '../../interfaces/strafes.interface';
import { Action, BoundAction, ScrollDirection } from '../../interfaces/binds.interface';
import { UpperCasePipe } from '@angular/common';

@Component({
	selector: 'app-overlay',
	imports: [UpperCasePipe],
	templateUrl: './overlay.html',
	styleUrl: './overlay.scss',
})
export class Overlay implements OnInit, OnChanges {
	private strafesService = inject(StrafesService);
	protected inputService = inject(InputService);

	private activatedActions = new Set<BoundAction>();
	readonly training = input.required<boolean>();

	private selectedStrafe?: StrafeItem;
	private currentDirectionNum = 1;
	private currentDirection: StrafeDirections['direction1'] = [];
	private currentStepIndex = 0;

	private currentStep = new Set<BoundAction>();
	private nextStep = new Set<BoundAction>();
	private shouldBePressed = new Set<BoundAction>();
	private shouldBeReleased = new Set<BoundAction>();

	ngOnInit() {
		this.selectedStrafe = this.strafesService.selectedStrafe;
		this.initializeTraining();

		this.inputService.activatedActions$.subscribe({
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
		console.log(this.activatedActions);
		if (!this.training()) return;
		if (this.isStepMatched()) {
			this.advanceStep();
		}
	}

	private isStepMatched(): boolean {
		const nextActions = Array.from(this.nextStep);

		// Filter out "jump" from both sets for comparison
		const activatedNoJump = [...this.activatedActions].filter((a) => a.action !== 'jump');
		const nextNoJump = nextActions.filter((a) => a.action !== 'jump');

		// --- Compare everything except jump ---
		const allNonJumpMatch =
			activatedNoJump.length === nextNoJump.length &&
			nextNoJump.every((next) => activatedNoJump.some((a) => a.action === next.action));

		// If all non-jump actions match, consider it matched
		if (allNonJumpMatch) return true;

		return false;
	}
	// Ignore jump if it’s the only mismatch
	// private isStepMatched(): boolean {
	// 	const nextActions = Array.from(this.nextStep);
	// 	const activatedActions = Array.from(this.activatedActions);

	// 	let mismatches = nextActions.filter(
	// 		(next) =>
	// 			!activatedActions.some(
	// 				(a) => a.action === next.action && a.useScroll === next.useScroll
	// 			)
	// 	);

	// 	if (mismatches.length === 1 && mismatches[0].action === 'jump') {
	// 		mismatches = [];
	// 	}

	// 	return mismatches.length === 0;
	// }

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
				(next) =>
					![...this.currentStep].some(
						(cur) => cur.action === next.action && next.useScroll === cur.useScroll
					)
			)
		);
		this.shouldBeReleased = new Set(
			[...this.currentStep].filter(
				(cur) =>
					![...this.nextStep].some(
						(next) => next.action === cur.action && next.useScroll === cur.useScroll
					)
			)
		);
	}

	// --- Template helpers ---
	protected shouldRemainActivated(action: BoundAction): boolean {
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

	protected shouldActivate(action: BoundAction): boolean {
		return (
			this.training() &&
			[...this.shouldBePressed].some((a) => {
				if (a.action === action.action) {
					if (a.action === 'jump') {
						return true;
					}
					return a.useScroll === action.useScroll;
				}
				return false;
			})
		);
	}

	protected shouldUnactivate(action: BoundAction): boolean {
		return (
			this.training() &&
			[...this.shouldBeReleased].some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			)
		);
	}

	protected isActivated(action: BoundAction): boolean {
		return !!Array.from(this.activatedActions).some(
			(a) => JSON.stringify(a) === JSON.stringify(action)
		);
	}

	protected isScrolling(direction: ScrollDirection): boolean {
		if (direction === 'up') {
			return this.inputService.scrollingUp;
		} else {
			return this.inputService.scrollingDown;
		}
	}
}
