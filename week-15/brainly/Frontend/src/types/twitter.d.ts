interface TwitterWidgets {
  widgets: {
    load: (element?: HTMLElement) => void;
    createTweet: (tweetId: string, targetEl: HTMLElement, options?: any) => void;
  };
}

interface Window {
  twttr: TwitterWidgets;
}