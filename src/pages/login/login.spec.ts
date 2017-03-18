/**
 * Created by PSU Beeminder Capstone Team on 3/12/2017.
 * Copyright (c) 2017 PSU Beeminder Capstone Team
 * This code is available under the "MIT License".
 * Please see the file LICENSE in this distribution for license terms.
 */
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';

import { LoginPage } from './login';

let fixture: ComponentFixture < LoginPage > = null;
let instance: any = null;

describe('Page: LoginPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
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
