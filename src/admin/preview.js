/**
 * Decap CMS Custom Preview Templates
 * Adhering to official Decap CMS documentation:
 * https://decapcms.org/docs/customization/
 */

(function () {
  var CMS = window.CMS;
  // Decap CMS date widget fallback: alias 'date' to the built-in 'datetime' widget
  if (CMS && CMS.getWidget && CMS.registerWidget) {
    try {
      var dt = CMS.getWidget('datetime');
      if (dt && dt.control) {
        CMS.registerWidget('date', dt.control, dt.preview);
      }
    } catch (err) {
      console.warn('Date widget alias registration skipped:', err);
    }
  }

  var h = window.h || (CMS && CMS.h) || (window.React && window.React.createElement);
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
  // 1. Blog Article Preview Template (Single Entry)
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
  // 2. Portfolio Project Preview Template (Single Entry)
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
  // 3. Home Page Preview Template (Full Page Rendering)
  // -------------------------------------------------------------
  var HomePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var heroBadge = entry.getIn(['data', 'heroBadge']) || '';
      var heroHeadline = entry.getIn(['data', 'heroHeadline']) || 'Making the World a little bit better';
      var heroDescription = entry.getIn(['data', 'heroDescription']) || '';
      var heroImage = entry.getIn(['data', 'heroImage']);
      var imageAsset = heroImage ? this.props.getAsset(heroImage) : null;
      var imageSrc = imageAsset ? imageAsset.toString() : '';

      var heroCtaPrimaryText = entry.getIn(['data', 'heroCtaPrimaryText']) || 'Explore Portfolio';
      var heroCtaPrimaryUrl = entry.getIn(['data', 'heroCtaPrimaryUrl']) || '/portfolio/';
      var heroCtaSecondaryText = entry.getIn(['data', 'heroCtaSecondaryText']) || 'About & Experience';
      var heroCtaSecondaryUrl = entry.getIn(['data', 'heroCtaSecondaryUrl']) || '/about/';

      var portfolioHeading = entry.getIn(['data', 'portfolioHeading']) || 'Projects';
      var portfolioSubheading = entry.getIn(['data', 'portfolioSubheading']) || 'Showcase';
      var portfolioViewAllText = entry.getIn(['data', 'portfolioViewAllText']) || 'View all portfolio works';

      var blogHeading = entry.getIn(['data', 'blogHeading']) || 'Recent Articles';
      var blogViewAllText = entry.getIn(['data', 'blogViewAllText']) || 'View all articles';

      return h('div', { className: 'w-full font-sans text-neutral-900 bg-white pb-16' },
        // Live Preview Banner Notice
        h('div', { className: 'mb-6 p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 text-xs font-mono flex items-center justify-between' },
          h('span', { className: 'flex items-center gap-2 font-bold' },
            h('span', { className: 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse' }),
            'HOME PAGE LIVE PREVIEW — Rendering all sections in real-time'
          ),
          h('span', { className: 'px-2 py-0.5 rounded bg-emerald-200 uppercase text-[10px] font-bold text-emerald-900' }, 'All Sections Active')
        ),

        // 1. Hero Section
        h('section', { className: 'relative w-full rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-12 mb-8 shadow-xs preview-blueprint-grid overflow-hidden' },
          h('div', { className: 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center' },
            h('div', { className: 'lg:col-span-8' },
              heroBadge ? h('div', { className: 'mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-medium text-emerald-800' },
                h('span', { className: 'h-2 w-2 rounded-full bg-emerald-500 inline-block' }),
                heroBadge
              ) : null,
              h('h1', { className: 'font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-tight mb-4' }, heroHeadline),
              h('p', { className: 'text-base sm:text-lg text-neutral-600 leading-relaxed font-sans max-w-2xl font-normal mb-6' }, heroDescription),
              h('div', { className: 'flex flex-wrap items-center gap-3' },
                h('a', { href: heroCtaPrimaryUrl, className: 'inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-medium text-white shadow-sm' },
                  h('span', {}, heroCtaPrimaryText),
                  h('span', {}, '→')
                ),
                h('a', { href: heroCtaSecondaryUrl, className: 'inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-800 shadow-2xs' },
                  heroCtaSecondaryText
                ),
                h('div', { className: 'flex items-center gap-2 pl-2 border-l border-neutral-200' },
                  h('span', { className: 'px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-600' }, 'GitHub'),
                  h('span', { className: 'px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-600' }, 'LinkedIn'),
                  h('span', { className: 'px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-600' }, 'Credly')
                )
              )
            ),
            h('div', { className: 'lg:col-span-4 flex justify-center lg:justify-end' },
              h('div', { className: 'rounded-xl border border-neutral-200 bg-white p-2.5 shadow-sm text-center' },
                imageSrc ? h('img', { src: imageSrc, alt: 'Profile', className: 'w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-lg' }) :
                  h('div', { className: 'w-48 h-48 sm:w-56 sm:h-56 rounded-lg bg-neutral-100 flex items-center justify-center font-mono text-xs text-neutral-400' }, 'No Image Selected'),
                h('div', { className: 'mt-2 font-mono text-xs font-semibold text-neutral-800' }, 'Debosmita Rit')
              )
            )
          )
        ),

        // 2. Infinite Tech Stack Ticker Section
        h('section', { className: 'w-full rounded-2xl border border-neutral-200 bg-[#edf0f5] p-5 mb-8 shadow-xs' },
          h('div', { className: 'flex items-center justify-between mb-3' },
            h('span', { className: 'font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold' }, 'SECTION 2 • INFINITE TECH STACK TICKER'),
            h('span', { className: 'font-mono text-[11px] text-emerald-600 font-medium' }, 'GSAP Marquee Enabled')
          ),
          h('div', { className: 'flex flex-wrap gap-2 items-center' },
            ['Python', 'Java', 'AWS', 'SQL & Databases', 'JavaScript', 'React', 'Tailwind CSS', 'Node.js', 'Eleventy', 'HTML5', 'CSS3', 'Git', 'Docker', 'Vite'].map(function (tech, idx) {
              return h('div', { key: idx, className: 'flex items-center gap-2 rounded-lg border border-neutral-200/90 bg-white px-3 py-1.5 shadow-2xs text-xs font-semibold text-neutral-800' },
                h('span', { className: 'w-2 h-2 rounded-full bg-emerald-500' }),
                tech
              );
            })
          )
        ),

        // 3. Portfolio Works Showcase Section
        h('section', { className: 'w-full rounded-2xl border border-neutral-200 bg-[#f4f6fa] p-6 sm:p-8 mb-8 shadow-xs' },
          h('div', { className: 'flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2' },
            h('div', {},
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold block' }, portfolioSubheading),
              h('h2', { className: 'font-heading text-3xl sm:text-4xl font-bold text-neutral-950 mt-1' }, portfolioHeading)
            ),
            h('a', { href: '/portfolio/', className: 'font-mono text-xs font-semibold text-neutral-900 inline-flex items-center gap-1 hover:text-emerald-600' },
              h('span', {}, portfolioViewAllText),
              h('span', {}, '→')
            )
          ),
          h('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
            [
              { title: 'Aura Design System', client: 'Design Tokens • WCAG 2.2', summary: 'Unified design token architecture and accessible component library.' },
              { title: 'Lumina Mobile Studio', client: 'Touch Systems • Gestures', summary: 'Touch-optimized creative production tool designed for tactile editing.' },
              { title: 'Synapse Real-time Mesh', client: 'Distributed Nodes • Telemetry', summary: 'High-density telemetry dashboard with microsecond state updates.' }
            ].map(function (proj, idx) {
              return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs flex flex-col justify-between' },
                h('div', {},
                  h('span', { className: 'inline-block rounded-full bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700 mb-2' }, proj.client),
                  h('h3', { className: 'font-heading text-xl font-bold text-neutral-950 mb-1' }, proj.title),
                  h('p', { className: 'text-xs text-neutral-600 leading-relaxed' }, proj.summary)
                ),
                h('div', { className: 'mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono font-semibold text-emerald-600' },
                  h('span', {}, 'Explore Case Study'),
                  h('span', {}, '→')
                )
              );
            })
          )
        ),

        // 4. Latest Blog Articles Section
        h('section', { className: 'w-full rounded-2xl border border-neutral-200 bg-[#faf8f5] p-6 sm:p-8 shadow-xs' },
          h('div', { className: 'flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2' },
            h('div', {},
              h('span', { className: 'font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold block' }, 'SECTION 4 • EDITORIAL WRITING'),
              h('h2', { className: 'font-heading text-3xl sm:text-4xl font-bold text-neutral-950 mt-1' }, blogHeading)
            ),
            h('a', { href: '/blog/', className: 'font-mono text-xs font-semibold text-neutral-900 inline-flex items-center gap-1 hover:text-emerald-600' },
              h('span', {}, blogViewAllText),
              h('span', {}, '→')
            )
          ),
          h('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
            [
              { title: 'The Renaissance of the Static Web', date: 'Oct 2026', desc: 'Why zero-runtime CSS, pre-compiled static generators, and accessible typography outperform bloated frameworks.' },
              { title: 'Engineering High-Contrast Design Tokens', date: 'Sep 2026', desc: 'Systemic token architecture for dark/light themes adhering strictly to WCAG 2.2 AA accessibility.' }
            ].map(function (art, idx) {
              return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 bg-white p-5 shadow-2xs' },
                h('div', { className: 'flex items-center justify-between text-xs font-mono text-neutral-400 mb-2' },
                  h('span', {}, art.date),
                  h('span', { className: 'text-neutral-500 font-semibold' }, 'Essay')
                ),
                h('h3', { className: 'font-heading text-xl font-bold text-neutral-950 mb-1.5' }, art.title),
                h('p', { className: 'text-xs text-neutral-600 leading-relaxed' }, art.desc)
              );
            })
          )
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 4. About Page Preview Template (Full Page Rendering)
  // -------------------------------------------------------------
  var AboutPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'About Debosmita Rit';
      var description = entry.getIn(['data', 'description']) || '';
      var headline = entry.getIn(['data', 'headline']) || 'BCA Student · Cloud & Software Development';
      var statusBadge = entry.getIn(['data', 'statusBadge']) || '';
      var statusLocation = entry.getIn(['data', 'statusLocation']) || 'West Bengal, India';
      var bioShort = entry.getIn(['data', 'bioShort']) || '';
      var profileImage = entry.getIn(['data', 'profileImage']);
      var imageAsset = profileImage ? this.props.getAsset(profileImage) : null;
      var imageSrc = imageAsset ? imageAsset.toString() : '';

      var metrics = entry.getIn(['data', 'metrics']);
      var metricsList = metrics ? (metrics.toJS ? metrics.toJS() : [].concat(metrics)) : [];

      var journeyHeadline = entry.getIn(['data', 'journeyHeadline']) || 'The Journey & Philosophy';
      var journeyParagraphs = entry.getIn(['data', 'journeyParagraphs']);
      var paragraphsList = journeyParagraphs ? (journeyParagraphs.toJS ? journeyParagraphs.toJS() : [].concat(journeyParagraphs)) : [];

      var experience = entry.getIn(['data', 'experience']);
      var experienceList = experience ? (experience.toJS ? experience.toJS() : [].concat(experience)) : [];

      var academic = entry.getIn(['data', 'academic']);
      var degree = academic ? (academic.get ? academic.get('degree') : academic.degree) : '';
      var academicPeriod = academic ? (academic.get ? academic.get('period') : academic.period) : '';
      var field = academic ? (academic.get ? academic.get('field') : academic.field) : '';
      var academicDesc = academic ? (academic.get ? academic.get('description') : academic.description) : '';

      var exploring = entry.getIn(['data', 'exploring']);
      var exploringTitle = exploring ? (exploring.get ? exploring.get('title') : exploring.title) : 'What I\'m Exploring Right Now';
      var exploringUpdated = exploring ? (exploring.get ? exploring.get('updated') : exploring.updated) : 'Updated October 2026';
      var exploringItemsRaw = exploring ? (exploring.get ? exploring.get('items') : exploring.items) : [];
      var exploringItems = exploringItemsRaw ? (exploringItemsRaw.toJS ? exploringItemsRaw.toJS() : [].concat(exploringItemsRaw)) : [];

      return h('article', { className: 'w-full max-w-4xl mx-auto py-6 px-4 font-sans text-neutral-900 space-y-12' },
        // Breadcrumbs & Header
        h('header', { className: 'pb-6 border-b border-neutral-200' },
          h('div', { className: 'mb-3 flex items-center gap-2 text-xs font-mono text-neutral-500' },
            h('span', {}, 'Home'),
            h('span', { className: 'text-neutral-300' }, '/'),
            h('span', { className: 'font-semibold text-neutral-800' }, 'About')
          ),
          h('h1', { className: 'font-heading text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950' }, title),
          description ? h('p', { className: 'mt-2 text-lg text-neutral-600 leading-relaxed font-sans' }, description) : null
        ),

        // 1. Profile Header Card
        h('div', { className: 'rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center gap-6' },
          imageSrc ? h('img', { src: imageSrc, alt: 'Profile', className: 'w-36 h-36 rounded-xl object-cover border border-neutral-200 shadow-sm shrink-0' }) :
            h('div', { className: 'w-36 h-36 rounded-xl bg-neutral-100 flex items-center justify-center font-mono text-xs text-neutral-400 shrink-0' }, 'No Image'),
          h('div', { className: 'flex-1 text-center md:text-left' },
            (statusBadge || statusLocation) ? h('div', { className: 'flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2 font-mono text-xs' },
              statusBadge ? h('span', { className: 'px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold uppercase text-[11px]' }, statusBadge) : null,
              statusLocation ? h('span', { className: 'text-neutral-500' }, statusLocation) : null
            ) : null,
            h('h2', { className: 'font-heading text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight mb-2' }, headline),
            h('p', { className: 'text-sm sm:text-base text-neutral-600 leading-relaxed font-sans mb-4' }, bioShort),
            h('div', { className: 'flex flex-wrap gap-2 justify-center md:justify-start text-xs font-mono' },
              h('span', { className: 'px-2.5 py-1 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700' }, 'GitHub'),
              h('span', { className: 'px-2.5 py-1 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700' }, 'LinkedIn'),
              h('span', { className: 'px-2.5 py-1 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700' }, 'Twitter'),
              h('span', { className: 'px-2.5 py-1 rounded-lg border border-neutral-200 bg-neutral-50 text-emerald-700 font-semibold' }, 'CV / Resume')
            )
          )
        ),

        // 2. Highlight Metrics Grid
        metricsList.length > 0 ? h('section', {},
          h('div', { className: 'font-mono text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-3' }, 'AT A GLANCE METRICS'),
          h('div', { className: 'grid grid-cols-2 sm:grid-cols-4 gap-4' },
            metricsList.map(function (m, idx) {
              return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-xs' },
                h('div', { className: 'font-heading text-3xl sm:text-4xl font-bold ' + (idx === 1 ? 'text-emerald-600' : 'text-neutral-950') }, m.value || '-'),
                h('div', { className: 'mt-1 font-mono text-[11px] text-neutral-500 uppercase tracking-wider' }, m.label || 'Metric')
              );
            })
          )
        ) : null,

        // 3. Biography & Journey Paragraphs
        h('section', { className: 'rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs' },
          h('h2', { className: 'font-heading text-2xl sm:text-3xl font-bold text-neutral-950 mb-4' }, journeyHeadline),
          h('div', { className: 'space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans' },
            paragraphsList.map(function (p, idx) {
              var text = typeof p === 'string' ? p : (p.paragraph || p.para || '');
              return h('p', { key: idx }, text);
            })
          )
        ),

        // 4. Career Milestones Timeline
        experienceList.length > 0 ? h('section', {},
          h('div', { className: 'flex items-center justify-between mb-4' },
            h('h2', { className: 'font-heading text-2xl sm:text-3xl font-bold text-neutral-950' }, 'Career Milestones'),
            h('span', { className: 'font-mono text-xs text-neutral-400 uppercase tracking-widest' }, 'Track Record')
          ),
          h('div', { className: 'space-y-4' },
            experienceList.map(function (job, idx) {
              var tags = job.tags ? (job.tags.toJS ? job.tags.toJS() : [].concat(job.tags)) : [];
              return h('div', { key: idx, className: 'rounded-xl border border-neutral-200 bg-white p-6 shadow-xs' },
                h('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1' },
                  h('h3', { className: 'font-heading text-xl font-bold text-neutral-950' }, job.role || 'Role'),
                  job.period ? h('span', { className: 'font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-2.5 py-0.5 w-max' }, job.period) : null
                ),
                job.company ? h('p', { className: 'font-mono text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2' }, job.company) : null,
                job.description ? h('p', { className: 'text-sm text-neutral-600 leading-relaxed mb-3' }, job.description) : null,
                tags.length > 0 ? h('div', { className: 'flex flex-wrap gap-1.5' },
                  tags.map(function (t, tIdx) {
                    return h('span', { key: tIdx, className: 'px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 text-neutral-600 border border-neutral-200' }, t);
                  })
                ) : null
              );
            })
          )
        ) : null,

        // 5. Academic Background
        (degree || field || academicDesc) ? h('section', {},
          h('h2', { className: 'font-heading text-2xl sm:text-3xl font-bold text-neutral-950 mb-4' }, 'Academic Background'),
          h('div', { className: 'rounded-xl border border-neutral-200 bg-white p-6 shadow-xs' },
            h('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2' },
              h('h3', { className: 'font-heading text-xl font-bold text-neutral-950' }, degree || 'Degree'),
              academicPeriod ? h('span', { className: 'font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-2.5 py-0.5 w-max' }, academicPeriod) : null
            ),
            field ? h('p', { className: 'font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3' }, field) : null,
            academicDesc ? h('p', { className: 'text-sm text-neutral-600 leading-relaxed' }, academicDesc) : null
          )
        ) : null,

        // 6. What I'm Exploring Right Now
        h('section', { className: 'rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8' },
          h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950 mb-1' }, exploringTitle),
          exploringUpdated ? h('p', { className: 'text-xs font-mono text-neutral-500 uppercase tracking-wider mb-4' }, exploringUpdated) : null,
          exploringItems.length > 0 ? h('ul', { className: 'space-y-3 text-sm text-neutral-700 font-sans' },
            exploringItems.map(function (item, idx) {
              var text = typeof item === 'string' ? item : (item.item || '');
              return h('li', { key: idx, className: 'flex items-start gap-2.5' },
                h('span', { className: 'font-mono text-emerald-600 font-bold shrink-0' }, '→'),
                h('span', {}, text)
              );
            })
          ) : h('p', { className: 'text-xs font-mono text-neutral-400' }, 'No exploring items specified.')
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 5. Resume / CV Preview Template (Full Sheet Rendering)
  // -------------------------------------------------------------
  var ResumePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var heading = entry.getIn(['data', 'heading']) || 'Curriculum Vitae';
      var updated = entry.getIn(['data', 'updated']) || 'Updated October 2026';
      var availability = entry.getIn(['data', 'availability']) || '';
      var roleHeadline = entry.getIn(['data', 'roleHeadline']) || 'BCA Student · Cloud & Software Development';
      var summary = entry.getIn(['data', 'summary']) || '';
      var location = entry.getIn(['data', 'location']) || 'West Bengal, India • Remote';

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

      return h('div', { className: 'w-full max-w-4xl mx-auto py-6 px-4 font-sans text-neutral-900 space-y-6' },
        // Top Toolbar Mockup
        h('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200' },
          h('div', {},
            h('div', { className: 'flex items-center gap-2 text-xs font-mono text-neutral-500' },
              h('span', {}, 'Home'),
              h('span', { className: 'text-neutral-300' }, '/'),
              h('span', { className: 'font-semibold text-neutral-800' }, 'Resume')
            ),
            h('h1', { className: 'font-heading text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mt-1' }, heading),
            h('p', { className: 'text-xs text-neutral-500 font-sans mt-0.5' },
              updated,
              availability ? ' • ' + availability : ''
            )
          ),
          h('div', { className: 'flex items-center gap-2' },
            h('span', { className: 'px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium text-neutral-700 shadow-2xs' }, 'Print / Save'),
            h('span', { className: 'px-3.5 py-1.5 rounded-lg bg-neutral-950 text-white text-xs font-semibold shadow-sm' }, 'Download PDF')
          )
        ),

        // Resume Paper Canvas
        h('div', { className: 'bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10 shadow-sm space-y-8' },
          // Header Section
          h('div', { className: 'border-b border-neutral-200 pb-6' },
            h('h2', { className: 'font-heading text-3xl sm:text-4xl font-bold text-neutral-950 leading-tight mb-1' }, 'Debosmita Rit'),
            h('p', { className: 'font-mono text-sm text-emerald-600 font-semibold mb-2' }, roleHeadline),
            h('div', { className: 'flex flex-wrap items-center gap-2 mb-3 text-xs font-mono' },
              availability ? h('span', { className: 'px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold' }, availability) : null,
              location ? h('span', { className: 'text-neutral-500' }, location) : null
            ),
            summary ? h('p', { className: 'text-sm text-neutral-600 leading-relaxed font-sans' }, summary) : null
          ),

          // 01. Education Section
          h('section', { className: 'border-b border-neutral-200 pb-8' },
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

          // 02. Technical Competencies Section
          competencies.length > 0 ? h('section', { className: 'border-b border-neutral-200 pb-8' },
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

          // 03. Professional Experience Section
          experience.length > 0 ? h('section', { className: 'border-b border-neutral-200 pb-8' },
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
                      var text = typeof b === 'string' ? b : (b.bullet || '');
                      return h('li', { key: bIdx }, text);
                    })
                  ) : null
                );
              })
            )
          ) : null,

          // 04. Industry Certifications Section
          certifications.length > 0 ? h('section', { className: 'border-b border-neutral-200 pb-8' },
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
                      var text = typeof s === 'string' ? s : (s.skill || '');
                      return h('span', { key: sIdx, className: 'px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-50 text-neutral-600 border border-neutral-200' }, text);
                    })
                  ) : null
                );
              })
            )
          ) : null,

          // 05. Selected Works Section
          selectedWorks.length > 0 ? h('section', { className: 'border-b border-neutral-200 pb-8' },
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

          // 06. Honors & Leadership Section
          honors.length > 0 ? h('section', {},
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
  // 6. Portfolio Listing Page Header Preview
  // -------------------------------------------------------------
  var PortfolioPagePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var heading = entry.getIn(['data', 'heading']) || 'Selected Projects';
      var description = entry.getIn(['data', 'description']) || '';

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900' },
        h('div', { className: 'mb-4 flex items-center gap-2 text-xs font-mono text-neutral-500' },
          h('span', {}, 'Home'),
          h('span', { className: 'text-neutral-300' }, '/'),
          h('span', { className: 'font-semibold text-neutral-800' }, 'Portfolio')
        ),
        h('header', { className: 'mb-8 pb-6 border-b border-neutral-200' },
          h('h1', { className: 'font-heading text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950' }, heading),
          description ? h('p', { className: 'mt-2 text-lg text-neutral-600 leading-relaxed font-sans' }, description) : null
        ),
        h('div', { className: 'mb-8 p-3 rounded-xl border border-neutral-300 bg-neutral-50 flex items-center gap-3 text-sm text-neutral-400 font-sans' },
          h('span', {}, '🔍'),
          h('span', {}, 'Search projects by client, role, tech, or #tag...')
        ),
        h('div', { className: 'rounded-xl border border-dashed border-neutral-300 p-8 text-center text-xs font-mono text-neutral-500' },
          'Showcase Projects Grid (Rendered dynamically from the Portfolio Projects collection)'
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 7. Blog Listing Page Header Preview
  // -------------------------------------------------------------
  var BlogPagePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var heading = entry.getIn(['data', 'heading']) || 'Blog & Writing';
      var description = entry.getIn(['data', 'description']) || '';

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900' },
        h('div', { className: 'mb-4 flex items-center gap-2 text-xs font-mono text-neutral-500' },
          h('span', {}, 'Home'),
          h('span', { className: 'text-neutral-300' }, '/'),
          h('span', { className: 'font-semibold text-neutral-800' }, 'Blog')
        ),
        h('header', { className: 'mb-8 pb-6 border-b border-neutral-200' },
          h('h1', { className: 'font-heading text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950' }, heading),
          description ? h('p', { className: 'mt-2 text-lg text-neutral-600 leading-relaxed font-sans' }, description) : null
        ),
        h('div', { className: 'mb-8 p-3 rounded-xl border border-neutral-300 bg-neutral-50 flex items-center gap-3 text-sm text-neutral-400 font-sans' },
          h('span', {}, '🔍'),
          h('span', {}, 'Search articles by title, summary, or #tag...')
        ),
        h('div', { className: 'rounded-xl border border-dashed border-neutral-300 p-8 text-center text-xs font-mono text-neutral-500' },
          'Blog Articles Grid (Rendered dynamically from the Blog Articles collection)'
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 8. Site Settings & SEO Preview
  // -------------------------------------------------------------
  var SitePreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var name = entry.getIn(['data', 'name']) || 'Debosmita Rit';
      var title = entry.getIn(['data', 'title']) || '';
      var description = entry.getIn(['data', 'description']) || '';
      var url = entry.getIn(['data', 'url']) || 'https://debosmitarit.me';
      var role = entry.getIn(['data', 'role']) || '';
      var github = entry.getIn(['data', 'github']) || '';
      var linkedin = entry.getIn(['data', 'linkedin']) || '';
      var twitter = entry.getIn(['data', 'twitter']) || '';
      var footerCopyright = entry.getIn(['data', 'footerCopyright']) || '';

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900 space-y-6' },
        h('div', { className: 'pb-4 border-b border-neutral-200 flex items-center justify-between' },
          h('div', {},
            h('h2', { className: 'font-heading text-2xl font-bold text-neutral-950' }, 'Global Site Settings & Branding Preview'),
            h('p', { className: 'text-xs font-mono text-neutral-500 mt-0.5' }, 'Configured for ' + url)
          ),
          h('span', { className: 'px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold' }, 'Production Canonical')
        ),
        h('div', { className: 'rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs space-y-4' },
          h('div', { className: 'flex flex-col sm:flex-row sm:items-center justify-between gap-2' },
            h('div', {},
              h('h3', { className: 'font-heading text-2xl font-bold text-neutral-950' }, name),
              h('p', { className: 'font-mono text-xs text-emerald-600 font-semibold' }, role)
            ),
            h('div', { className: 'text-xs font-mono text-neutral-500' }, url)
          ),
          h('div', { className: 'pt-3 border-t border-neutral-100 text-sm' },
            h('span', { className: 'font-mono text-xs text-neutral-400 block mb-1' }, 'DEFAULT META TITLE:'),
            h('p', { className: 'font-semibold text-neutral-800' }, title)
          ),
          h('div', { className: 'text-sm' },
            h('span', { className: 'font-mono text-xs text-neutral-400 block mb-1' }, 'DEFAULT META DESCRIPTION:'),
            h('p', { className: 'text-neutral-600 leading-relaxed' }, description)
          ),
          h('div', { className: 'pt-3 border-t border-neutral-100 flex flex-wrap gap-2 text-xs font-mono' },
            github ? h('span', { className: 'px-2 py-1 rounded bg-neutral-50 border border-neutral-200 text-neutral-700' }, 'GitHub: ' + github) : null,
            linkedin ? h('span', { className: 'px-2 py-1 rounded bg-neutral-50 border border-neutral-200 text-neutral-700' }, 'LinkedIn: ' + linkedin) : null,
            twitter ? h('span', { className: 'px-2 py-1 rounded bg-neutral-50 border border-neutral-200 text-neutral-700' }, 'Twitter: ' + twitter) : null
          ),
          footerCopyright ? h('div', { className: 'pt-3 border-t border-neutral-100 font-mono text-xs text-neutral-400' }, footerCopyright) : null
        )
      );
    }
  });

  // -------------------------------------------------------------
  // 9. Infinite Scroll Tech Stack Ticker Preview
  // -------------------------------------------------------------
  var TechStackPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var enabled = entry.getIn(['data', 'enabled']) !== false;
      var speed = entry.getIn(['data', 'speed']) || 38;
      var items = entry.getIn(['data', 'items']);
      var itemsList = items ? (items.toJS ? items.toJS() : [].concat(items)) : [];

      return h('div', { className: 'max-w-4xl mx-auto py-8 px-4 font-sans text-neutral-900 space-y-6' },
        h('div', { className: 'flex items-center justify-between gap-4 pb-4 border-b border-neutral-200' },
          h('div', {},
            h('h2', { className: 'font-heading text-2xl font-bold text-neutral-950' }, 'Infinite Scroll Tech Stack Ticker'),
            h('p', { className: 'text-xs font-mono text-neutral-500 mt-1' }, 'Live Preview • ' + itemsList.length + ' technologies configured • Speed: ' + speed + 's loop')
          ),
          h('span', { className: 'px-3 py-1 rounded-full text-xs font-mono font-semibold ' + (enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200') },
            enabled ? 'Status: Active on Homepage' : 'Status: Disabled / Draft'
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
  // 10. Links & Socials Preview Template
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
  // 11. Banners & Notices Preview Template
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
      var cookieEnabled = cookie ? cookie.get('enabled') : false;
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
  // 12. Register Preview Styles & Templates with Decap CMS
  // -------------------------------------------------------------
  CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=BenchNine:wght@300;400;700&family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  CMS.registerPreviewStyle('/css/output.css');
  CMS.registerPreviewStyle('/css/prism.css');
  CMS.registerPreviewStyle('/admin/preview.css');

  // Register templates for both top-level collections and file entries
  CMS.registerPreviewTemplate('home', HomePreview);
  CMS.registerPreviewTemplate('about', AboutPreview);
  CMS.registerPreviewTemplate('resume', ResumePreview);
  CMS.registerPreviewTemplate('portfolio', PortfolioPreview);
  CMS.registerPreviewTemplate('blog', BlogPreview);

  // Register templates for settings files
  CMS.registerPreviewTemplate('site', SitePreview);
  CMS.registerPreviewTemplate('techStack', TechStackPreview);
  CMS.registerPreviewTemplate('links', LinksPreview);
  CMS.registerPreviewTemplate('banners', BannersPreview);
  CMS.registerPreviewTemplate('portfolioPage', PortfolioPagePreview);
  CMS.registerPreviewTemplate('blogPage', BlogPagePreview);
})();
