import { Injectable } from '@angular/core';
import { Strafes } from '../interfaces/strafes.interface';
import { Action } from '../interfaces/actions.interface';

@Injectable({
	providedIn: 'root',
})
export class StrafesService {
	strafes: Strafes = [
		{
			name: 'Forward RAS',
			directions: [
				[
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 0 }],
						lurchDirection: { x: -1, y: 0 },
						jump: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Right, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: 1, y: 0 },
							{ x: 1, y: -1 },
						],
						lurchDirection: { x: 1, y: 0 },
						jump: false,
					},
				],
				[
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Jump, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 0 }],
						lurchDirection: { x: 1, y: 0 },
						jump: true,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
						],
						expectedLurchDirections: [{ x: 1, y: 1 }],
						lurchDirection: { x: 1, y: 1 },
						jump: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Right, useScroll: false },
							{ action: Action.Forward, useScroll: false },
							{ action: Action.Left, useScroll: false },
						],
						expectedLurchDirections: [{ x: 0, y: 1 }],
						lurchDirection: { x: 0, y: 1 },
						jump: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [{ x: -1, y: 1 }],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
					},
					{
						suggestedInputs: [
							{ action: Action.Left, useScroll: false },
							{ action: Action.Backward, useScroll: false },
							{ action: Action.Forward, useScroll: true },
						],
						expectedLurchDirections: [
							{ x: -1, y: 0 },
							{ x: -1, y: -1 },
						],
						lurchDirection: { x: -1, y: 1 },
						jump: false,
					},
				],
			],
		},
	];
}
