import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KeyboardService } from '../../services/keyboard.service';
import { StrafesService } from '../../services/strafes.service';
import { StrafeDirections, StrafeItem } from '../../interfaces/strafes.interface';
import { Actions } from '../../interfaces/binds.interface';

@Component({
	selector: 'app-overlay',
	imports: [],
	templateUrl: './overlay.html',
	styleUrl: './overlay.scss',
})
export class Overlay implements OnInit, OnChanges {
	private strafesService = inject(StrafesService);
	private keyboardService = inject(KeyboardService);

	activatedActions = new Set<string>();
	readonly training = input.required<boolean>();

	private selectedStrafe?: StrafeItem;
	private currentDirectionNum = 1;
	private currentDirection: StrafeDirections["direction1"] = [];
	private currentStepIndex = 0;

	currentStep = new Set<string>();
	nextStep = new Set<string>();
	shouldBePressed = new Set<string>();
	shouldBeReleased = new Set<string>();

	ngOnInit() {
		this.selectedStrafe = this.strafesService.selectedStrafe;
		this.initializeTraining();

		this.keyboardService.activatedActions$.subscribe({
			next: (actions) => {
				this.updateActivatedActions(actions);
			},
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['training']) {
			if (this.training()) {
				this.initializeTraining();
			}
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

	private updateActivatedActions(actions: Set<string>) {
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
		if (this.activatedActions.size !== this.nextStep.size) return false;
		for (const action of this.nextStep) {
			if (!this.activatedActions.has(action)) return false;
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
		} else if (this.currentDirectionNum === 2) {
			this.currentDirectionNum = 1;
			this.currentDirection = this.selectedStrafe.directions.direction1;
		}

		this.currentStepIndex = 0;
		this.nextStep = new Set(this.currentDirection[this.currentStepIndex]);
		this.updateStepDifferences();
	}

	private updateStepDifferences() {
		this.shouldBePressed = new Set([...this.nextStep].filter((k) => !this.currentStep.has(k)));
		this.shouldBeReleased = new Set([...this.currentStep].filter((k) => !this.nextStep.has(k)));
	}

	// Methods for template data binding
	shouldRemainActivated(action: Actions): boolean {
		return this.training() && this.nextStep.has(action) && !this.shouldBePressed.has(action);
	}
	shouldActivate(action: Actions): boolean {
		return this.training() && this.shouldBePressed.has(action);
	}
	shouldUnactivate(action: Actions): boolean {
		return this.training() && this.shouldBeReleased.has(action);
	}
	isActivated(action: Actions): boolean {
		return this.activatedActions.has(action);
	}
}
