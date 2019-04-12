/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {MDCComponent} from '@material/base/component';
import {MDCCheckbox, MDCCheckboxFactory} from '@material/checkbox/component';
import {MDCCheckboxFoundation} from '@material/checkbox/foundation';
import {MDCDatatableAdapter} from './adapter';
import {MDCDatatableFoundation} from './foundation';

export class MDCDatatable extends MDCComponent<MDCDatatableFoundation> {
  initialize(checkboxFactory: MDCCheckboxFactory = (el) => new MDCCheckbox(el)) {

    const checkboxes =
      [].slice.call(this.root_.querySelectorAll<HTMLElement>(`.${MDCCheckboxFoundation.cssClasses.ROOT}`));
    for (const checkboxEl of checkboxes) {
      checkboxFactory(checkboxEl);
    }
  }

  destroy() {
    super.destroy();
  }

  getDefaultFoundation() {
    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    const adapter: MDCDatatableAdapter = {
      addClass: (className) => this.root_.classList.add(className),
      hasClass: (className) => this.root_.classList.contains(className),
      removeClass: (className) => this.root_.classList.remove(className),
    };
    return new MDCDatatableFoundation(adapter);
  }
}
