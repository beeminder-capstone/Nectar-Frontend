import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { AddGoalPage } from './add-goal';
import { StorageMock } from '../../mocks'

let fixture: ComponentFixture < AddGoalPage > = null;
let instance: any = null;

describe('Page: AddGoalPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([AddGoalPage]).then(compiled => {
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