import { Container } from "unstated";

export class PostsContainer extends Container {
  state = {
    posts: [],
    cursors: {
        random: true,
        photoshopbattles: false,
        MrRobot: false,
    }
  };
  updatePosts(updateOptions: UpdateOptions) {
    const { posts, cursors, isRefresh } = updateOptions;
    let updatedPostList = []
    if (!isRefresh) {
        updatedPostList = [...this.state.posts]
    }
    updatedPostList = [...updatedPostList, ...posts]
    this.setState({ posts: updatedPostList, cursors });
  }
}

type UpdateOptions = {
  posts: Array,
  cursors: Object,
};

export const postsContainer = new PostsContainer();
