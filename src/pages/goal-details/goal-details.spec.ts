import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { GoalDetailsPage } from './goal-details';

let fixture: ComponentFixture < GoalDetailsPage > = null;
let instance: any = null;

describe('Page: GoalDetailsPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([GoalDetailsPage]).then(compiled => {
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
