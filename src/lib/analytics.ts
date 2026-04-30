/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Google Analytics Custom Event Tracking
 *
 * This utility provides type-safe event tracking for Google Analytics 4
 * using the gtag.js API that's loaded by @next/third-parties
 */

// Extend the Window interface to include gtag

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }

}

/**
 * Event Categories - organize your events by category
 */

export enum EventCategory {
  
  NAVIGATION = 'navigation',
  USER_INTERACTION = 'user_interaction',
  FORM = 'form',
  ENGAGEMENT = 'engagement',
  MEDIA = 'media',
  LANGUAGE = 'language',
  NEWSLETTER = 'newsletter',
  CONTACT = 'contact',

}

/**
 * Common Event Names - predefined event names for consistency
 */

export enum EventName {

  // Navigation
  PAGE_VIEW = 'page_view',
  LINK_CLICK = 'link_click',

  // User Interactions
  BUTTON_CLICK = 'button_click',
  SCROLL_DEPTH = 'scroll_depth',

  // Forms
  FORM_START = 'form_start',
  FORM_SUBMIT = 'form_submit',
  FORM_ERROR = 'form_error',
  FORM_SUCCESS = 'form_success',

  // Media
  VIDEO_PLAY = 'video_play',
  VIDEO_PAUSE = 'video_pause',
  VIDEO_COMPLETE = 'video_complete',
  IMAGE_VIEW = 'image_view',

  // Language
  LANGUAGE_CHANGE = 'language_change',

  // Newsletter
  NEWSLETTER_SUBSCRIBE = 'newsletter_subscribe',
  NEWSLETTER_SUCCESS = 'newsletter_success',
  NEWSLETTER_ERROR = 'newsletter_error',

  // Contact
  CONTACT_FORM_SUBMIT = 'contact_form_submit',
  CONTACT_SUCCESS = 'contact_success',
  CONTACT_ERROR = 'contact_error',

}

/**
 * Event Parameters Interface
 */

interface EventParams {
  category?: EventCategory | string;
  label?: string;
  value?: number;
  language?: string;
  page_type?: string;
  button_text?: string;
  link_url?: string;
  form_name?: string;
  error_message?: string;
  [key: string]: any;
}

/**
 * Track a custom event
 *
 * @param eventName - Name of the event (use EventName enum for common events)
 * @param params - Additional parameters for the event
 *
 * @example
 * trackEvent(EventName.BUTTON_CLICK, {
 *   category: EventCategory.USER_INTERACTION,
 *   label: 'Hero CTA Button',
 *   button_text: 'Learn More'
 * });
 */

export const trackEvent = (
  eventName: EventName | string,
  params?: EventParams
): void => {
  try {
    // Check if gtag is available (only in production/client-side)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: params?.category,
        event_label: params?.label,
        value: params?.value,
        ...params,
      });

      // Optional: Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 GA Event:', eventName, params);
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.log('📊 GA Event (gtag not loaded):', eventName, params);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track button clicks
 *
 * @param buttonText - Text content of the button
 * @param location - Where the button is located (e.g., 'header', 'footer', 'hero')
 *
 * @example
 * trackButtonClick('Subscribe Now', 'footer');
 */

export const trackButtonClick = (
  buttonText: string,
  location?: string
): void => {
  trackEvent(EventName.BUTTON_CLICK, {
    category: EventCategory.USER_INTERACTION,
    label: location,
    button_text: buttonText,
  });
};

/**
 * Track link clicks
 *
 * @param linkUrl - URL of the link
 * @param linkText - Text content of the link
 * @param location - Where the link is located
 *
 * @example
 * trackLinkClick('https://example.com', 'Read More', 'blog-post');
 */

export const trackLinkClick = (
  linkUrl: string,
  linkText?: string,
  location?: string
): void => {
  trackEvent(EventName.LINK_CLICK, {
    category: EventCategory.NAVIGATION,
    label: location,
    link_url: linkUrl,
    link_text: linkText,
  });
};

/**
 * Track form interactions
 *
 * @param action - Form action ('start', 'submit', 'success', 'error')
 * @param formName - Name of the form
 * @param additionalParams - Additional parameters
 *
 * @example
 * trackForm('submit', 'contact-form', { email_type: 'business' });
 */

export const trackForm = (
  action: 'start' | 'submit' | 'success' | 'error',
  formName: string,
  additionalParams?: Record<string, any>
): void => {
  const eventMap = {
    start: EventName.FORM_START,
    submit: EventName.FORM_SUBMIT,
    success: EventName.FORM_SUCCESS,
    error: EventName.FORM_ERROR,
  };

  trackEvent(eventMap[action], {
    category: EventCategory.FORM,
    label: formName,
    form_name: formName,
    ...additionalParams,
  });
};

/**
 * Track newsletter subscription
 *
 * @param action - Subscription action ('subscribe', 'success', 'error')
 * @param email - User email (optional, be mindful of privacy)
 * @param errorMessage - Error message if action is 'error'
 *
 * @example
 * trackNewsletter('success');
 */

export const trackNewsletter = (
  action: 'subscribe' | 'success' | 'error',
  errorMessage?: string
): void => {
  const eventMap = {
    subscribe: EventName.NEWSLETTER_SUBSCRIBE,
    success: EventName.NEWSLETTER_SUCCESS,
    error: EventName.NEWSLETTER_ERROR,
  };

  trackEvent(eventMap[action], {
    category: EventCategory.NEWSLETTER,
    ...(errorMessage && { error_message: errorMessage }),
  });
};

/**
 * Track contact form submission
 *
 * @param action - Contact action ('submit', 'success', 'error')
 * @param additionalParams - Additional parameters
 *
 * @example
 * trackContact('success', { response_time: 1500 });
 */

export const trackContact = (
  action: 'submit' | 'success' | 'error',
  additionalParams?: Record<string, any>
): void => {
  const eventMap = {
    submit: EventName.CONTACT_FORM_SUBMIT,
    success: EventName.CONTACT_SUCCESS,
    error: EventName.CONTACT_ERROR,
  };

  trackEvent(eventMap[action], {
    category: EventCategory.CONTACT,
    ...additionalParams,
  });
};

/**
 * Track language changes
 *
 * @param fromLang - Previous language
 * @param toLang - New language
 *
 * @example
 * trackLanguageChange('ar', 'en');
 */

export const trackLanguageChange = (fromLang: string, toLang: string): void => {
  trackEvent(EventName.LANGUAGE_CHANGE, {
    category: EventCategory.LANGUAGE,
    from_language: fromLang,
    to_language: toLang,
  });

};


/**
 * Track scroll depth
 *
 * @param percentage - Scroll percentage (25, 50, 75, 100)
 * @param pagePath - Current page path
 *
 * @example
 * trackScrollDepth(50, '/ar/media');
 */

export const trackScrollDepth = (
  percentage: number,
  pagePath?: string
): void => {
  trackEvent(EventName.SCROLL_DEPTH, {
    category: EventCategory.ENGAGEMENT,
    label: `${percentage}%`,
    value: percentage,
    page_path: pagePath,
  });
};


/**
 * Track video interactions
 *
 * @param action - Video action ('play', 'pause', 'complete')
 * @param videoTitle - Title of the video
 * @param progress - Video progress percentage (optional)
 *
 * @example
 * trackVideo('play', 'Savvy World Intro', 0);
 */

export const trackVideo = (
  action: 'play' | 'pause' | 'complete',
  videoTitle: string,
  progress?: number
): void => {
  const eventMap = {
    play: EventName.VIDEO_PLAY,
    pause: EventName.VIDEO_PAUSE,
    complete: EventName.VIDEO_COMPLETE,
  };
  trackEvent(eventMap[action], {
    category: EventCategory.MEDIA,
    label: videoTitle,
    video_title: videoTitle,
    video_progress: progress,
  });
  
};
