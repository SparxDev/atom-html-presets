'use babel';

import HtmlPresetsView from './html-presets-view';
import { CompositeDisposable } from 'atom';

export default {

  htmlPresetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.htmlPresetsView = new HtmlPresetsView(state.htmlPresetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.htmlPresetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that inserts this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-presets:insert': () => this.insert(),
      'html-presets:navbar': () => this.navbar(),
      'html-presets:footer': () => this.footer()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.htmlPresetsView.destroy();
  },

  serialize() {
    return {
      htmlPresetsViewState: this.htmlPresetsView.serialize()
    };
  },

  insert() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.insertText('<!DOCTYPE html>\n'
      + '<html lang="en">\n'
      + '  <head>\n'
      + '    <title>Example</title>\n'
      + '    <meta charset="utf-8">\n'
      + '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
      + '    <link rel="stylesheet" href="/css/style.css">\n'
      + '  </head>\n'
      + '  <body>\n'
      + '    \n'
      + '    \n'
      + '    <script src="/js/main.js"></script>\n'
      + '  </body>\n'
      + '</html>\n')
    }
  },
  navbar() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.insertText('<div class="navbar">\n'
      + '  <a href="#" class="navitem">Navbar Item</a>\n'
      + '  <a href="#" class="navitem">Navbar Item</a>\n'
      + '  <a href="#" class="navitem">Navbar Item</a>\n'
      + '  <a href="#" class="navitem">Navbar Item</a>\n'
      + '  <a href="#" class="navitem">Navbar Item</a>\n'
      + '</div>')
    }
  },
  footer() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      editor.insertText('<footer>\n'
      + '  <p>&copy; ' + (new Date()).getFullYear() + ' YourCompany.com - All rights reserved.</p>\n'
      + '</footer>\n')
    }
  }

};
