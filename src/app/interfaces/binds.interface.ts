export type Action = 'forward' | 'backward' | 'left' | 'right' | 'jump';
export enum Input {
	Key = 'key',
	Scroll = 'scroll',
}
export type ScrollDirection = 'up' | 'down';
export interface BoundAction {
	action: Action;
	useScroll: boolean;
}
