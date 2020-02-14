var respecConfig = (function() {
  'use strict';

  const _baseConfig = {
    trace:  true,
    useExperimentalStyles: true,
    doRDFa: '1.1',
    includePermalinks: true,
    permalinkEdge:     true,
    permalinkHide:     false,
    tocIntroductory: true,
  };

  const _specConfig = {
    specStatus: 'base',
    shortName: 'WCAG21-nl-errata',
    license: 'document',
    edDraftURI: 'https://accessibilitynl.github.io/WCAG21-NL/translations/WCAG21-NL/errata/edit/',
  };

  const _publicationConfig = {
    publishDate: '2020-02-11'
  };

  const _editors = [
    {
      name: 'Roel Antonisse - Deul',
      mailto: 'r.antonisse@accessibility.nl',
      company: 'Stichting Accessibility',
      companyURI: 'https://www.accessibility.nl/'
    }
  ];

  return {
    ..._baseConfig,
    ..._specConfig,
    ..._publicationConfig,
    editors: _editors
  };
}());
