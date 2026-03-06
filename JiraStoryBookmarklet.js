javascript:(
    function () {
        function getTicketNumber() {
            return (
                location.pathname.split('/').pop()
            );
        }

        function setTemporaryFocus() {
            const textarea = document.createElement("textarea");
            document.body.appendChild(textarea);
            textarea.select();
            document.body.removeChild(textarea);
        }

        const ticketNumber = getTicketNumber();
        const heading = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]');
        const ticketSummary = heading.textContent;
        const ticketUrl = `${location.origin}/browse/${ticketNumber}`;
        const html = `<a href="${ticketUrl}">${ticketNumber}</a>` + " [" + ticketSummary + "]";
        const text = `[${ticketNumber}](${ticketUrl})` + " [" + ticketSummary + "]";

        setTemporaryFocus();

        navigator.clipboard.write([
            new ClipboardItem({
                'text/html': new Blob([html], {type: 'text/html'}),
                'text/plain': new Blob([text], {type: 'text/plain'}),
            }),
        ]);
    }
)();
