var path = require('path');

function parseRemoteUri(remoteUri) {
    var gitRemote = /^git@([^:]+):([^\.]+)(\.git)?$/,
        httpRemote = /^(https?):\/\/([^@]+@)?([^\/]+)\/([^\.]+)(\.git)?$/;

    var matches = null;

    if (matches = gitRemote.exec(remoteUri)) {
        var repository = matches[2],
            splitRepo = repository.split('/');

        return {
            remote: remoteUri,
            protocol: 'git',
            host: matches[1],
            repository: repository,
            owner: splitRepo[0],
            project: splitRepo[1]
        };
    }

    if (matches = httpRemote.exec(remoteUri)) {
        var repository = matches[4],
            splitRepo = repository.split('/');

        return {
            remote: remoteUri,
            protocol: matches[1],
            host: matches[3],
            repository: repository,
            owner: splitRepo[0],
            project: splitRepo[1]
        };
    }

    // the remote is a local path or an unknown url, just
    // return its repository name without the owner's info

    var dirName = path.basename(remoteUri),
        repoName = dirName.split('.git')[0];

    return {
        remote: remoteUri,
        protocol: 'file',
        host: 'localhost',
        owner: null,
        repository: repoName,
        project: repoName
    };
}

module.exports = parseRemoteUri;
