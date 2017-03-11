import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { EditGoalPage } from './edit-goal';

let fixture: ComponentFixture < AddGoalPage > = null;
let instance: any = null;

describe('Page: EditGoalPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([EditGoalPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.detectChanges();
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it('initialises', () => {
        expect(instance).toBeTruthy();
    });
});