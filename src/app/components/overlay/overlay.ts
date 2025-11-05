import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KeyboardService } from '../../services/keyboard.service';
import { StrafesService } from '../../services/strafes.service';
import { StrafeItem } from '../../interfaces/strafes.interface';

@Component({
	selector: 'app-overlay',
	imports: [],
	templateUrl: './overlay.html',
	styleUrl: './overlay.scss',
})
export class Overlay implements OnInit, OnChanges {
	private strafesService = inject(StrafesService);
	private keyboardService = inject(KeyboardService);

	readonly trackedKeys = new Set(['a', 'w', 's', 'd', ' ']);
	pressedKeys = new Set<string>();
	readonly training = input.required<boolean>();

	private selectedStrafe?: StrafeItem;
	private currentDirectionNum = 1;
	private currentDirection: string[] = [];
	private currentStepIndex = 0;

	currentStep = new Set<string>();
	nextStep = new Set<string>();
	shouldBePressed = new Set<string>();
	shouldBeReleased = new Set<string>();

	ngOnInit() {
		this.selectedStrafe = this.strafesService.selectedStrafe;
		this.initializeTraining();

		this.keyboardService.pressedKeys$.subscribe({
			next: (keys) => {
				this.updatePressedKeys(keys);
				this.onPressedKeysChange();
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
		this.nextStep = new Set(this.currentDirection[this.currentStepIndex].split(''));
		this.updateStepDifferences();
	}

	private updatePressedKeys(keys: Set<string>) {
		this.pressedKeys.clear();
		for (const key of this.trackedKeys) {
			if (keys.has(key)) this.pressedKeys.add(key);
		}
	}

	private onPressedKeysChange() {
		if (!this.training()) return;
		if (this.isStepMatched()) {
			this.advanceStep();
		}
	}

	private isStepMatched(): boolean {
		if (this.pressedKeys.size !== this.nextStep.size) return false;
		for (const key of this.nextStep) {
			if (!this.pressedKeys.has(key)) return false;
		}
		return true;
	}

	private advanceStep() {
		this.currentStep = new Set(this.nextStep);
		this.currentStepIndex++;

		if (this.currentStepIndex >= this.currentDirection.length) {
			this.switchDirections();
		} else {
			this.nextStep = new Set(this.currentDirection[this.currentStepIndex].split(''));
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
		this.nextStep = new Set(this.currentDirection[this.currentStepIndex].split(''));
		this.updateStepDifferences();
	}

	private updateStepDifferences() {
		this.shouldBePressed = new Set([...this.nextStep].filter((k) => !this.currentStep.has(k)));
		this.shouldBeReleased = new Set([...this.currentStep].filter((k) => !this.nextStep.has(k)));
	}


	// Methods for template data binding
	shouldHoldKey(key: string): boolean {
		return this.training() && this.nextStep.has(key) && !this.shouldBePressed.has(key);
	}
	shouldPressKey(key: string): boolean {
		return this.training() && this.shouldBePressed.has(key);
	}
	shouldReleaseKey(key: string): boolean {
		return this.training() && this.shouldBeReleased.has(key);
	}
	isPressed(key: string): boolean {
		return this.pressedKeys.has(key);
	}
}