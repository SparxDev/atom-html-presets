'use babel';

import HtmlPresets from '../lib/html-presets';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('HtmlPresets', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('html-presets');
  });

  describe('when the html-presets:insert event is triggered', () => {
    it('inserts the html code', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.html-presets')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'html-presets:insert');
      atom.commands.dispatch(workspaceElement, 'html-presets:navbar');
      atom.commands.dispatch(workspaceElement, 'html-presets:footer');

      waitsForPromise(() => {
        return activationPromise;
      });
    });
  });
});
