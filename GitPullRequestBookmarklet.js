javascript:(
    async function () {
        function getPathSegments() {
            return location.pathname.split('/').filter(Boolean);
        }

        function getPullRequestNumber() {
            const segments = getPathSegments();
            const pullIndex = segments.indexOf('pull');

            if (pullIndex !== -1 && segments[pullIndex + 1]) {
                return segments[pullIndex + 1];
            }

            return segments.pop() || 'unknown';
        }

        function getRepoName() {
            const segments = getPathSegments();
            return segments[1] || 'repo';
        }

        function getPullRequestTitle() {
            const pageTitle = document.title || '';
            const byMarker = ' by ';
            const byMarkerIndex = pageTitle.indexOf(byMarker);

            if (byMarkerIndex > 0) {
                return pageTitle.slice(0, byMarkerIndex).trim();
            }

            const pullRequestMarker = ' · Pull Request #';
            const pullRequestMarkerIndex = pageTitle.indexOf(pullRequestMarker);

            if (pullRequestMarkerIndex > 0) {
                return pageTitle.slice(0, pullRequestMarkerIndex).trim();
            }

            return pageTitle.trim() || 'Pull Request';
        }

        function copyWithExecCommand(value) {
            const textarea = document.createElement("textarea");
            textarea.value = value;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            textarea.style.pointerEvents = "none";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const copied = document.execCommand('copy');
            document.body.removeChild(textarea);

            return copied;
        }

        async function copyToClipboard(html, text) {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': new Blob([html], {type: 'text/html'}),
                        'text/plain': new Blob([text], {type: 'text/plain'}),
                    }),
                ]);
                return;
            } catch (richClipboardError) {
                try {
                    await navigator.clipboard.writeText(text);
                    return;
                } catch (plainClipboardError) {
                    if (copyWithExecCommand(text)) {
                        return;
                    }

                    const isFocusError =
                        richClipboardError?.name === 'NotAllowedError' ||
                        plainClipboardError?.name === 'NotAllowedError';

                    if (isFocusError) {
                        throw new Error('Clipboard access requires a focused page. Click the page and run the bookmarklet again.');
                    }

                    throw plainClipboardError;
                }
            }
        }

        const prNumber = getPullRequestNumber();
        const repoName = getRepoName();
        const prTitle = getPullRequestTitle();
        const prUrl = `${location.origin}${location.pathname}`;
        const label = `${repoName} PR-${prNumber}`;
        const html = `<a href="${prUrl}">${label}</a>` + " [" + prTitle + "]";
        const text = `[${label}](${prUrl})` + " [" + prTitle + "]";

        if (!document.hasFocus()) {
            window.focus();
        }

        await copyToClipboard(html, text);
    }
)();
