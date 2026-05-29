/**
 * Media category data for Ilze Apine's portfolio.
 * Replace placeholder values with real content when assets are ready.
 *
 * heroImages[]   — 5 images floating in the desktop hero (independent of works)
 * works[]        — full gallery shown on the category page AND as front-page scatter
 * statements[]   — artist statement rows (image + text blocks)
 * galleryLayout  — column counts per gallery row, e.g. [2, 3] means
 *                  first row: 2 cols, second row: 3 cols
 */

export const artist = {
  name: 'ilze apine',
  bio: 'Artist bio placeholder — describe Ilze\'s background, inspiration, and practice here.',
  links: [
    { label: 'instagram', url: 'https://www.instagram.com/glassbyilze' },
    { label: 'contact',   url: 'mailto:glassbyilze@gmail.com' }
  ]
}

export const mediaCategories = {
  'stained-glass': {
    slug: 'stained-glass',
    title: 'stained glass — ilze apine',
    label: 'stained glass',
    bio: 'Stained glass bio placeholder — describe the medium, process, and themes here.',

    // 5 floating images for the desktop hero section (independent of gallery works)
    heroImages: [
      null, // hero image 1 — e.g. '/media/stained-glass/hero1.jpg'
      null, // hero image 2
      null, // hero image 3
      null, // hero image 4
      null  // hero image 5
    ],

    // Full gallery — these also appear as scattered images on the front page
    works: [
      { id: 'sg-1', file: null, caption: 'work title 1', description: '' },
      { id: 'sg-2', file: null, caption: 'work title 2', description: '' },
      { id: 'sg-3', file: null, caption: 'work title 3', description: '' },
      { id: 'sg-4', file: null, caption: 'work title 4', description: '' },
      { id: 'sg-5', file: null, caption: 'work title 5', description: '' }
    ],

    statements: [
      {
        image: null, // e.g. '/media/stained-glass/statement1.jpg'
        paragraphs: [
          'Statement paragraph 1 placeholder.',
          'Statement paragraph 2 placeholder.'
        ]
      }
    ],
    galleryLayout: [2, 3]
  },

  paintings: {
    slug: 'paintings',
    title: 'paintings — ilze apine',
    label: 'paintings',
    bio: 'Paintings bio placeholder — describe the medium, process, and themes here.',

    heroImages: [
      null,
      null,
      null,
      null,
      null
    ],

    works: [
      { id: 'p-1', file: null, caption: 'work title 1', description: '' },
      { id: 'p-2', file: null, caption: 'work title 2', description: '' },
      { id: 'p-3', file: null, caption: 'work title 3', description: '' },
      { id: 'p-4', file: null, caption: 'work title 4', description: '' },
      { id: 'p-5', file: null, caption: 'work title 5', description: '' }
    ],

    statements: [
      {
        image: null,
        paragraphs: [
          'Statement paragraph 1 placeholder.',
          'Statement paragraph 2 placeholder.'
        ]
      }
    ],
    galleryLayout: [3, 2]
  },

  'other-media': {
    slug: 'other-media',
    title: 'other media — ilze apine',
    label: 'other media',
    bio: 'Other media bio placeholder — describe the medium, process, and themes here.',

    heroImages: [
      null,
      null,
      null,
      null,
      null
    ],

    works: [
      { id: 'om-1', file: null, caption: 'work title 1', description: '' },
      { id: 'om-2', file: null, caption: 'work title 2', description: '' },
      { id: 'om-3', file: null, caption: 'work title 3', description: '' },
      { id: 'om-4', file: null, caption: 'work title 4', description: '' },
      { id: 'om-5', file: null, caption: 'work title 5', description: '' }
    ],

    statements: [
      {
        image: null,
        paragraphs: [
          'Statement paragraph 1 placeholder.',
          'Statement paragraph 2 placeholder.'
        ]
      }
    ],
    galleryLayout: [2, 2]
  }
}

/**
 * Flat list of all works across all categories.
 * Used by the landing page scattered images.
 */
export const allWorks = Object.values(mediaCategories).flatMap(cat =>
  cat.works.map(work => ({ ...work, category: cat.slug }))
)
