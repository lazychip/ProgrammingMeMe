import axios from "axios";
import { checkURL } from "../utils";
class RedditHelper {
  async getPosts(options: PostOptions) {
    const { onlyHasThumbnails = true, subreddits } = options;
    let posts = (await Promise.all(
      subreddits.map(async subreddit => {
        const res = await axios.get(
          `https://www.reddit.com/r/${subreddit}.json`
        );
        return res.data.data.children.map(d => d.data);
      })
    ))[0];
    if (onlyHasThumbnails) {
      posts = posts.filter(post => post.thumbnail && checkURL(post.thumbnail));
    }
    return posts;
  }
}

type PostOptions = {
  onlyHasThumbnails: boolean,
  subreddits: Array
};

export const redditHelper = new RedditHelper();
