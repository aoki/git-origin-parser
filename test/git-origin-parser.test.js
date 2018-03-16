import test from 'ava';
import extract from '../src/git-origin-parser';

const file = 'file:///foo/bar/project.git';
test(`Extract Local protocol like a "${file}"`, t => {
  const origin = extract(file);
  const expected = {
    type: 'file',
    path: '/foo/bar/project'
  };
  t.deepEqual(origin, expected);
});

const ssh = 'ssh://git@github.com/foo/bar/project.git';
test(`Extract SSH protocol like a "${ssh}"`, t => {
  const origin = extract(ssh);
  const expected = {
    type: 'ssh',
    user: 'git',
    domain: 'github.com',
    path: 'foo/bar/project'
  };
  t.deepEqual(origin, expected);
});

const ssh2 = 'ssh://git@github.com/foo/project.git';
test(`Extract SSH protocol including org and repo like a "${ssh2}"`, t => {
  const origin = extract(ssh2);
  const expected = {
    type: 'ssh',
    user: 'git',
    domain: 'github.com',
    path: 'foo/project',
    org: 'foo',
    repo: 'project'
  };
  t.deepEqual(origin, expected);
});

const git = 'git://example.com/example/repo.git';
test(`Extract Git protocol like a "${git}"`, t => {
  const origin = extract(git);
  const expected = {
    type: 'git',
    domain: 'example.com',
    path: 'example/repo'
  };
  t.deepEqual(origin, expected);
});

const https = 'https://github.com/ringohub/foo.git';
test(`Extract HTTPS protocol including org and repo like a "${https}"`, t => {
  const origin = extract(https);
  const expected = {
    type: 'https',
    domain: 'github.com',
    path: 'ringohub/foo',
    org: 'ringohub',
    repo: 'foo'
  };
  t.deepEqual(origin, expected);
});

const http = 'http://github.com/ringohub/foo.git';
test(`Extract HTTP protocol including org and repo like a "${http}"`, t => {
  const origin = extract(http);
  const expected = {
    type: 'http',
    domain: 'github.com',
    path: 'ringohub/foo',
    org: 'ringohub',
    repo: 'foo'
  };
  t.deepEqual(origin, expected);
});

const notGitFormat = 'http://github.com/ringohub/foo';
test(`Get error when give invalid git URL`, t => {
  t.throws(() => {
    extract(notGitFormat);
  }, Error, `No Match Error: ${notGitFormat}`);
});
