import { axiosInstance } from "./axios";
import {
  IStrapiCollectionTypeResponse,
  IStrapiSingleTypeResponse,
} from "./response";
import * as Models from "@/infra/api/strapi/models";

const getPosts = async (params: {
  boardSlug?: string;
  approved?: boolean;
  page?: number;
  userId?: string;
  limit?: number;
  sort?: any;
}) => {
  return await axiosInstance.get<
    IStrapiCollectionTypeResponse<Models.Post.IPost>
  >("/api/posts", {
    params: {
      filters: {
        board: {
          slug: params.boardSlug,
        },
        author: params.userId,
        ...(params.approved ? { approved: params.approved } : {}),
      },
      populate: "*",
      sort: params.sort ?? {
        createdAt: "desc",
      },
      pagination: !params.limit
        ? {}
        : {
            page: params.page ?? 1,
            pageSize: params.limit ?? 10,
          },
    },
  });
};

const getPostById = async (postId: number) => {
  const data = await axiosInstance.get<
    IStrapiSingleTypeResponse<Models.Post.IPost>
  >(`/api/posts/${postId}?populate=*`);
  const post = data.data.data;
  post.comments = post.comments?.reverse() ?? [];
  return data;
};

const createPost = async (post: Models.Post.IPostCreate) => {
  return await axiosInstance.post<Models.Post.IPost>(`/api/posts`, {
    data: post,
  });
};

const editPost = async (post: Models.Post.IPostCreate) => {
  return await axiosInstance.put<Models.Post.IPost>(`/api/posts/${post.id}`, {
    data: post,
  });
};

const deletePost = async (postId: number) => {
  return await axiosInstance.put<Models.Post.IPost>(`/api/posts/${postId}`, {
    data: {
      publishedAt: null,
    },
  });
};

const refreshPost = async (postId: number) => {
  return await axiosInstance.put<Models.Post.IPost>(`/api/posts/${postId}`, {
    data: {
      refreshedAt: new Date(),
    },
  });
};

const addComment = async (comment: Models.Comment.ICommentCreate) => {
  return await axiosInstance.post(`/api/comments`, {
    data: comment,
  });
};

export const Post = {
  getPosts,
  getPostById,
  createPost,
  editPost,
  addComment,
  refreshPost,
  deletePost,
};
