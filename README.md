# bookmarklets
Handy bookmarklets.

## How to use
- Open browser Bookmark Manager.
- Under "Bookmarks Bar", click on menu kabab and select "Add new bookmark".
- Give the bookmark a name (ie: "Jira Ticket").
- Copy the bookmarklet script from this repo and paste it into the URL field.
- Click Save. Now the bookmarklet should be available on the Bookmarks Bar.
- Navigate to a webpage that is used by the bookmarklet, such as a Jira ticket.
- Click on the bookmarklet in the Bookmarks Bar. The URL and title of the page is now copied to your clipboard.
- Paste the contents of your clipboard into an email, Slack, chat, etc.


## Bookmarklets

### JiraStoryBookmarklet.js 
This is a convenience script used for copying a string containing the link to the Jira ticket and the title of the ticket. This can then be pasted into a document or email body. The result looks something like this:

"[EDA-138](https://chorusview.atlassian.net/browse/EDA-138) [EAV Modify 'setAttribute()' endpoint to include parameter for UpdateReason]"


### GitPullRequestBookmarklet.js
This is a convenience script used for copying a string containing the link to the GitHub pull request title. This can then be pasted into a document or email body. The result looks something like this:

"[proto PR-805](https://github.com/chorusview/proto/pull/805) [Added AttrValue.UpdateReason value to SetAttrValueRequest]"

## Credits
I copied the idea years ago from somewhere on the internet for quickly constructing a Jira ticket link and title. I've since modified the scripts to accommodate changes in Jira ticket page formatting. And, I've used Cursor for making the selection of HTML content more robust.
