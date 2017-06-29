import React from 'react';
import moment from 'moment';

import '../../images/repo.svg';
import '../../images/git-pull-request.svg';

import UserPhoto from './UserPhoto';
import { Comments } from './Comments';
import { Status } from './Status';

const CLASS_BASE = 'pull-request';
const CLASS_UNMERGEABLE = `${CLASS_BASE} ${CLASS_BASE}--unmergeable`;
const CLASS_MERGEABLE = `${CLASS_BASE} ${CLASS_BASE}--mergeable`;

function getPrClassName(pr) {
  if (pr.unmergeable) {
    return CLASS_UNMERGEABLE;
  } else if (pr.mergeable) {
    return CLASS_MERGEABLE;
  }

  return CLASS_BASE;
}

export default class PullRequestCompact extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  render() {
    const pr = this.props.pullRequest;
    const className = getPrClassName(pr);

    return (
      <div className={className}>
        <UserPhoto size={50} user={pr.user} />
        <div className="pull-request-info pull-request-info--narrow">
          <a className="pull-request-repo" target="_blank" href={pr.repoUrl}>
            <img src="images/repo.svg" alt="Repository" /> {pr.repo}
          </a>
          <div className="pull-request-data">
            <img src="images/git-pull-request.svg" alt="Pull request" />
            &nbsp;
            <a className="pull-request-title" target="_blank" href={pr.url}>{pr.title}</a>
            <span className="pull-request-number">#{pr.number}</span>

            <Status
              status={pr.status}
            />
            <Comments
              comments={pr.comments}
              reviewComments={pr.reviewComments}
              positiveCommentCount={pr.positiveComments}
              negativeCommentCount={pr.negativeComments}
              reactions={pr.reactions}
            />
          </div>
          <div className="pull-request-created" title={this.formatTime('Created', pr.created)}>
            Opened by {pr.user.username} {this.formatRelativeTime(pr.created)}
          </div>
        </div>
        <div
          className="pull-request-last-updated"
          title={this.formatTime('Last updated', pr.updated)}
        >
          {this.formatRelativeTime(pr.updated)}
        </div>
      </div>
    );
  }
}

PullRequestCompact.propTypes = {
  pullRequest: React.PropTypes.object.isRequired
};
