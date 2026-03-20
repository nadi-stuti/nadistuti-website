import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const homepageCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/homepage' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    mission: z.string(),
    hero: z.object({
      image: z.string(),
      alt: z.string(),
      read_hymn_button: z.string(),
      explore_rivers_button: z.string(),
    }),
    hymn: z.object({
      title: z.string(),
      description: z.string(),
      translation_title: z.string(),
      download_pdf_button: z.string(),
      sanskrit_text: z.array(z.string()),
      translation_text: z.array(z.string()),
    }),
    rivers_section: z.object({
      title: z.string(),
      description: z.string(),
      view_map_button: z.string(),
      view_calendar_button: z.string(),
      rivers_list: z.array(z.object({
        name: z.string(),
        sanskrit: z.string(),
        slug: z.string(),
      })),
    }),
    mission_section: z.object({
      title: z.string(),
      description: z.string(),
      cards: z.object({
        app_developers: z.object({ title: z.string(), description: z.string() }),
        knowledge: z.object({ title: z.string(), description: z.string() }),
        creators: z.object({ title: z.string(), description: z.string() }),
        artisan: z.object({ title: z.string(), description: z.string() }),
        conservation: z.object({ title: z.string(), description: z.string() }),
        community: z.object({ title: z.string(), description: z.string() }),
      }),
      cta: z.object({
        title: z.string(),
        description: z.string(),
        join_button: z.string(),
        contribute_button: z.string(),
      }),
    }),
    services_section: z.object({
      title: z.string(),
      description: z.string(),
      apps: z.object({
        title: z.string(),
        description: z.string(),
        featured_app_label: z.string(),
        featured_app_name: z.string(),
        try_button: z.string(),
        download_button: z.string(),
      }),
      study_hub: z.object({
        title: z.string(),
        description: z.string(),
        featured_course_label: z.string(),
        featured_course_name: z.string(),
        start_learning_button: z.string(),
        explore_button: z.string(),
      }),
    }),
  }),
});

const riversPageCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/rivers_page' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      explore_map_button: z.string(),
      view_rivers_button: z.string(),
    }),
    rivers_section: z.object({
      title: z.string(),
      description: z.string(),
      rivers: z.array(z.object({
        slug: z.string(),
        name: z.string(),
        description: z.string(),
      })),
    }),
    map_section: z.object({
      title: z.string(),
      description: z.string(),
      instructions: z.object({
        title: z.string(),
        steps: z.array(z.string()),
      }),
    }),
    calendar_section: z.object({
      title: z.string(),
      description: z.string(),
      view_full_button: z.string(),
    }),
  }),
});

const riversCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/rivers' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero_image: z.string().default("/images/ganga-varanasi.jpg"),
    sanskrit_name: z.string(),
    short_description: z.string(),

    geo_details: z.object({
      title: z.string(),
      source: z.string(),
      length: z.string(),
      basin_area: z.string(),
      mouth: z.string(),
      states: z.string(),
      sacred_geography: z.object({
        title: z.string(),
        places: z.array(z.object({
          name: z.string(),
          description: z.string(),
        })),
      }),
    }),

    tributaries: z.object({
      title: z.string(),
      right_bank: z.object({
        title: z.string(),
        list: z.array(z.object({
          name: z.string(),
          description: z.string(),
        })),
      }),
      left_bank: z.object({
        title: z.string(),
        list: z.array(z.object({
          name: z.string(),
          description: z.string(),
        })),
      }),
    }),

    cultural_significance: z.object({
      title: z.string(),
      hindu_tradition: z.object({
        title: z.string(),
        description: z.string(),
      }),
      festivals: z.object({
        title: z.string(),
        list: z.array(z.object({
          name: z.string(),
          description: z.string(),
        })),
      }),
      practices: z.object({
        title: z.string(),
        list: z.array(z.object({
          name: z.string(),
          description: z.string(),
        })),
      }),
    }),

    scriptural_references: z.object({
      title: z.string(),
      references: z.array(z.object({
        source: z.string(),
        quote: z.string(),
        meaning: z.string(),
      })),
    }),

    pdf_download: z.object({
      title: z.string(),
      description: z.string(),
      button_text: z.string(),
      file_path: z.string(),
    }),
  }),
});

const studyHubPageCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study_hub/page' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      browse_button: z.string(),
      contribute_button: z.string(),
    }),
    stats_section: z.array(z.object({
      value: z.string(),
      label: z.string(),
      color: z.enum(['blue', 'green', 'orange', 'purple']),
    })),
    search_section: z.object({
      title: z.string(),
      description: z.string(),
      placeholder: z.string(),
      popular_topics: z.object({
        label: z.string(),
        topics: z.array(z.object({
          label: z.string(),
          href: z.string(),
        })),
      }),
    }),
    categories_section: z.object({
      title: z.string(),
      description: z.string(),
      categories: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        stats: z.string(),
        last_updated: z.string(),
        href: z.string(),
        color: z.enum(['amber', 'purple', 'green', 'pink', 'blue', 'red', 'indigo', 'orange', 'emerald']),
        status: z.string().optional(),
      })),
    }),
    featured_resources: z.object({
      title: z.string(),
      description: z.string(),
      resources: z.array(z.object({
        title: z.string(),
        type: z.string(),
        description: z.string(),
        added: z.string(),
        download_text: z.string(),
        file_path: z.string(),
        color: z.enum(['blue', 'purple', 'green']),
      })),
    }),
    contribute_section: z.object({
      title: z.string(),
      description: z.string(),
      how_to_contribute: z.object({
        title: z.string(),
        methods: z.array(z.object({
          title: z.string(),
          description: z.string(),
        })),
      }),
      submission_form: z.object({
        title: z.string(),
        fields: z.object({
          name: z.string(),
          email: z.string(),
          type: z.string(),
          related_rivers: z.string(),
          description: z.string(),
          upload_files: z.string(),
          upload_hint: z.string(),
          upload_formats: z.string(),
        }),
        contribution_types: z.array(z.string()),
        submit_button: z.string(),
      }),
    }),
    guidelines_section: z.object({
      title: z.string(),
      description: z.string(),
      accepted: z.object({
        title: z.string(),
        list: z.array(z.string()),
      }),
      not_accepted: z.object({
        title: z.string(),
        list: z.array(z.string()),
      }),
      review_process: z.object({
        title: z.string(),
        steps: z.array(z.string()),
      })
    }),
    newsletter_section: z.object({
      title: z.string(),
      description: z.string(),
      email_placeholder: z.string(),
      subscribe_button: z.string(),
    }),
  }),
});

const studyHubHandbooksCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study_hub/handbooks' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    filter_options: z.object({
      search_placeholder: z.string(),
      rivers: z.array(z.string()),
      categories: z.array(z.string()),
      sort: z.array(z.string()),
    }),
    documents: z.array(z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      category_color: z.enum(['amber', 'purple', 'blue', 'green', 'teal', 'orange']),
      pages: z.string(),
      type: z.string(),
      downloads: z.string(),
      likes: z.string(),
      pdf_url: z.string(),
    })),
  }),
});

const studyHubHolyCalendarCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study_hub/holy_calendar' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    filter_options: z.object({
      rivers: z.array(z.string()),
      event_types: z.array(z.string()),
    }),
    calendar_info: z.object({
      month_year: z.string(),
      hindu_month: z.string(),
      special_dates: z.array(z.object({
        day: z.number(),
        type: z.enum(['today', 'sacred', 'festival']),
      })).optional(),
    }),
    upcoming_events: z.array(z.object({
      date: z.string(),
      tithi: z.string(),
      river: z.string(),
      river_color: z.enum(['blue', 'yellow', 'green', 'purple', 'red', 'orange']),
      title: z.string(),
      description: z.string(),
      location: z.string(),
      time: z.string(),
      organizer: z.string(),
      days_left_label: z.string(),
      border_color: z.enum(['emerald', 'purple', 'orange']),
    })),
    past_events: z.array(z.object({
      date: z.string(),
      tithi: z.string(),
      river: z.string(),
      river_color: z.enum(['blue', 'yellow', 'green', 'purple', 'red', 'orange', 'pink']),
      title: z.string(),
      description: z.string(),
      attendance: z.string(),
      status: z.string(),
      days_ago_label: z.string(),
    })),
  }),
});

const studyHubMultimediaCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study_hub/multimedia' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    filter_options: z.object({
      search_placeholder: z.string(),
      types: z.array(z.string()),
      languages: z.array(z.string()),
      sort: z.array(z.string()),
    }),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
      type: z.string(),
      type_color: z.enum(['blue', 'orange', 'green']),
      media_type: z.enum(['video', 'audio']),
      cover_image: z.string().optional(),
      cover_gradient: z.string().optional(),
      duration: z.string(),
      language: z.string(),
      views: z.string(),
      rating: z.string(),
      label: z.string(),
    })),
  }),
});

const studyHubSlideshowsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study_hub/slideshows' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    filter_options: z.object({
      search_placeholder: z.string(),
      types: z.array(z.string()),
      rivers: z.array(z.string()),
      sort: z.array(z.string()),
    }),
    slideshows: z.array(z.object({
      title: z.string(),
      description: z.string(),
      cover_image: z.string(),
      cover_gradient: z.string(),
      slide_count_label: z.string(),
      duration: z.string(),
      views: z.string(),
      rating: z.string(),
    })),
  }),
});

const studyHubIndicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study_hub/indices' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).optional(),
    filter_options: z.object({
      search_placeholder: z.string(),
      rivers: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      periods: z.array(z.string()).optional(),
      sort: z.array(z.string()).optional(),
    }).optional(),
  })
});

const studyResourcesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/study_resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    file_path: z.string().optional(),
    language: z.enum(['en', 'hi']),
    category: z.enum([
      'historical',
      'scriptures',
      'research',
      'slideshows',
      'geography',
      'multimedia',
      'handbooks',
      'rituals',
      'holy-calendar'
    ]),
    rivers: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    period: z.string().optional(),
    period_color: z.string().optional(),
    time_range: z.string().optional(),
    author: z.string().optional(),
    publisher: z.string().optional(),
    pages: z.string().optional(),
    duration: z.string().optional(),
    slide_count: z.string().optional(),
    views: z.string().optional(),
    likes: z.string().optional(),
    thumbnail: z.string().optional(),
  })
});


const booksPageCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/books_page' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      browse_button: z.string(),
      suggest_button: z.string(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
      color: z.enum(['blue', 'green', 'orange', 'purple', 'red', 'amber']),
    })),
    categories: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      color: z.string(),
      count: z.string(),
    })),
    featured_books: z.object({
      title: z.string(),
      description: z.string(),
      books: z.array(z.object({
        id: z.string(),
        title: z.string(),
        author: z.string(),
        description: z.string(),
        category: z.string(),
        category_label: z.string(),
        category_color: z.string(),
        language: z.string(),
        pages: z.string(),
        year: z.string(),
        badge: z.string().optional(),
        badge_color: z.string().optional(),
        buy_links: z.array(z.object({
          label: z.string(),
          url: z.string(),
        })),
      })),
    }),
    books_by_category: z.object({
      title: z.string(),
      description: z.string(),
      religious: z.array(z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
        language: z.string(),
        pages: z.string(),
        year: z.string(),
        free_pdf: z.string().optional(),
        buy_url: z.string().optional(),
      })).optional(),
      competitive: z.array(z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
        language: z.string(),
        pages: z.string(),
        year: z.string(),
        free_pdf: z.string().optional(),
        buy_url: z.string().optional(),
      })).optional(),
    }),
    contribute_section: z.object({
      title: z.string(),
      description: z.string(),
      suggest_button: z.string(),
      fields: z.object({
        title: z.string(),
        author: z.string(),
        category: z.string(),
        language: z.string(),
        reason: z.string(),
        submit: z.string(),
      }),
    }),
    search_section: z.object({
      placeholder: z.string(),
      filter_category: z.string(),
      filter_language: z.string(),
      sort_options: z.array(z.string()),
    }),
  }),
});

const appsPageCollection = defineCollection({

  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/apps_page' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      browse_apps_button: z.string(),
      contribute_button: z.string(),
    }),
    apps_section: z.object({
      title: z.string(),
      description: z.string(),
      apps: z.array(z.object({
        id: z.string(),
        title: z.string(),
        short_title: z.string(),
        description: z.string(),
        gradient: z.string(),
        icon: z.string(),
        tags: z.array(z.object({
          label: z.string(),
          color: z.string(),
        })),
        platforms: z.array(z.string()),
      })),
    }),
    open_source_section: z.object({
      title: z.string(),
      description: z.string(),
      get_started_title: z.string(),
      view_github_button: z.string(),
      join_community_button: z.string(),
      contact_developers_button: z.string(),
    }),
    coming_soon_section: z.object({
      title: z.string(),
      description: z.string(),
      join_community_button: z.string(),
      suggest_app_button: z.string(),
    }),
    platform_labels: z.object({
      ios: z.string(),
      android: z.string(),
      web: z.string(),
      download: z.string(),
    }),
  }),
});

const watchPageCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/watch_page' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      featured_videos_button: z.string(),
      browse_channels_button: z.string(),
    }),
    search_section: z.object({
      search_placeholder: z.string(),
      filter_all: z.string(),
      filter_featured: z.string(),
      filter_live: z.string(),
      filter_playlists: z.string(),
      filter_channels: z.string(),
      sort_recent: z.string(),
      sort_popular: z.string(),
      sort_duration: z.string(),
      sort_alphabetical: z.string(),
    }),
    featured_section: z.object({
      title: z.string(),
      description: z.string(),
      videos: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        duration: z.string(),
        views: z.string(),
        likes: z.string(),
        uploaded: z.string(),
        channel_name: z.string(),
        channel_color: z.string(),
        gradient: z.string(),
      })),
    }),
    all_videos_section: z.object({
      title: z.string(),
      description: z.string(),
      load_more_button: z.string(),
      videos: z.array(z.object({
        id: z.string(),
        title: z.string(),
        channel: z.string(),
        thumbnail: z.string(),
        duration: z.string(),
        views: z.string(),
        uploaded: z.string(),
        gradient: z.string(),
      })),
    }),
    playlists_section: z.object({
      title: z.string(),
      description: z.string(),
      playlists: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        video_count: z.string(),
        duration: z.string(),
        updated: z.string(),
        gradient: z.string(),
      })),
    }),
    channels_section: z.object({
      title: z.string(),
      description: z.string(),
      channels: z.array(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        subscribers: z.string(),
        videos: z.string(),
        gradient: z.string(),
      })),
    }),
    contribute_section: z.object({
      title: z.string(),
      description: z.string(),
      suggest_channel_title: z.string(),
      suggest_button: z.string(),
      other_ways_title: z.string(),
      email_button: z.string(),
      join_community_button: z.string(),
      more_ways_button: z.string(),
    }),
    ui_labels: z.object({
      watch_now: z.string(),
      watch_playlist: z.string(),
      subscribe: z.string(),
      featured_badge: z.string(),
      views_label: z.string(),
      likes_label: z.string(),
      videos_label: z.string(),
    }),
  }),
});

const communityPageCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/community_page' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      join_community_button: z.string(),
      view_guidelines_button: z.string(),
    }),
    platforms_section: z.object({
      title: z.string(),
      description: z.string(),
      platforms: z.array(z.object({
        id: z.string(),
        name: z.string(),
        subtitle: z.string(),
        description: z.string(),
        members: z.string(),
        button_text: z.string(),
        button_url: z.string(),
        icon_bg: z.string(),
        button_bg: z.string(),
      })),
    }),
    guidelines_section: z.object({
      title: z.string(),
      encourage_title: z.string(),
      encourage_items: z.array(z.string()),
      not_allow_title: z.string(),
      not_allow_items: z.array(z.string()),
    }),
    highlights_section: z.object({
      title: z.string(),
      stats: z.array(z.object({
        value: z.string(),
        label: z.string(),
      })),
      description: z.string(),
      support_button: z.string(),
    }),
  }),
});

const eventsPageCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events_page' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      title: z.string(),
      description: z.string(),
      view_upcoming_button: z.string(),
      book_activities_button: z.string(),
    }),
    categories: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      color: z.enum(['green', 'blue', 'orange', 'purple', 'pink', 'yellow']),
      icon: z.enum(['heart', 'book', 'flame', 'navigation', 'users', 'star']),
    })),
    upcoming_events: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      date: z.string(),
      end_date: z.string().optional(),
      time: z.string().optional(),
      location: z.string(),
      price: z.number(),
      currency: z.string().default('INR'),
      capacity: z.number(),
      registered: z.number(),
      organizer: z.string(),
      contact_email: z.string().optional(),
      contact_phone: z.string().optional(),
      contact_whatsapp: z.string().optional(),
      tags: z.array(z.string()),
      image: z.string().optional(),
      featured: z.boolean().default(false),
    })),
    recent_events: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      date: z.string(),
      end_date: z.string().optional(),
      location: z.string(),
      participants: z.number(),
      organizer: z.string(),
      tags: z.array(z.string()),
      image: z.string().optional(),
      gallery: z.array(z.string()).optional(),
      impact_items: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
    })),
    featured_events: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      category: z.string(),
      type: z.enum(['recurring', 'pilgrimage', 'festival']),
      schedule: z.string().optional(),
      duration: z.string().optional(),
      frequency: z.string().optional(),
      locations: z.array(z.string()).optional(),
      organizer: z.string(),
      tags: z.array(z.string()),
      image: z.string().optional(),
    })),
    community_events: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      organizer_name: z.string(),
      organizer_location: z.string(),
      organizer_avatar: z.string(),
      date: z.string(),
      participants: z.number(),
      category: z.string(),
      status: z.enum(['completed', 'featured', 'trending']),
      tags: z.array(z.string()),
      image: z.string().optional(),
      impact_items: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
    })),
    booking_section: z.object({
      title: z.string(),
      description: z.string(),
      includes_note: z.string(),
      contact_custom_button: z.string(),
      activities: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        price_range: z.string(),
        icon: z.enum(['navigation', 'flame', 'camera', 'music']),
      })),
    }),
    contact_section: z.object({
      title: z.string(),
      description: z.string(),
      options: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        contact: z.string(),
        icon: z.enum(['mail', 'message-circle', 'users', 'dollar-sign']),
        color: z.enum(['blue', 'green', 'purple', 'orange']),
        url: z.string().optional(),
      })),
    }),
    community_section: z.object({
      title: z.string(),
      description: z.string(),
      featured_title: z.string(),
      organize_title: z.string(),
      organize_description: z.string(),
      step_document: z.string(),
      step_document_desc: z.string(),
      step_share: z.string(),
      step_share_desc: z.string(),
      step_featured: z.string(),
      step_featured_desc: z.string(),
      submit_event_button: z.string(),
      guidelines_button: z.string(),
    }),
    ui_labels: z.object({
      categories_title: z.string(),
      categories_description: z.string(),
      upcoming_title: z.string(),
      upcoming_description: z.string(),
      past_events_title: z.string(),
      past_events_description: z.string(),
      featured_spiritual_title: z.string(),
      featured_spiritual_description: z.string(),
      learn_more: z.string(),
      view_all_events: z.string(),
      book_now: z.string(),
      register_free: z.string(),
      view_photos: z.string(),
      view_story: z.string(),
      view_video: z.string(),
      view_details: z.string(),
      share_event: z.string(),
      back_to_events: z.string(),
      about_event: z.string(),
      event_impact: z.string(),
      event_details: z.string(),
      free: z.string(),
      spots_available: z.string(),
      sold_out: z.string(),
      participants: z.string(),
      date_label: z.string(),
      time_label: z.string(),
      location_label: z.string(),
      organizer_label: z.string(),
      price_label: z.string(),
      contact_label: z.string(),
      no_events: z.string(),
      no_events_description: z.string(),
    }),
  }),
});

export const collections = {
  'homepage': homepageCollection,
  'rivers_page': riversPageCollection,
  'rivers': riversCollection,
  'apps_page': appsPageCollection,
  'watch_page': watchPageCollection,
  'community_page': communityPageCollection,
  'books_page': booksPageCollection,
  'study_hub_page': studyHubPageCollection,
  'study_hub_indices': studyHubIndicesCollection,
  'study_hub_slideshows': studyHubSlideshowsCollection,
  'study_hub_multimedia': studyHubMultimediaCollection,
  'study_hub_holy_calendar': studyHubHolyCalendarCollection,
  'study_hub_handbooks': studyHubHandbooksCollection,
  'study_resources': studyResourcesCollection,
  'events_page': eventsPageCollection,
};
