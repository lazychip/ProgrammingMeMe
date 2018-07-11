import { Container } from "unstated";

export class PostsContainer extends Container {
  state = {
    posts: []
  };
  updatePosts(updateOptions: UpdateOptions) {
    const { posts } = updateOptions;
    this.setState({ posts });
  }
}

type UpdateOptions = {
  posts: Array
};

export const postsContainer = new PostsContainer();
