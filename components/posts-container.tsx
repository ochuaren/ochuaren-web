"use client";

import { StrapiApi } from "@/infra/api/strapi";
import { IPost } from "@/infra/api/strapi/models/post";
import dayjs from "dayjs";
import { Dropdown, Modal, Pagination, Spinner } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";
import classNames from "classnames";

interface Props {
  userId?: string;
}

export const PostsContainer = (props: Props) => {
  const [posts, setPosts] = useState<IPost[]>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [post, setPost] = useState<IPost>();

  const getPosts = async () => {
    return await StrapiApi.Post.getPosts({
      userId: props.userId,
      page,
      limit: 100,
      sort: { updatedAt: "desc" },
    });
  };

  const handleRefresh = async (post: IPost) => {
    setPost(post);
    setOpenRefreshodal(true);
  };

  const handlePostDelete = (post: IPost) => {
    setPost(post);
    setOpenDeleteModal(true);
  };

  const confirmPostRefresh = async () => {
    await StrapiApi.Post.refreshPost(post!.id);
    await getPosts();
    setPost(undefined);
    setOpenRefreshodal(false);
  };

  const confirmPostDelete = async () => {
    await StrapiApi.Post.deletePost(post!.id);
    await getPosts();
    setPost(undefined);
    setOpenDeleteModal(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRefreshModal, setOpenRefreshodal] = useState(false);

  useEffect(() => {
    getPosts().then(({ data }) => {
      setPosts(data.data);
      setPage(data.meta.pagination.page);
      setTotalPages(Math.ceil(data.meta.pagination.total / 100));
    });
  }, [page]);

  return (
    <>
      <Modal
        show={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        className="z-50"
      >
        <Modal.Header>删除帖子</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              你是否确认删除以下帖子? <br />
              <b>{post?.attributes.title}</b>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmPostDelete}>删除</Button>
          <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={openRefreshModal}
        onClose={() => setOpenRefreshodal(false)}
        className="z-50"
      >
        <Modal.Header>刷新帖子</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              确认刷新以下帖子? (刷新后重新置顶) <br />
              <b>{post?.attributes.title}</b>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmPostRefresh}>刷新</Button>
          <Button color="gray" onClick={() => setOpenRefreshodal(false)}>
            取消
          </Button>
        </Modal.Footer>
      </Modal>
      {posts === undefined ? (
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <Spinner aria-label="spinner" size="lg" />
        </div>
      ) : (
        <>
          <table className="table-auto w-full text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr className="text-left">
                <th>标题</th>
                <th>日期</th>
                <th>刷新</th>
                <th>功能</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const board = post.attributes.board.data?.attributes.slug;
                var date = dayjs(post.attributes.refreshedAt);
                var nextRefreshDate = date.add(1, "day").startOf("date");
                const showRefresh =
                  !date.isValid() || nextRefreshDate.isBefore(dayjs());
                return (
                  <tr key={post.id} className="bg-white border-b ">
                    <td
                      className={classNames({
                        "text-blue-500": showRefresh,
                      })}
                    >
                      <Link href={`/board/${board}/${post.id}/edit`}>
                        {post.attributes.title}
                      </Link>
                    </td>
                    <td className="w-28">
                      {dayjs(post.attributes.refreshedAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="w-20">
                      {showRefresh && (
                        <Button size="sm" onClick={() => handleRefresh(post)}>
                          刷新
                        </Button>
                      )}
                    </td>
                    <td>
                      <Dropdown label="" inline>
                        <Dropdown.Item
                          as="a"
                          href={`/board/${board}/${post.id}/edit`}
                        >
                          编辑
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => handlePostDelete(post)}>
                          删除
                        </Dropdown.Item>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={function (page: number): void {
              setPage(page);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
            nextLabel="下一页"
            previousLabel="上一页"
          />
        </>
      )}
    </>
  );
};
