/**
 * Decap CMS Custom Preview Templates
 * Adhering to official Decap CMS documentation:
 * https://decapcms.org/docs/customization/
 */

(function () {
  var h = window.h || (window.CMS && window.CMS.h) || (window.React && window.React.createElement);
  if (!h) return;

  var createClass = window.createClass || function (spec) {
    function Comp(props) {
      if (window.React && window.React.Component) {
        window.React.Component.call(this, props);
      } else {
        this.props = props;
      }
    }
    if (window.React && window.React.Component) {
      Comp.prototype = Object.create(window.React.Component.prototype);
      Comp.prototype.constructor = Comp;
    }
    for (var key in spec) {
      Comp.prototype[key] = spec[key];
    }
    return Comp;
  };

  // -------------------------------------------------------------
  // 1. Blog Article Preview Template
  // -------------------------------------------------------------
  var BlogPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'Untitled Article';
      var rawDate = entry.getIn(['data', 'date']);
      var dateStr = rawDate ? new Date(rawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Draft';
      var description = entry.getIn(['data', 'description']) || '';
      var image = entry.getIn(['data', 'image']);
      var imageAsset = image ? this.props.getAsset(image) : null;
      var imageSrc = imageAsset ? imageAsset.toString() : '';
      var tags = entry.getIn(['data', 'tags']);
      var tagsList = tags ? (tags.toJS ? tags.toJS() : [].concat(tags)) : ['blog'];
      var isDraft = entry.getIn(['data', 'draft']) === true;

      return h('article', { className: 'preview-container max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900' },
        isDraft ? h('div', { className: 'mb-4 p-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-mono flex items-center justify-between' },
          h('span', { className: 'flex items-center gap-2 font-bold' },
            h('span', { className: 'w-2 h-2 rounded-full bg-amber-500' }),
            'DRAFT ARTICLE — Marked as draft in admin (hidden from public listings & search engines)'
          ),
          h('span', { className: 'px-2 py-0.5 rounded bg-amber-200 uppercase text-[10px] font-bold' }, 'Draft')
        ) : null,
        h('div', { className: 'flex items-center gap-2 mb-4 text-xs font-mono text-neutral-500' },
          h('span', { className: 'uppercase tracking-wider font-semibold text-emerald-600' }, 'Article Preview'),
          h('span', {}, '•'),
          h('span', {}, dateStr)
        ),
        h('h1', { className: 'font-heading text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 mb-4 leading-tight' }, title),
        h('div', { className: 'flex flex-wrap gap-1.5 mb-6' },
          tagsList.map(function (tag, idx) {
            return h('span', { key: idx, className: 'px-2.5 py-0.5 rounded-md text-xs font-mono bg-neutral-100 text-neutral-700 border border-neutral-200' }, '#' + tag);
          })
        ),
        description ? h('p', { className: 'text-lg text-neutral-600 font-sans leading-relaxed mb-6 pb-6 border-b border-neutral-200' }, description) : null,
        imageSrc ? h('div', { className: 'mb-8 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm' },
          h('img', { src: imageSrc, alt: title, className: 'w-full h-auto object-cover max-h-96' })
        ) : null,
        h('div', { className: 'prose prose-neutral max-w-none text-base leading-relaxed' },
          this.props.widgetFor('body')
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 2. Portfolio Project Preview Template
  // -------------------------------------------------------------
  var PortfolioPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'Untitled Project';
      var summary = entry.getIn(['data', 'summary']) || '';
      var client = entry.getIn(['data', 'client']) || 'Personal Project';
      var role = entry.getIn(['data', 'role']) || '';
      var liveUrl = entry.getIn(['data', 'liveUrl']);
      var githubUrl = entry.getIn(['data', 'githubUrl']);
      var image = entry.getIn(['data', 'image']);
      var imageAsset = image ? this.props.getAsset(image) : null;
      var imageSrc = imageAsset ? imageAsset.toString() : '';
      var tags = entry.getIn(['data', 'tags']);
      var tagsList = tags ? (tags.toJS ? tags.toJS() : [].concat(tags)) : ['portfolio'];
      var isDraft = entry.getIn(['data', 'draft']) === true;

      return h('article', { className: 'preview-container max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900' },
        isDraft ? h('div', { className: 'mb-4 p-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs font-mono flex items-center justify-between' },
          h('span', { className: 'flex items-center gap-2 font-bold' },
            h('span', { className: 'w-2 h-2 rounded-full bg-amber-500' }),
            'DRAFT PROJECT — Marked as draft in admin (hidden from public showcase & search engines)'
          ),
          h('span', { className: 'px-2 py-0.5 rounded bg-amber-200 uppercase text-[10px] font-bold' }, 'Draft')
        ) : null,
        h('div', { className: 'flex items-center gap-2 mb-3 text-xs font-mono text-neutral-500' },
          h('span', { className: 'uppercase tracking-wider font-semibold text-emerald-600' }, 'Project Showcase'),
          h('span', {}, '•'),
          h('span', { className: 'text-neutral-700 font-medium' }, client)
        ),
        h('h1', { className: 'font-heading text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 mb-3 leading-tight' }, title),
        summary ? h('p', { className: 'text-lg text-neutral-600 leading-relaxed mb-4' }, summary) : null,
        h('div', { className: 'flex flex-wrap items-center gap-4 py-3 border-y border-neutral-200 mb-6 text-xs font-mono' },
          role ? h('span', { className: 'text-neutral-500' }, 'Role: ' + role) : null,
          liveUrl ? h('a', { href: liveUrl, target: '_blank', className: 'text-emerald-600 font-semibold hover:underline' }, '↗ Live Demonstration') : null,
          githubUrl ? h('a', { href: githubUrl, target: '_blank', className: 'text-neutral-700 font-semibold hover:underline' }, '↗ Source Repository') : null
        ),
        imageSrc ? h('div', { className: 'mb-8 overflow-hidden rounded-2xl border border-neutral-200 shadow-sm' },
          h('img', { src: imageSrc, alt: title, className: 'w-full h-auto object-cover max-h-96' })
        ) : null,
        h('div', { className: 'prose prose-neutral max-w-none text-base leading-relaxed' },
          this.props.widgetFor('body')
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 3. Home Page Preview Template
  // -------------------------------------------------------------
  var HomePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var heroBadge = entry.getIn(['data', 'heroBadge']) || '';
      var heroHeadline = entry.getIn(['data', 'heroHeadline']) || '';
      var heroDescription = entry.getIn(['data', 'heroDescription']) || '';
      var heroImage = entry.getIn(['data', 'heroImage']);
      var imageAsset = heroImage ? this.props.getAsset(heroImage) : null;
      var imageSrc = imageAsset ? imageAsset.toString() : '';

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans' },
        h('div', { className: 'rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs' },
          heroBadge ? h('div', { className: 'mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-mono font-medium text-emerald-800' },
            h('span', { className: 'h-2 w-2 rounded-full bg-emerald-500 inline-block' }),
            heroBadge
          ) : null,
          h('h1', { className: 'font-heading text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 leading-tight mb-4' }, heroHeadline),
          h('p', { className: 'text-base sm:text-lg text-neutral-600 leading-relaxed mb-6 max-w-2xl' }, heroDescription),
          imageSrc ? h('div', { className: 'mt-6' },
            h('img', { src: imageSrc, alt: 'Hero Profile', className: 'w-24 h-24 rounded-2xl object-cover border border-neutral-200 shadow-sm' })
          ) : null
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 4. Links & Socials Preview Template
  // -------------------------------------------------------------
  var LinksPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var items = entry.getIn(['data', 'items']);
      var itemsList = items ? (items.toJS ? items.toJS() : [].concat(items)) : [];

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans' },
        h('div', { className: 'flex items-center justify-between mb-4 border-b border-neutral-200 pb-3' },
          h('h2', { className: 'font-heading text-2xl font-bold text-neutral-950' }, 'Links for Other Sites Preview'),
          h('span', { className: 'text-xs font-mono text-neutral-500' }, itemsList.length + ' Links Configured')
        ),
        h('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8' },
          itemsList.map(function (item, idx) {
            return h('div', { key: idx, className: 'p-3.5 rounded-xl border border-neutral-200 bg-white shadow-2xs flex items-center justify-between gap-3' },
              h('div', { className: 'flex items-center gap-3' },
                h('div', { className: 'w-9 h-9 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center font-mono text-xs uppercase font-bold text-neutral-700' },
                  (item.icon || 'link').slice(0, 2)
                ),
                h('div', {},
                  h('span', { className: 'block font-semibold text-sm text-neutral-900' }, item.title || 'Untitled Link'),
                  h('span', { className: 'block text-xs font-mono text-neutral-500' }, item.subtitle || item.url)
                )
              ),
              h('div', { className: 'flex flex-col items-end gap-1 shrink-0 text-[10px] font-mono' },
                item.showInNav !== false ? h('span', { className: 'px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200' }, 'Navigation') : null,
                item.showInFooter !== false ? h('span', { className: 'px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600' }, 'Footer & Hero') : null
              )
            );
          })
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 5. Banners & Notices Preview Template
  // -------------------------------------------------------------
  var BannersPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var ann = entry.getIn(['data', 'announcement']);
      var annEnabled = ann ? ann.get('enabled') : true;
      var annBadge = ann ? (ann.get('badge') || 'Open to Work') : 'Open to Work';
      var annText = ann ? (ann.get('text') || '') : '';
      var annLinkText = ann ? (ann.get('linkText') || 'View Resume →') : 'View Resume →';

      var cookie = entry.getIn(['data', 'cookieConsent']);
      var cookieEnabled = cookie ? cookie.get('enabled') : true;
      var cookieTitle = cookie ? (cookie.get('title') || 'Cookie Notice') : 'Cookie Notice';
      var cookieMessage = cookie ? (cookie.get('message') || '') : '';
      var cookieAccept = cookie ? (cookie.get('acceptText') || 'Accept All') : 'Accept All';
      var cookieDecline = cookie ? (cookie.get('declineText') || 'Decline') : 'Decline';

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans space-y-8' },
        h('div', {},
          h('div', { className: 'text-xs font-mono text-neutral-500 uppercase tracking-wider font-bold mb-2.5' }, '1. Live Announcement Banner:'),
          annEnabled ? h('div', { className: 'w-full py-2.5 px-4 bg-neutral-950 text-white rounded-xl shadow-md border border-neutral-800 flex items-center justify-between text-xs' },
            h('div', { className: 'flex items-center gap-2 flex-wrap' },
              h('span', { className: 'inline-flex items-center gap-1.5 font-bold text-white' },
                h('span', { className: 'w-2 h-2 rounded-full bg-emerald-400 inline-block' }),
                annBadge
              ),
              h('span', { className: 'text-neutral-500' }, '|'),
              h('span', { className: 'text-neutral-300' }, annText),
              h('span', { className: 'text-emerald-400 font-semibold' }, annLinkText)
            ),
            h('span', { className: 'text-neutral-500 text-[10px] font-mono shrink-0' }, '✕ Dismiss')
          ) : h('div', { className: 'p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 text-xs font-mono' }, 'Announcement banner is toggled off.')
        ),

        h('div', {},
          h('div', { className: 'text-xs font-mono text-neutral-500 uppercase tracking-wider font-bold mb-2.5' }, '2. Live Cookie Consent Notice:'),
          cookieEnabled ? h('div', { className: 'w-full p-5 bg-white rounded-2xl border border-neutral-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs' },
            h('div', { className: 'flex items-start gap-3' },
              h('div', { className: 'w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0 border border-amber-200' }, '🍪'),
              h('div', {},
                h('h4', { className: 'font-heading text-lg font-bold text-neutral-900 mb-0.5' }, cookieTitle),
                h('p', { className: 'text-neutral-600 leading-relaxed' }, cookieMessage)
              )
            ),
            h('div', { className: 'flex items-center gap-2 shrink-0' },
              h('button', { className: 'px-3.5 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-700 font-medium' }, cookieDecline),
              h('button', { className: 'px-4 py-2 rounded-lg bg-neutral-950 text-white font-medium shadow-sm' }, cookieAccept)
            )
          ) : h('div', { className: 'p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-500 text-xs font-mono' }, 'Cookie consent banner is toggled off.')
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 6. Resume / CV Preview Template
  // -------------------------------------------------------------
  var ResumePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var roleHeadline = entry.getIn(['data', 'roleHeadline']) || '';
      var availability = entry.getIn(['data', 'availability']) || '';
      var summary = entry.getIn(['data', 'summary']) || '';
      var location = entry.getIn(['data', 'location']) || '';
      var updated = entry.getIn(['data', 'updated']) || '';

      var education = entry.getIn(['data', 'education']);
      var degree = education ? (education.get ? education.get('degree') : education.degree) : '';
      var period = education ? (education.get ? education.get('period') : education.period) : '';
      var field = education ? (education.get ? education.get('field') : education.field) : '';
      var focus = education ? (education.get ? education.get('focus') : education.focus) : '';
      var distinction = education ? (education.get ? education.get('distinction') : education.distinction) : '';

      var competenciesRaw = entry.getIn(['data', 'competencies']);
      var competencies = competenciesRaw ? (competenciesRaw.toJS ? competenciesRaw.toJS() : [].concat(competenciesRaw)) : [];

      var experienceRaw = entry.getIn(['data', 'experience']);
      var experience = experienceRaw ? (experienceRaw.toJS ? experienceRaw.toJS() : [].concat(experienceRaw)) : [];

      var certificationsRaw = entry.getIn(['data', 'certifications']);
      var certifications = certificationsRaw ? (certificationsRaw.toJS ? certificationsRaw.toJS() : [].concat(certificationsRaw)) : [];

      var selectedWorksRaw = entry.getIn(['data', 'selectedWorks']);
      var selectedWorks = selectedWorksRaw ? (selectedWorksRaw.toJS ? selectedWorksRaw.toJS() : [].concat(selectedWorksRaw)) : [];

      var honorsRaw = entry.getIn(['data', 'honors']);
      var honors = honorsRaw ? (honorsRaw.toJS ? honorsRaw.toJS() : [].concat(honorsRaw)) : [];

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900' },
        h('div', { className: 'bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-sm' },
          // Header Section
          h('div', { className: 'border-b border-neutral-200 pb-8 mb-8' },
            h('div', { className: 'flex flex-col sm:flex-row sm:items-start justify-between gap-4' },
              h('div', {},
                h('h1', { className: 'font-heading text-4xl sm:text-5xl font-bold text-neutral-950 leading-tight mb-1' }, 'Debosmita Rit'),
                h('p', { className: 'font-mono text-sm sm:text-base text-emerald-600 font-semibold mb-2' }, roleHeadline),
                h('div', { className: 'flex flex-wrap items-center gap-2 mb-3' },
                  availability ? h('span', { className: 'inline-block px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200' }, availability) : null,
                  location ? h('span', { className: 'text-xs font-mono text-neutral-500' }, location) : null,
                  updated ? h('span', { className: 'text-xs font-mono text-neutral-400' }, '• ' + updated) : null
                )
              )
            ),
            h('p', { className: 'text-sm text-neutral-600 leading-relaxed mt-2' }, summary)
          ),

          // 1. Education Section
          h('div', { className: 'border-b border-neutral-200 pb-8 mb-8' },
            h('div', { className: 'flex items-center gap-2 mb-4' },
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-emerald-600 font-bold' }, '01.'),
              h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950 tracking-tight' }, 'Education')
            ),
            h('div', { className: 'rounded-xl border border-neutral-100 bg-neutral-50 p-5' },
              h('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-1' },
                h('h4', { className: 'font-heading text-xl font-bold text-neutral-900' }, degree || 'Degree Name'),
                period ? h('span', { className: 'font-mono text-xs text-neutral-500 font-medium' }, period) : null
              ),
              field ? h('p', { className: 'text-xs font-mono text-neutral-500 mt-0.5' }, field) : null,
              focus ? h('p', { className: 'mt-3 text-sm text-neutral-700 leading-relaxed' },
                h('strong', {}, 'Core Focus Areas: '),
                focus
              ) : null,
              distinction ? h('p', { className: 'text-xs text-neutral-600 font-mono pt-2' }, distinction) : null
            )
          ),

          // 2. Technical Competencies Section
          competencies.length > 0 ? h('div', { className: 'border-b border-neutral-200 pb-8 mb-8' },
            h('div', { className: 'flex items-center gap-2 mb-4' },
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-emerald-600 font-bold' }, '02.'),
              h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950 tracking-tight' }, 'Technical & Design Competencies')
            ),
            h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 text-sm' },
              competencies.map(function (comp, idx) {
                return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 p-4 bg-white shadow-2xs' },
                  h('span', { className: 'font-mono text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-1.5' }, comp.category || 'Competency'),
                  h('p', { className: 'text-neutral-700 leading-relaxed text-xs' }, comp.details || '')
                );
              })
            )
          ) : null,

          // 3. Professional Experience Section
          experience.length > 0 ? h('div', { className: 'border-b border-neutral-200 pb-8 mb-8' },
            h('div', { className: 'flex items-center gap-2 mb-6' },
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-emerald-600 font-bold' }, '03.'),
              h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950 tracking-tight' }, 'Professional Experience')
            ),
            h('div', { className: 'space-y-6' },
              experience.map(function (job, idx) {
                var bullets = job.bullets ? (job.bullets.toJS ? job.bullets.toJS() : [].concat(job.bullets)) : [];
                return h('div', { key: idx, className: 'relative pl-6 border-l-2 border-neutral-200' },
                  h('div', { className: 'absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-emerald-600' }),
                  h('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-1' },
                    h('h4', { className: 'font-heading text-xl font-bold text-neutral-950' }, job.role || 'Role'),
                    job.period ? h('span', { className: 'font-mono text-xs text-neutral-500 font-medium' }, job.period) : null
                  ),
                  h('p', { className: 'font-mono text-xs text-neutral-600 mt-0.5' },
                    h('span', { className: 'font-semibold text-neutral-900' }, job.company || ''),
                    job.department ? ' • ' + job.department : ''
                  ),
                  bullets.length > 0 ? h('ul', { className: 'mt-3 space-y-1.5 text-xs text-neutral-700 list-disc list-outside pl-4 leading-relaxed' },
                    bullets.map(function (b, bIdx) {
                      return h('li', { key: bIdx }, typeof b === 'string' ? b : '');
                    })
                  ) : null
                );
              })
            )
          ) : null,

          // 4. Industry Certifications Section
          certifications.length > 0 ? h('div', { className: 'border-b border-neutral-200 pb-8 mb-8' },
            h('div', { className: 'flex items-center gap-2 mb-6' },
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-emerald-600 font-bold' }, '04.'),
              h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950 tracking-tight' }, 'Industry Certifications & Accreditations')
            ),
            h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
              certifications.map(function (cert, idx) {
                var skillsList = cert.skills ? (cert.skills.toJS ? cert.skills.toJS() : [].concat(cert.skills)) : [];
                return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 bg-white p-5 flex flex-col justify-between shadow-2xs' },
                  h('div', {},
                    h('div', { className: 'flex items-center justify-between gap-2 mb-2 font-mono text-xs' },
                      h('span', { className: 'text-neutral-500' }, cert.issuer || ''),
                      cert.badge ? h('span', { className: 'px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-semibold' }, cert.badge) : null
                    ),
                    h('h4', { className: 'font-heading text-lg font-bold text-neutral-950 mb-1' }, cert.title || ''),
                    cert.issued ? h('p', { className: 'text-xs font-mono text-neutral-400 mb-3' }, 'Issued ' + cert.issued) : null
                  ),
                  skillsList.length > 0 ? h('div', { className: 'flex flex-wrap gap-1 mt-3 pt-3 border-t border-neutral-100' },
                    skillsList.map(function (s, sIdx) {
                      return h('span', { key: sIdx, className: 'px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-50 text-neutral-600 border border-neutral-200' }, typeof s === 'string' ? s : '');
                    })
                  ) : null
                );
              })
            )
          ) : null,

          // 5. Selected Works Section
          selectedWorks.length > 0 ? h('div', { className: 'border-b border-neutral-200 pb-8 mb-8' },
            h('div', { className: 'flex items-center gap-2 mb-4' },
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-emerald-600 font-bold' }, '05.'),
              h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950 tracking-tight' }, 'Selected Works & Systems')
            ),
            h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
              selectedWorks.map(function (work, idx) {
                return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 p-4 bg-white shadow-2xs' },
                  h('h4', { className: 'font-heading text-lg font-bold text-neutral-950' }, work.title || ''),
                  work.tags ? h('span', { className: 'font-mono text-[10px] text-emerald-600 block mb-2' }, work.tags) : null,
                  h('p', { className: 'text-xs text-neutral-600 leading-relaxed' }, work.description || '')
                );
              })
            )
          ) : null,

          // 6. Honors & Leadership Section
          honors.length > 0 ? h('div', {},
            h('div', { className: 'flex items-center gap-2 mb-4' },
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-emerald-600 font-bold' }, '06.'),
              h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950 tracking-tight' }, 'Honors & Leadership')
            ),
            h('div', { className: 'grid grid-cols-1 sm:grid-cols-3 gap-3' },
              honors.map(function (honor, idx) {
                return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 text-center' },
                  h('h4', { className: 'font-heading text-base font-bold text-neutral-900' }, honor.title || ''),
                  h('p', { className: 'text-xs font-mono text-neutral-500 mt-1' }, honor.subtitle || '')
                );
              })
            )
          ) : null
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 7. About Page Preview Template
  // -------------------------------------------------------------
  var AboutPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var headline = entry.getIn(['data', 'headline']) || '';
      var statusLocation = entry.getIn(['data', 'statusLocation']) || '';
      var bioShort = entry.getIn(['data', 'bioShort']) || '';
      var profileImage = entry.getIn(['data', 'profileImage']);
      var imageAsset = profileImage ? this.props.getAsset(profileImage) : null;
      var imageSrc = imageAsset ? imageAsset.toString() : '';

      var metrics = entry.getIn(['data', 'metrics']);
      var metricsList = metrics ? (metrics.toJS ? metrics.toJS() : [].concat(metrics)) : [];

      var journeyHeadline = entry.getIn(['data', 'journeyHeadline']) || 'Journey & Engineering Philosophy';
      var journeyParagraphs = entry.getIn(['data', 'journeyParagraphs']);
      var paragraphsList = journeyParagraphs ? (journeyParagraphs.toJS ? journeyParagraphs.toJS() : [].concat(journeyParagraphs)) : [];

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans' },
        h('div', { className: 'mb-8 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs flex flex-col sm:flex-row items-center gap-6' },
          imageSrc ? h('img', { src: imageSrc, alt: 'Profile', className: 'w-32 h-32 rounded-xl object-cover border border-neutral-200 shadow-sm shrink-0' }) : null,
          h('div', { className: 'flex-1 text-center sm:text-left' },
            statusLocation ? h('div', { className: 'mb-2 font-mono text-xs text-neutral-500' }, statusLocation) : null,
            h('h2', { className: 'font-heading text-2xl sm:text-3xl font-bold text-neutral-950 mb-2' }, headline),
            h('p', { className: 'text-sm text-neutral-600 leading-relaxed font-sans' }, bioShort)
          )
        ),

        metricsList.length > 0 ? h('div', { className: 'mb-10' },
          h('div', { className: 'text-xs font-mono text-neutral-500 uppercase tracking-wider font-bold mb-3' }, 'Highlight Metrics (' + metricsList.length + '):'),
          h('div', { className: 'grid grid-cols-2 sm:grid-cols-4 gap-4' },
            metricsList.map(function (m, idx) {
              return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-xs' },
                h('div', { className: 'font-heading text-3xl font-bold ' + (idx === 1 ? 'text-emerald-600' : 'text-neutral-950') }, m.value || '-'),
                h('div', { className: 'mt-1 font-mono text-xs text-neutral-500 uppercase tracking-wider' }, m.label || 'Metric')
              );
            })
          )
        ) : null,

        h('div', { className: 'rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs' },
          h('h3', { className: 'font-heading text-xl font-bold text-neutral-950 mb-4' }, journeyHeadline),
          paragraphsList.map(function (p, idx) {
            var text = typeof p === 'string' ? p : (p.para || '');
            return h('p', { key: idx, className: 'text-sm text-neutral-700 leading-relaxed mb-3' }, text);
          })
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 8. Infinite Scroll Tech Stack Ticker Preview Template
  // -------------------------------------------------------------
  var TechStackPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var enabled = entry.getIn(['data', 'enabled']) !== false;
      var speed = entry.getIn(['data', 'speed']) || 38;
      var items = entry.getIn(['data', 'items']);
      var itemsList = items ? (items.toJS ? items.toJS() : [].concat(items)) : [];

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900' },
        h('div', { className: 'flex items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-200' },
          h('div', {},
            h('h2', { className: 'font-heading text-2xl font-bold text-neutral-950' }, 'Infinite Scroll Tech Stack Ticker'),
            h('p', { className: 'text-xs font-mono text-neutral-500 mt-1' }, 'Live Preview • ' + itemsList.length + ' technologies configured • Speed: ' + speed + 's loop')
          ),
          h('span', { className: 'px-3 py-1 rounded-full text-xs font-mono font-semibold ' + (enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200') },
            enabled ? 'Status: Active on Site' : 'Status: Draft / Disabled'
          )
        ),
        h('div', { className: 'rounded-2xl border border-neutral-200 bg-[#edf0f5] p-6 shadow-xs overflow-hidden' },
          h('div', { className: 'text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-4' }, 'Ticker Items Strip Preview:'),
          h('div', { className: 'flex flex-wrap gap-2.5 items-center' },
            itemsList.map(function (item, idx) {
              return h('div', { key: idx, className: 'flex items-center gap-2 rounded-lg border border-neutral-200/90 bg-white px-3.5 py-1.5 shadow-2xs' },
                h('span', { className: 'w-2 h-2 rounded-full bg-emerald-500 shrink-0' }),
                h('span', { className: 'text-xs font-semibold text-neutral-800' }, item.name || 'Unnamed Tech'),
                h('span', { className: 'text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1 rounded' }, item.icon || 'code')
              );
            })
          )
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 9. Register Preview Styles & Templates with Decap CMS
  // -------------------------------------------------------------
  CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=BenchNine:wght@300;400;700&family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  CMS.registerPreviewStyle('/css/output.css');
  CMS.registerPreviewStyle('/css/prism.css');
  CMS.registerPreviewStyle('/admin/preview.css');

  CMS.registerPreviewTemplate('blog', BlogPreview);
  CMS.registerPreviewTemplate('portfolio', PortfolioPreview);
  CMS.registerPreviewTemplate('home', HomePreview);
  CMS.registerPreviewTemplate('about', AboutPreview);
  CMS.registerPreviewTemplate('links', LinksPreview);
  CMS.registerPreviewTemplate('banners', BannersPreview);
  CMS.registerPreviewTemplate('resume', ResumePreview);
  CMS.registerPreviewTemplate('techStack', TechStackPreview);
})();
