import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TrainerManagerService } from '../../services/trainer-manager.service';

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
	@Input() targetElement!: HTMLElement;

	protected overlayWidth = 0;
	protected overlayHeight = 0;

	private trainer = inject(TrainerManagerService);

	arrows = new Map<number, ArrowInstance>();
	private nextId = 0;

	constructor() {
		this.trainer.lurchDir$.subscribe((dir) => {
			this.spawnArrow(dir.x, dir.y);
		});
	}

  ngAfterViewInit() {
    const overlayRef = document.querySelector(".overlay");
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

	spawnArrow(x: number, y: number) {
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

	removeArrow(id: number) {
		this.arrows.delete(id);
	}

	getAngle(x: number, y: number): number {
		return (Math.atan2(y, x) * (180 / Math.PI) - 90) * -1;
	}

	getPositionX(x: number) {
		return x * 50 + 50;
	}

	getPositionY(y: number) {
		return y * -50 + 50;
	}
}
