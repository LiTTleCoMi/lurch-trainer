import { Component, inject, OnInit } from '@angular/core';
import { InputService } from '../../services/input.service';
import { BoundAction, ScrollDirection } from '../../interfaces/actions.interface';
import { UpperCasePipe } from '@angular/common';
import { TrainerManagerService } from '../../services/trainer-manager.service';

@Component({
	selector: 'app-overlay',
	imports: [UpperCasePipe],
	templateUrl: './overlay.html',
	styleUrl: './overlay.scss',
})
export class Overlay implements OnInit {
	protected inputService = inject(InputService);
	private trainerManagerService = inject(TrainerManagerService);

	private activatedActions: BoundAction[] = [];
	private shouldBePressed: BoundAction[] = [];
	private shouldBeReleased: BoundAction[] = [];
	private nextStep: BoundAction[] = [];
	private currentStep: BoundAction[] = [];

	ngOnInit() {
		this.inputService.activatedActions$.subscribe({
			next: (actions) => (this.activatedActions = actions),
		});
		this.trainerManagerService.state$.subscribe({
			next: (state) => {
				this.shouldBePressed = state.shouldBePressed;
				this.shouldBeReleased = state.shouldBeReleased;
				this.nextStep = state.nextStep;
				this.currentStep = state.currentStep;
			},
		});
	}

	// --- Template helpers ---
	protected shouldRemainActivated(action: BoundAction): boolean {
		return (
			this.trainerManagerService.training &&
			this.nextStep.some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			) &&
			!this.shouldBePressed.some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			)
		);
	}

	protected shouldActivate(action: BoundAction): boolean {
		return (
			this.trainerManagerService.training &&
			this.shouldBePressed.some((a) => {
				return a.action === action.action && a.useScroll === action.useScroll;
			})
		);
	}

	protected shouldUnactivate(action: BoundAction): boolean {
		return (
			this.trainerManagerService.training &&
			this.shouldBeReleased.some(
				(a) => a.action === action.action && a.useScroll === action.useScroll
			)
		);
	}

	protected isActivated(action: BoundAction): boolean {
		return !!this.activatedActions.some(
			(a) => a.action === action.action && a.useScroll === action.useScroll
		);
	}

	protected isScrolling(direction: ScrollDirection): boolean {
		if (direction === ScrollDirection.Up) {
			return this.inputService.scrollingUp;
		} else {
			return this.inputService.scrollingDown;
		}
	}
}
