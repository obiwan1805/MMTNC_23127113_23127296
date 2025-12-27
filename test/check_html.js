const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

describe('Demo site Quality Check', () => {
  const htmlPath = path.join(__dirname, '../public/index.html');
  const jsPath = path.join(__dirname, '../public/app.js');

  it('Structure: Files must exist', () => {
    assert.ok(fs.existsSync(htmlPath), 'index.html is missing');
    assert.ok(fs.existsSync(jsPath), 'app.js is missing');
  });

  it('Content: Title must be correct', () => {
    const content = fs.readFileSync(htmlPath, 'utf8');
    assert.match(content, /Demo site/, 'The website title is incorrect.');
  });
  
  it('Logic: JS file should contain increment logic', () => {
    const content = fs.readFileSync(jsPath, 'utf8');
    assert.match(content, /count \+ 1/, 'The increment logic is missing from JS.');
  });
});