// @see https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols
module.exports = gitOrigin => {
  if (/file:(.*?)\.git/.test(gitOrigin)) {
    const parsedFile = gitOrigin.match(new RegExp('^file://(.+).git'));
    return {
      type: 'file',
      path: parsedFile[1]
    };
  }

  if (/(.*?)@(.*?):(.*?)\.git/.test(gitOrigin)) {
    const parsedSsh = gitOrigin.match(new RegExp('^(.+)@(.+?):(.+?).git'));
    const origin = {
      type: 'ssh',
      user: parsedSsh[1],
      domain: parsedSsh[2],
      path: parsedSsh[3]
    };
    const paths = parsedSsh[3].split('/');
    if (paths.length === 2) {
      origin.org = paths[0];
      origin.repo = paths[1];
    }
    return origin;
  }

  if (/ssh:(.*?)\.git/.test(gitOrigin)) {
    const parsedSsh = gitOrigin.match(new RegExp('^ssh://(.+)@(.+?)/(.+).git'));
    const origin = {
      type: 'ssh',
      user: parsedSsh[1],
      domain: parsedSsh[2],
      path: parsedSsh[3]
    };
    const paths = parsedSsh[3].split('/');
    if (paths.length === 2) {
      origin.org = paths[0];
      origin.repo = paths[1];
    }
    return origin;
  }

  if (/git:(.*?)\.git/.test(gitOrigin)) {
    const parsedGit = gitOrigin.match(new RegExp('^git://(.+?)/(.+).git'));
    return {
      type: 'git',
      domain: parsedGit[1],
      path: parsedGit[2]
    };
  }

  if (/http(s)?:(.*?)\.git/.test(gitOrigin)) {
    const parsedHttp = gitOrigin.match(new RegExp('^(http(?:s)?)://(.+?)/(.+).git'));
    const originHttp = {
      type: parsedHttp[1],
      domain: parsedHttp[2],
      path: parsedHttp[3]
    };
    const pathsHttp = parsedHttp[3].split('/');
    if (pathsHttp.length === 2) {
      originHttp.org = pathsHttp[0];
      originHttp.repo = pathsHttp[1];
    }
    return originHttp;
  }

  throw new Error(`No Match Error: ${gitOrigin}`);
};
