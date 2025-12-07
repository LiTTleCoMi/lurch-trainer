import { AfterViewInit, Component, inject } from '@angular/core';
import { TrainerManagerService } from '../../services/trainer-manager.service';
import { StrafeStep } from '../../interfaces/strafes.interface';

interface ArrowInstance {
	id: number;
	x: number;
	y: number;
	angle: number;
	posX: number;
	posY: number;
}

@Component({
	selector: 'app-lurch-direction',
	templateUrl: './lurch-direction.html',
	styleUrls: ['./lurch-direction.scss'],
})
export class LurchDirection implements AfterViewInit {
	private trainerManagerService = inject(TrainerManagerService);

	protected overlayWidth = 0;
	protected overlayHeight = 0;

	protected arrows = new Map<number, ArrowInstance>();
	private nextId = 0;
	protected readonly staticDirections = [
		{ x: 0, y: 1 },
		{ x: 1, y: 1 },
		{ x: 1, y: 0 },
		{ x: 1, y: -1 },
		{ x: 0, y: -1 },
		{ x: -1, y: -1 },
		{ x: -1, y: 0 },
		{ x: -1, y: 1 },
	];

	private prevStep: StrafeStep | null = null;
	private currentStep: StrafeStep | null = null;

	constructor() {
		this.trainerManagerService.lurchDir$.subscribe((dir) => {
			if (!dir.x && !dir.y) return;
			this.spawnArrow(dir.x, dir.y);
		});
		this.trainerManagerService.state$.subscribe((state) => {
			this.prevStep = structuredClone(this.currentStep);
			this.currentStep = state.currentStep;
		});
	}

	ngAfterViewInit() {
		const overlayRef = document.getElementById('overlay');
		if (!overlayRef) return;

		const updateOverlaySize = () => {
			if (!overlayRef) return;
			const overlayRect = overlayRef.getBoundingClientRect();
			this.overlayWidth = overlayRect.width;
			this.overlayHeight = overlayRect.height;
		};

		updateOverlaySize();

		const overlayObs = new ResizeObserver(() => updateOverlaySize());
		overlayObs.observe(overlayRef);
	}

	private spawnArrow(x: number, y: number) {
		const id = this.nextId++;
		const angle = this.getAngle(x, y);

		const arrow: ArrowInstance = {
			id,
			x,
			y,
			angle,
			posX: this.getPositionX(x),
			posY: this.getPositionY(y),
		};

		this.arrows.set(id, arrow);
	}

	protected removeArrow(id: number) {
		this.arrows.delete(id);
	}

	protected getAngle(x: number, y: number): number {
		return (Math.atan2(y, x) * (180 / Math.PI) - 90) * -1;
	}

	protected getPositionX(x: number) {
		return x * 50 + 50;
	}

	protected getPositionY(y: number) {
		return y * -50 + 50;
	}
}
