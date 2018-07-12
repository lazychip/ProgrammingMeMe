import axios from "axios";
import { checkURL } from "../utils";
class RedditHelper {
  async getPosts(options: PostOptions) {
    const { onlyHasThumbnails = true, subreddits } = options;
    let allPosts = (await Promise.all(
      Object.keys(subreddits).map(async subreddit => {
        const res = await axios.get(
          `https://www.reddit.com/r/${subreddit}.json?after=${subreddit !== "random" ? subreddits[subreddit] : ""}`,
        );
        return {
          data: res.data.data.children.map(d => d.data),
          cursor: res.data.data.after,
          subreddit,
        }
      })
    ));
    let posts = []
    let cursors = {}
    allPosts.forEach(p => {
      posts = [...posts, ...p.data]
      cursors[p.subreddit] = p.cursor
    })
    if (onlyHasThumbnails) {
      posts = posts.filter(post => post.preview);
    }
    return {posts, cursors};
  }
}

type PostOptions = {
  onlyHasThumbnails: boolean,
  subreddits: Object
};

export const redditHelper = new RedditHelper();
