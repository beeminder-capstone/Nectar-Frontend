import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { SettingsPage } from './settings';

let fixture: ComponentFixture<SettingsPage> = null;
let instance: any = null;

describe('Page: SettingsPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([SettingsPage]).then(compiled => {
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