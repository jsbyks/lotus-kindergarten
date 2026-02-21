/**
 * =========================================================
 *  SCHOOL BRANDING CONFIGURATION
 *  Edit this ONE file to rebrand the entire website.
 * =========================================================
 */
window.SCHOOL_CONFIG = {
    // School identity
    name:        'Lotus Kindergarten',
    tagline:     'Where Little Minds Bloom!',
    emoji:       '🪷',
    founded:     2009,

    // Location
    city:        'Doha',
    country:     'Qatar',
    countryFlag: '🇶🇦',
    address:     'Al Waab Street, Doha, Qatar',

    // Contact
    phone:       '+974 4444 5555',
    email:       'hello@lotuskindergarten.qa',
    website:     'www.lotuskindergarten.qa',

    // Social media (set to '' to hide)
    social: {
        facebook:  'https://facebook.com/',
        instagram: 'https://instagram.com/',
        twitter:   '',
        youtube:   ''
    },

    // Stats shown on the hero section
    stats: {
        experience:  '15+',
        students:    '500+',
        teachers:    '50+'
    },

    // Accreditation badge text
    accreditation: 'MOE Certified',
    accreditationBody: 'Qatar Ministry of Education',

    // API base URL — auto-detects local vs production
    apiBase: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:8000'
        : ''
};
