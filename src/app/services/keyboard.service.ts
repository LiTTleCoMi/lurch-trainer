import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class KeyboardService {
	private _pressedKeys = new BehaviorSubject<Set<string>>(new Set());
	pressedKeys$ = this._pressedKeys.asObservable(); // reactive observable

	private pressedKeys = new Set<string>();

	pressKey(key: string) {
		if (this.pressedKeys.has(key)) return;
		this.pressedKeys.add(key);
		this._pressedKeys.next(this.pressedKeys); // update observable
	}

	releaseKey(key: string) {
		this.pressedKeys.delete(key);
		this._pressedKeys.next(this.pressedKeys);
	}
}
