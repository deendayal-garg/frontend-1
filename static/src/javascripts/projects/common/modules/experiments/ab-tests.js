// @flow
import { isExpired } from 'common/modules/experiments/test-can-run-checks';
import { removeParticipation } from 'common/modules/experiments/utils';
import { getTest as getAcquisitionTest } from 'common/modules/experiments/acquisition-test-selector';
import MembershipEngagementBannerTests from 'common/modules/experiments/tests/membership-engagement-banner-tests';
import PaidContentVsOutbrain2 from 'common/modules/experiments/tests/paid-content-vs-outbrain';
import { tailorSurvey } from 'common/modules/experiments/tests/tailor-survey';
import { ExplainerSnippet } from 'common/modules/experiments/tests/explainer-snippet';

import AcquisitionsEpicElectionInteractiveEnd from 'common/modules/experiments/tests/acquisitions-epic-election-interactive-end';
import AcquisitionsEpicElectionInteractiveSlice from 'common/modules/experiments/tests/acquisitions-epic-election-interactive-slice';
import AcquisitionsThrasherUkElection from 'common/modules/experiments/tests/acquisitions-thrasher-uk-election';

export const TESTS: Array<ABTest> = [
    new PaidContentVsOutbrain2(),
    getAcquisitionTest(),
    tailorSurvey,
    ExplainerSnippet(),
    new AcquisitionsEpicElectionInteractiveEnd(),
    new AcquisitionsEpicElectionInteractiveSlice(),
    new AcquisitionsThrasherUkElection(),
]
    .concat(MembershipEngagementBannerTests)
    .filter(Boolean);

export const getActiveTests = (): Array<ABTest> =>
    TESTS.filter(test => {
        if (isExpired(test.expiry)) {
            removeParticipation(test);
            return false;
        }
        return true;
    });

export const getExpiredTests = (): Array<ABTest> =>
    TESTS.filter(test => isExpired(test.expiry));

export const getTest = (id: string): ?ABTest => {
    const testIds = TESTS.map(test => test.id);
    const index = testIds.indexOf(id);
    return index > -1 ? TESTS[index] : null;
};
