var tape = require('tape'),
    parseRepo = require('./index.js');

tape('github remotes', function(t) {
    t.deepEqual(parseRepo('https://github.com/npm/docs.git'), {
        remote: 'https://github.com/npm/docs.git',
        protocol: 'https',
        host: 'github.com',
        repository: 'npm/docs',
        owner: 'npm',
        project: 'docs'
    });

    t.deepEqual(parseRepo('https://github.com/npm/docs'), {
        remote: 'https://github.com/npm/docs',
        protocol: 'https',
        host: 'github.com',
        repository: 'npm/docs',
        owner: 'npm',
        project: 'docs'
    });

    t.deepEqual(parseRepo('git@github.com:npm/docs.git'), {
        remote: 'git@github.com:npm/docs.git',
        protocol: 'git',
        host: 'github.com',
        repository: 'npm/docs',
        owner: 'npm',
        project: 'docs'
    });

    t.end();
});

tape('bitbucket remotes', function(t) {
    t.deepEqual(parseRepo('https://user@bitbucket.org/owner/org.git'), {
        remote: 'https://user@bitbucket.org/owner/org.git',
        protocol: 'https',
        host: 'bitbucket.org',
        repository: 'owner/org',
        owner: 'owner',
        project: 'org'
    });

    t.deepEqual(parseRepo('https://user@bitbucket.org/owner/org'), {
        remote: 'https://user@bitbucket.org/owner/org',
        protocol: 'https',
        host: 'bitbucket.org',
        repository: 'owner/org',
        owner: 'owner',
        project: 'org'
    });

    t.deepEqual(parseRepo('git@bitbucket.org:owner/org.git'), {
        remote: 'git@bitbucket.org:owner/org.git',
        protocol: 'git',
        host: 'bitbucket.org',
        repository: 'owner/org',
        owner: 'owner',
        project: 'org'
    });

    t.end();
});

tape('gitlab remotes', function(t) {
    t.deepEqual(parseRepo('https://gitlab.com/gitlab-org/gitlab-ce.git'), {
        remote: 'https://gitlab.com/gitlab-org/gitlab-ce.git',
        protocol: 'https',
        host: 'gitlab.com',
        repository: 'gitlab-org/gitlab-ce',
        owner: 'gitlab-org',
        project: 'gitlab-ce'
    });

    t.deepEqual(parseRepo('git@gitlab.com:gitlab-org/gitlab-ce.git'), {
        remote: 'git@gitlab.com:gitlab-org/gitlab-ce.git',
        protocol: 'git',
        host: 'gitlab.com',
        repository: 'gitlab-org/gitlab-ce',
        owner: 'gitlab-org',
        project: 'gitlab-ce'
    });

    t.end();
});

tape('local remotes', function(t) {
    t.deepEqual(parseRepo('/full/path/to/repo.git'), {
        remote: '/full/path/to/repo.git',
        protocol: 'file',
        host: 'localhost',
        repository: 'repo',
        owner: null,
        project: 'repo'
    });

    t.deepEqual(parseRepo('/full/path/to/repo'), {
        remote: '/full/path/to/repo',
        protocol: 'file',
        host: 'localhost',
        repository: 'repo',
        owner: null,
        project: 'repo'
    });

    t.end();
});
