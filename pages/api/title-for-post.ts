import { makeImaginaryNextFunction } from "@imaginary-dev/nextjs-util";

/**
 * This function takes in a blog post text and returns at least 5 good titles for the blog post.
 * The titles should be snappy and interesting and entice people to click on the blog post.
 *
 * @param postText - string with the blog post text
 * @returns an array of at least 5 good, enticing titles for the blog post.
 *
 * @imaginary
 */
declare function titleForPost(postText: string): Promise<Array<string>>;

export default makeImaginaryNextFunction(titleForPost, "/api/title-for-post");

// This export can be used during next/build
export { titleForPost };
